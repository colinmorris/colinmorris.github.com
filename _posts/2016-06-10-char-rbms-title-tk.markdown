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

Some other domains that could be fun to play with:

- book titles
- movies
- songs
- bands
- prescription drugs

I was able to find large public datasets for some of these domains (e.g. [the Project Gutenberg catalog](http://www.gutenberg.org/wiki/Gutenberg:Offline_Catalogs) for books), but a common problem was that they would often contain names from many different languages mixed together. Which makes for a harder problem, but more significantly, makes it harder for me to assess the quality of outputs. (And as I'll describe later, qualitative assessment turned out to be important.)

### Representing Inputs

The first thing we need to consider is what the input layer ("visible" layer in RBM parlance) is going to look like. How do we represent these strings we're trying to model?

Most NLP models stop at the word level, representing texts by counts of words (or by word vectors). But we don't want to limit ourselves to regurgitating words we've seen in the training data - we want whole new words (like "memarill" or "campterton"). For that, we need to go deeper, down to the character level.

We'll represent names as a sequence of [one-hot](https://en.wikipedia.org/wiki/One-hot) vectors of length N, where N is the size of our alphabet. 

Because we're not using a recurrent architecture, we'll need to fix some maximum string length M ahead of time. Names shorter than M will need to be padded with some special character.

For example, let's take our alphabet to be just {a,b,c,d,e,$}, where '$' is our padding character, and set M to 4. We can encode the name 'deb' using the following 4x6 matrix:

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

A restricted Boltzmann machine (or RBM) is a neural network consisting of two layers of binary units, one visible and one hidden. The visible units represent examples of the data distribution we're interested in - in this case, names, encoded as concatenations of one-hot character vectors.

<div class="imgcap">
    <img src="/img/rbm.svg">
    <div class="thecap">A tiny RBM with 3 hidden units and 24 visible units (not all shown) representing the name "deb". Two hidden units and 2 visible units (that we can see) are turned on - the rest are off.</div>
</div>
<br/>

As a generative model, RBMs try to learn the distribution of the data they're given. They do this by learning to assign relatively low 'energy' to samples from the data distribution.

```python
class RBM(object):
    # ...
    def energy(self, visible, hidden):
        # TODO: Is this actually accurate?
        return -1*(np.dot(visible, self.visible_bias)
            + np.dot(hidden, self.hidden_bias)
            + np.dot( np.dot(hidden, self.W), visible))

    def energy(self, visible):
        """Equivalent to 
            sum(self.energy(visible, h) for h in all_possible_hidden_vectors)
        But not exponential in h!"""
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

Gibbs sampling essentially bounces back and forth between the visible and hidden units, continually asking "What hidden states go well with these visible states?", then "What visible states go well with these hidden states?".

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

There are a few methods for training RBMs. The one I'll be using is called "Persistent Contrastive Divergence". Here's a sketch:

[TODO: just do pseudocode?]()

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

There are a few methods for training RBMs. The one I'll be using is called "Persistent Contrastive Divergence". Here's a sketch:

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

One thing to notice is that, for every block of N visible units representing a character, there will always be exactly one unit turned on - the probability we assign to any vector failing this criterion should be 0. We should help the network out by giving it this information for free. We'll do that by treating each of those blocks as a single 'softmax' unit. Rather than sampling each binary unit independently, and turning it on with some probability according to the sum of the incoming weights from the hidden layer, we'll sample using the [softmax function](https://en.wikipedia.org/wiki/Softmax_function). 

(Doing this is not strictly necessary. But, empirically, I observed that it helped training a lot.)

### More reading

If you're interested in reading more about RBMs, I highly recommend Geoff Hinton's [A Practical Guide to Training Restricted Boltzmann Machines](http://www.cs.toronto.edu/~hinton/absps/guideTR.pdf), which was my bible during this project. The [Wikipedia article](https://en.wikipedia.org/wiki/Restricted_Boltzmann_machine) has a good overview if you prefer LaTeX formulas to code.

### The Code

[What is there to say here? Should this go toward the end](TODO)

### Evaluating RBMs

RBMs have a reputation for being a bit finnicky to train, and my experience working on this project is consistent with that. And there are a lot of hyperparameters to tweak. The most significant one is probably learning rate, but some others include:

- Weight cost (add a cost to the magnitude of weights to prevent overfitting, and encourage a good mixing rate)
- Batch size
- Number of fantasy particles
- Number of hidden units
- Epochs (number of times to cycle through the training data)
- Number of rounds of Gibbs sampling on fantasy particles per update (usually 1, but could be more)

There are also some knobs to turn that are specific to this problem, like:

- Whether to do softmax sampling of visible units
- Maximum string length
- Padding character (using spaces reduces the complexity of the model by reducing the size of the visible layer, but a special padding character gives a clearer signal.)

It makes sense to try lots of variations on these parameters, and see what sticks. But, having trained a bunch of models, how do we rank them?

This turns out to be a surprisingly hairy problem. If we were classifying spam, the answer would be obvious - we want the model with the highest accuracy. (Or F\_Beta score for some Beta). 

The most obvious way to assess a generative model is to look at the probability it assigns to some data from the target distribution - ideally, heldout test data that it didn't see during training. If `P_A(test_set) > P_B(test_set)` then we can say that model A is better than B. 

But here's a bombshell I've been holding on to until now. **Likelihood is intranctable for RBMs**. The probability of a visible vector v and hidden vector h is...

    P(v, h) = 1/Z * exp(-E(v,h))

`E(v,h)` is our familiar energy function from earlier, but `Z` is new. It's called the *partition function*, and it's defined as

    sum(exp(-E(v,h)) for (v,h) in all_possible_v_and_h)

If we want to train a model on GitHub repository names of up to length 18, the number of possible visible vectors will be 66^18. That's a for loop we probably don't want to wait on.

Let's talk about some evaluation metrics that are tractable.

#### Pseudolikelihood

[Pseudolikelihood](https://en.wikipedia.org/wiki/Pseudolikelihood) approximates the likelihood of a vector X by the product of the probabilities of each individual X\_i conditioned on the other values. e.g.

    P(X='Bort') = P(X[0] = 'B' | '_ort')
                * P(X[1] = 'o' | 'B_rt')
                * P(X[2] = 'r' | 'Bo_t')
                * P(X[3] = 't' | 'Bor_')

To understand why this isn't a perfect approximation, let's consider a name like 'Barbara'.

I'll use [ghits](http://itre.cis.upenn.edu/~myl/languagelog/archives/000954.html) as a rough proxy for name popularity. "Barbara" has around 500 Mghits. There are no single-character substitutions that have anywhere near that popularity. The only reasonably popular variants I could find were "Darbara" (300k), and "Barbora" (15m). So, if our conditional probabilities follow these counts, our pseudolikelihood product looks something like:

P(X='Barbara') = .995 * .999 * .999 * .999 * .95 * .999 * .999 ~= .90

I do not live in a universe where 90% of people are named 'Barabara'. Though I kind of wish I did.

#### Noise discrimination 


We can't directly calculate the probability of a string, but because E(X) is directly proportional to P(X), we can easily tell whether one string is more or less likely than another, by comparing their energies.

A good model should assign high likelihood to data from the target distribution. Which is another way of saying it should assign higher likelihood to data from the target distribution than it does to some data from not-the-target-distribution.

If we have some mutagen function f that introduces some noise to an instance, we can propose a binary classification problem where the classifier wins if `E(x) < E(f(x))`. 

One simple function we can use just ignores x and returns some uniform noise (either in the space of binary vectors, or one-hot character vectors). This is maybe a bit too easy because most mutants can be tossed out immediately for reasons of form rather than content. For example, the geo-names training corpus will never contain:

- a padding character preceding a non-padding character
- two or more consecutive spaces
- a string with no padding characters or spaces (i.e. a single-word name 20 characters long)

This is not a great differentiator, since even the worst models get error rates around 0.1%.

A more subtle noising function is the one that just alters a single randomly-chosen character (while obeying the constraints above - e.g. never replacing a padding character past the first one). This is a better differentiator than pure noise. Error rates range from 5.5% to 10.6%. 

[Scatter plots of PL vs. err rate](TODO)

Yet another noising function returns a 'sillhouetted' version of x, preserving the spaces and padding characters, but replacing all the other characters with ones chosen uniformly at random. In terms of differentiation, this one seems strongest, with error rates ranging from 0.4% to 12.1%. 

#### Qualitative Evaluation

Blah blah.

#### Other methods.

Annealed importance sampling, reconstruction error, blah blah.

### Sampling

How to sample.

### Understanding what's going on

- hidden activations
- receptive fields

### Results

Blah blah results.

#### Comparing to the Unreasonable Effectiveness of RNNs

Blah blah comparison.

### Next steps

Blah blah.
