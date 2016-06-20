---
layout: post
title: "Title TK char rbms"
categories: machine-learning
---

<!-- Graphic goes here? -->

### Named entity generation

A classic problem in NLP is [named entity recognition](https://en.wikipedia.org/wiki/Named-entity_recognition). Given a text, we have to identify the proper nouns. But what about the generative mirror image of this problem? What if we ask a model to dream up new names of people, places and things? It turns out it comes up with some funny stuff! Here's a random sampling of algorithmically generated geographic place names:

    campterton reservoir
    south landing canyon
    camors meadow
    mount memarill park
    harritin millpond
    upper couse trail
    north milnow branch
    lake landingh creek
    lake cove city hall

If you're interested in learning about how the model that generated these works, read on. If you just want to see some more examples from different domains, feel free to [skip ahead]().

### Datasets

I used three datasets for most of my experiments:

- US geographical names
- GitHub repository names
- personal names

[This README](TODO) has instructions for downloading each of them, if you want to reproduce my results.

### Representing Inputs

The first thing we need to consider is what the input layer ("visible" layer in RBM parlance) is going to look like. How do we represent these strings we're trying to model?

Most NLP models stop at the word level, representing texts by counts of words (or by word vectors). But we don't want to limit ourselves to regurgitating words we've seen in the training data - we want whole new words (like "memarill" or "campterton"). For that, we need to go deeper, down to the character level.

We'll represent names as a sequence of [one-hot](https://en.wikipedia.org/wiki/One-hot) vectors of length N, where N is the size of our alphabet. 

Because we're not using a recurrent architecture, we'll need to fix some maximum string length M ahead of time. Names shorter than M will need to be padded with some special character.

For example, let's take our alphabet to be just `{a,b,c,d,e,$}`, where '$' is our padding character, and set M to 4. We can encode the name '*deb*' using the following 4x6 matrix:

|index  |a      |b      |c      |d      |e      |$      |
|-------|-------|-------|-------|-------|-------|-------|
|0      |0      |0      |0      |1      |0      |0      |
|1      |0      |0      |0      |0      |1      |0      |
|2      |0      |1      |0      |0      |0      |0      |
|3      |0      |0      |0      |0      |0      |1      |

[TODO: These tables look like crap]()

(It's easier to think of these as 2-d matrices, but in the code, we'll actually be representing them as a 1-d concatenation of the rows.)


### Restricted Boltzmann Machines

#### How do they work?

A restricted Boltzmann machine (or RBM) is a neural network consisting of two layers of binary units[\*](TODO: footnote on variations), one visible and one hidden. The visible units represent examples of the data distribution we're interested in - in this case, names, encoded as concatenations of one-hot character vectors.

<div class="imgcap">
    <img src="/img/rbm.svg">
    <div class="thecap">A tiny RBM with 3 hidden units and 24 visible units (not all shown) representing the name "deb". Two hidden units and 2 visible units (that we can see) are turned on - the rest are off.</div>
</div>
<br/>

As a generative model, RBMs try to learn the distribution of the data they're given. They do this by learning to assign relatively low 'energy' to samples from the data distribution.

```python
class RBM(object):
    # TODO: Should probably describe the shape/semantics of self.W and biases?
    # ...
    def energy(self, visible, hidden):
        # TODO: Is this actually accurate?
        return -1*(np.dot(visible, self.visible_bias)
            + np.dot(hidden, self.hidden_bias)
            + np.dot( np.dot(hidden, self.W), visible))

    def energy(self, visible):
        """Equivalent to 
            sum(self.energy(visible, h) for h in all_possible_hidden_vectors)
        But not exponential in h"""
        return -1*(np.dot(visible, self.visible_bias)
            + np.logaddexp(0, np.dot(visible, self.W.T) + self.hidden_bias))
```

In the diagram above, the energy of the RBM will be equal to the negative sum of:

- the biases on the two active (red) hidden units
- the biases on the active (blue) visible units
- the weights connecting the red and blue units (i.e. the bold lines)

There are weights connecting every visible unit to every hidden unit, but no intra-layer (visible-visible, or hidden-hidden) weights. During training, the RBM will adjust these weights, and a vector of biases for the visible and hidden units, in such a way as to bring down the energy of good examples, and raise the energy of bad ones. 

#### Gibbs sampling

One of the fundamental operations we can perform on an RBM is called Gibbs sampling.

```python
    def gibbs_sample(self, visible):
        hidden = self.sample_hidden(visible)
        return self.sample_visible(hidden)

    def sample_hidden(self, visible):
        """Sample from P(h|v)"""
        hidden_probs = logistic(np.dot(visible, self.W.T) + self.visible_bias)
        return np.random.rand(hidden_probs.shape) < hidden_probs

    def sample_visible(self, hidden):
        """Sample from P(v|h)"""
        visible_probs = logistic(np.dot(hidden, self.W.T) + self.hidden_bias)
        return np.random.rand(visible_probs.shape) < visible_probs
```

Gibbs sampling starts from some configuration of one of the layers, and essentially bounces back and forth between the visible and hidden layers, continually asking "What hidden states go well with these visible states?", then "What visible states go well with these hidden states?".

Here's an example of how the state of the visible layer evolves during repeated Gibbs sampling. This example uses a model trained on the geo names dataset:

|i      |visible        | energy(visible)|
|-------|---------------|----------------|
1|      tyxeavonam adhbufwij|    35.4
2|      tenrimilty in dlenic|    -19.2
3|      gedromoold in foerna|    -21.0
4|      eo  wiogh in fulrsa|     -21.7
5|      cl biigs in fusrta|      -24.2
6|      lhgwiogs in filrma|      -20.8
7|      sogwiitt on fueeso|      -29.2
8|      mockiotd on lueera|      -34.9
9|      commaosy an luvera |     -30.1
10|     seroont on lemert   |    -35.8
11|     g an sun lerort| -42.8
12|     toon yan ferert |-55.6
13|     doin ron forest |-61.0

It's not a coincidence that the energy is going down over time, or that the sample with the lowest energy is the one that looks most like a real name. There's a connection between how we do sampling and our energy function above. The probability of turning on a particular hidden unit h\_j, given a visible vector v is:

    1 / 1 + exp(-1 * (hidden_bias[j] + W[j]*v))

If the model doesn't care about h\_j and gives it a bias of 0, and all its weights 0, then the exponent goes to 0, and the probability of turning on becomes 1/2. As we decrease the bias, or give it negative weights at indices where v is turned on, then the energy associated with that unit being on increases, and the probability goes toward 0. If we do the opposite, the effect on energy becomes negative, and the probability goes to 1. So, the probability of turning on a hidden unit is proportional to the negative energy difference associated with turning it on. The same argument applies to visible units conditioned on hidden vectors.

Remember how we said that RBMs are trying to learn the distribution of our data? An important property of RBMs is that **if we do repeated Gibbs sampling for long enough, our samples will eventually start coming from exactly the model's estimation of that distribution.**

#### Training RBMs (1)

[TODO: Which of these training sections is better? Leaning to 2.]()

There are a few methods for training RBMs. The one I'll be using is called "Persistent Contrastive Divergence". Here's a sketch:

```python
def train(self, training_data, epochs):
    fantasy_particles = np.zeros(self.batch_size, self.visible_shape)
    for _ in epochs:
        random.shuffle(training_data)
        for train_examples in training_data.minibatches(self.batch_size):
            fantasy_hidden_probs = self.hidden_probs(fantasy_particles)
            fantasy_hiddens = np.random.rand(fantasy_hidden_probs.shape) < fantasy_hidden_probs

            positive_hidden_probs = self.hidden_probs(fantasy_particles)
            positive_hiddens = self.sample_hidden_units(train_examples)
            
            # Adjust model parameters away from the fantasy particles, and
            # toward the positive examples in this batch of train data
            self.visible_bias += self.learning_rate * (train_examples - fantasy_particles)
            self.hidden_bias += self.learning_rate * (positive_hidden_probs - fantasy_hidden_probs)
            self.W += np.dot(positive_hidden_probs, train_examples.T)
            self.W -= np.dot(fantasy_hidden_probs, fantasy_particles.T)
            fantasy_particles = self.sample_visible_units(fantasy_hiddens)
```

The key intuition here is that we're adjusting the parameters to decrease the energy of the training examples in our minibatch, and to increase the energy of our "fantasy particles". These fantasy particles are the result of n rounds of Gibbs sampling (where n is the number of minibatch updates performed so far), starting from some arbitrary noise. In our case, they'll be strings like "gingley pass" or "sled ditch". We usually keep the same number as our batch size. The idea is that these approximate the current model distribution.

Because we effectively increase the energy of our fantasy particles with each update, we encourage them to jump around and explore other regions. 

Probably the most commonly used training procedure is (non-persistent) contrastive divergence. This is the same as the procedure above, except that instead of fantasy particles, our proxy for the model distribution is a set of "reconstructions" - training examples that have undergone just one round of Gibbs sampling. I use PCD here because, according to Geoff Hinton, it "is the recommended method if the aim is to build the best density model of the data" (rather than pretraining). 

#### Training RBMs (2)

There are a few methods for training RBMs. The one I'll be using is called "Persistent Contrastive Divergence". Here's a pseudocode sketch:

```
initialize $batch_size random visible configurations - call these "fantasy particles"
for each epoch:
    shuffle the training data
    for each minibatch of training data:
        lower the energy of this minibatch (by adjusting weights and biases)
        raise the energy of the fantasy particles
        perform a round of Gibbs sampling on the fantasy particles
```

We're trying to do something like nudging the model distribution toward the target distribution. As is typical for stochastic gradient descent, a small batch of training examples stands in for the target distribution. The more interesting part is how to represent the model distribution. PCD uses a chain of "fantasy particles", resampled at every step. 

As we noted above, if we do Gibbs sampling long enough, we eventually get exactly the model distribution. But in this case, we're never stepping foot in the same river twice - we're changing the model's parameters between each round of Gibbs sampling, so we have no theoretical guarantees. Like vanilla contrastive divergence (where the model distribution is represented by the result of one round of Gibbs sampling on a training example), it's a hack that turns out to work well in practice, even though it's not obvious why it should.


#### Softmax units

One thing to notice is that, for every block of N visible units representing a character, there will always be exactly one unit turned on - the probability we assign to any vector failing this criterion should be 0. We should help the network out by giving it this information for free. We'll do that by treating each of those blocks as a single 'softmax' unit. Rather than sampling each visible binary unit independently, and turning it on with some probability according to the sum of the incoming weights from the hidden layer, we'll sample using the [softmax function](https://en.wikipedia.org/wiki/Softmax_function). 

(Doing this is not strictly necessary. But, empirically, I observed that it helped training a lot.)

### More reading

If you're interested in reading more about RBMs, I highly recommend Geoff Hinton's [A Practical Guide to Training Restricted Boltzmann Machines](http://www.cs.toronto.edu/~hinton/absps/guideTR.pdf), which was my bible during this project. The [Wikipedia article](https://en.wikipedia.org/wiki/Restricted_Boltzmann_machine) has a good overview if you prefer LaTeX formulas to code.

### The Code

[What is there to say here? Should this go toward the end](TODO)

### Evaluating Results

[This is complicated enough that I wrote a second blog post about it](TODO)

### Sampling

[TODO: Separate this one out into a separate post too?]()

Once we've trained a model, we want to see what kinds of hilarious garbage it dreams up. How do we do that? Well, we know that if we start anywhere and do Gibbs sampling long enough, we'll get the model distribution. There's even a proof of it in a drawer somewhere! Problem solved, right?

In practice, "long enough" might be a long, long time for some models. An RBM (or, more generally, any Markov chain) that takes a long time to converge is said to have a low [mixing rate](https://en.wikipedia.org/wiki/Markov_chain_mixing_time). Such models may wallow in valleys of (locally) low energy for a long time, and be very sensitive to initial conditions.

[Here's](/assets/tablesamples_usgeo_goodmix.html) what a well-behaved model looks like. Each row represents a different starting point for the sampling, and each line is a separate "fantasy particle", sampled in parallel. The samples in the final column of each row (representing 10k iterations of sampling) are fairly similar, and there's no evidence of any particles getting stuck. After 10k iterations, the training examples are substantially transformed.

[Here's](/assets/tablesamples_usgeo_badmix.html) what a bad mixing rate looks like. Even after 10k iterations, there are dramatic differences in samples depending on how the chains were started. chunks/silhouettes/train look pretty reasonable, but the chains started from zeroed-out vectors look like noise. Many of the chains started from training examples still look a lot like their starting configuration - e.g. "carleton pond dam" -> "greslocd ponn dam", "southwestern college" -> "southordoure college").

[TODO: Add a legend to HTML files explaining meaning of different initialization methods]()

One way to avoid the second scenario is to introduce a **weight cost** to discourage large weights, which are associated with poor mixing rates. 

#### goon remetery

Let's consider a sample from our well-behaved model: "goon remetery". Ouch, so close. But remember that our procedure for sampling the visible units is stochastic. It may be that we had P("r") = 0.1, P("c")=0.8 for index 5, and that we just got unlucky. To maximize the quality of our samples, we could sample determnistically at the very last round of sampling, always taking the character with the highest probability.

This is actually a (trivial) special case of [simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing). To take it further, we'll need to introduce the concept of "temperature" to the sampling process:

```python
    def sample_hidden(self, visible, temperature):
        """Sample from P(h|v)"""
        hidden_probs = logistic(np.dot(visible, self.W.T/temperature) + self.visible_bias/temperature)
        return np.random.rand(hidden_probs.shape) < hidden_probs
```

When temperature=1.0, we have our normal sampling procedure. Other values will scale our weights and biases up or down. A high temperature has the effect of flattening out the probability distribution. In the limit, when T is infinite, we'll ignore the weights and biases, setting the hidden units with a coin flip (and setting the visible units with the flip of a ~26-sided coin).

A low temperature has the effect of "sharpening" the probability distribution, with the rich getting richer and the poor getting poorer. T=0 leads to exactly the procedure we described earlier where we always take the character with the highest score.

#### Simulated Annealing

We can draw our samples with simulated annealing by starting our chain at a high temperature and gradually lowering it. This is appealing for a few reasons:

Firstly, it defeats models with low mixing rates. Recall that our problem was fantasy particles stubbornly lying in local valleys. Turning up the heat will bounce them out and encourage them to explore other regions. 

It also lets us draw samples with much lower energy than what we would get from repeated Gibbs sampling at T=1 - even after many iterations. And low energy samples tend to be qualitatively superior. We can no longer pretend that we're trying to draw from exactly the model distribution - we may be drawing from a sharpened version of that distribution that favours especially probable points. In practice, we're totally cool with this, as long as we still get some reasonable variety.

[Diagrams go here](TODO)

### Results

Note: With the exception of the GitHub dataset, models were trained on lowercased names (to do otherwise would double the size of the visible layer for little benefit). I've uppercased the first character of each token in the below samples for aesthetic reasons. I've preserved the case of the strings generated by the GitHub model.

[TODO: Link to demo app and some larger raw files - including examples from bad models]()

## Human names

[TODO: Get some good examples here. Maybe try to find a better dataset?]()

## Geographic names

Here's a random selection of samples from a model with 180 hidden units trained for around 50 epochs on 680k

    Little Granch Canyon
    Little Trough Winery
    Will Apring Marina
    Lace Crossing
    Cammath Square
    Bill Creek Rapids
    Fort Cemetery
    City Of Man Bridge
    Love View Church
    Rucker Mountain
    Ton Ellvator
    City Of Sideteries
    Afford Mountain
    Roder Brown Spring
    Adge Stream
    Wittherof Thusgules
    Arke Grange
    West Point Acres
    Anevany Hospital
    Bell Mine
    Raveriver Spring
    Lly Creek Meadow
    Alley Spring
    Beg Street School
    Lake Townhall
    Loke High School
    Aster Mountain
    Manter Millpond
    Big Ridge School
    Taw Creek Gap
    Wister Spring
    Villey School

A few of my favourites:

    Mount Mountain
    Crackspork
    Flart
    City of Pork
    Mayo Creek
    Mockian Mind Camp
    Licklers Corners
    Gibber Springs Trail
    Days Inn Oil Field
    Rucky Rock Summit
    Hilford Hills
    Lame Pond
    Well Dam
    City of Inglandibble

## GitHub repository names

Here are some random samples from a model with 350 hidden units trained for 20 epochs on 3.7m repository names:

    testing_project
    css-qlation-server
    Learning_Gitertion
    Spee-Sample-Server
    Learning_Generator
    MS-Service-Manager
    my_pert_stsi
    CSC-1201-Semplate
    san
    node-book-mite
    datasian.github.io
    node-ation-minder
    CS_Codes_Project
    sliding.js
    Google-Application

Some favourites I encountered:

    instaCloud
    python-licker
    mobile-masher
    JustQuery
    hello-bool
    dataserverclient
    2048-ing-master

I was actually surprised by the quality of these samples, and became suspicious that it might be memorizing examples from the training set. It turns out there are some samples that appear in the training data (including the first name above, "testing\_project"), but it's fairly rare. Of the 38 names in my running list of favourites (of which the second list above is an excerpt), only 2 occurred in the training dataset. Given the size and entropy of the dataset, these co-occurences aren't too alarming.

## Bonus: Board games

I spent a bit of time trying to learn board game names, but wasn't particularly successful. I suspect my dataset, at about 50k games, was just too small.

[TODO: Actual examples. But maybe retry training first just in case given what you've learned re learning rate, annealing etc.?]()

#### Comparing to the Unreasonable Effectiveness of RNNs

Blah blah comparison.

### Understanding what's going on

- hidden activations
- receptive fields


### Next steps

Blah blah.
