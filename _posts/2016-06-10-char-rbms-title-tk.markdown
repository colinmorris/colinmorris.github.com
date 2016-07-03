---
layout: post
title: "Title TK char rbms"
categories: machine-learning
custom_css: recep
---

<!-- title candidates...
Dreaming of GitHub repositories with RBMs
Generating named entities with RBMs: Journey to Hilford Hills
-->

<!-- Graphic goes here? -->

### Named entity generation

A classic problem in natural language processing is [named entity recognition](https://en.wikipedia.org/wiki/Named-entity_recognition). Given a text, we have to identify the proper nouns. But what about the generative mirror image of this problem? What if we ask a model to dream up new names of people, places and things? 

I wrote some toy code to do this using Restricted Boltzmann Machines, a nifty (if slightly passe) variety of generative neural network. It turns out they come up with some funny stuff! For example, if we train it on GitHub repository names, it can come up with new ones like...

    fuzzyTools
    Slick-Android-App
    sublime-app
    Backbone-Switcher
    thenchon

If you want to flip through more examples, I wrote a little [web app](/rbm/repos/) for that (and analogous ones for generating [US place names](/rbm/geo/) and [actor names](/rbm/actors/)). If you want to learn about how I got there, read on. 

In this post, I'll give a brief overview of Restricted Boltzmann Machines and how I applied them to this problem, and try to give some intuition about what's going on in the brain of one of these models.

My code is available [here](https://github.com/colinmorris/char-rbm) on GitHub. Feel free to play with it (with the caveat that it's more of a research notebook than a polished library). 

### Restricted Boltzmann Machines

#### Background - generative models

Our goal is to build a model that spits out funny names, but our path there will be a bit indirect. The problem that RBMs - and generative models in general - are trying to solve is **learning a probability distribution**. We want to learn a function `P` that assigns every string a probability according to its plausibility as a particular kind of name. e.g. in the case of personal names, we probably want...

    P("John Smith") > P("Dweezil Zappa") >> P("mCN xGl  JeY")

If we can sample from this distribution, the effect should be like thumbing through a phone book. We'll see lots of "John Smith"s, but not very many "Dweezil Zappa"s. And we could probably spend our whole life looking for a "mCN xGL  JeY" and never find one.

#### Representing Inputs

We've said we want to learn a function over strings, but anything we're going to feed into a neural network needs to be transformed into a vector of numbers first. How should we do that in this case?

Most NLP models stop at the word level, representing texts by counts of words (or by word embeddings, such as those produced by word2vec). But breaking up GitHub repository names (like `tool_dbg`, `burgvan.github.io`, or `refcounting`) into words isn't trivial. And more to the point, we don't want to limit ourselves to regurgitating words we've seen in the training data. We want whole new words (like `Brinesville`[TODO:link to line #]()). For that, we need to go deeper, down to the character level.

We'll represent names as sequences of [one-hot](https://en.wikipedia.org/wiki/One-hot) vectors of length `N`, where `N` is the size of our alphabet. 

Because we're not using a recurrent architecture, we'll need to fix some maximum string length `M` ahead of time. Names shorter than `M` will need to be padded with some special character.

For example, let's take our alphabet to be just `{a,b,c,d,e,$}`, where '$' is our padding character, and set M to 4. We can encode the name '*deb*' using the following 4x6 matrix:

|index  |a      |b      |c      |d      |e      |$      |
|-------|-------|-------|-------|-------|-------|-------|
|0      |0      |0      |0      |1      |0      |0      |
|1      |0      |0      |0      |0      |1      |0      |
|2      |0      |1      |0      |0      |0      |0      |
|3      |0      |0      |0      |0      |0      |1      |

[TODO: These tables look like crap]()

#### RBMs

A restricted Boltzmann machine (henceforth RBM) is a neural network consisting of two layers of binary units[\*](TODO: footnote on variations), one visible and one hidden. The visible units represent examples of the data distribution we're interested in - in this case, names. 

<div class="imgcap">
    <img src="/img/rbm.svg">
    <div class="thecap">A tiny RBM with 3 hidden units and 24 visible units (not all shown) representing the name "deb". Two hidden units and 2 visible units (that we can see) are turned on - the rest are off.</div>
</div>
<br/>

Again, RBMs try to learn a probability distribution from the data they're given. They do this by learning to assign relatively low 'energy' to samples from the data distribution. That energy will be proportional to the learned probability.

```python
class RBM(object):
    def energy(self, visible, hidden):
        return -1*(np.dot(visible, self.visible_bias)
            + np.dot(hidden, self.hidden_bias)
            + np.dot( np.dot(hidden, self.W), visible))

    def energy(self, visible):
        """Equivalent to summing the energy of this visible layer over all 
        possible hidden layers (but not exponential). This is why we can talk 
        about the energy of a particular string in isolation."""
        return -1*(np.dot(visible, self.visible_bias)
            + np.logaddexp(0, np.dot(visible, self.W.T) + self.hidden_bias))
```

In the diagram above, the energy of the RBM will be equal to the negative sum of:

- the biases on the two active (red) hidden units
- the biases on the active (blue) visible units
- the weights connecting the red and blue units (i.e. the bold lines)

There are weights connecting every visible unit to every hidden unit, but no intra-layer (visible-visible, or hidden-hidden) weights. During training, the RBM will adjust these weights, and a vector of biases for the visible and hidden units, in such a way as to bring down the energy of training examples, without bringing down the energy of everything else along with it.

<!-- TODO: is this necessary?
(That last part is important. The probability assigned to a vector `X` is equal to `E(x)` *divided by the sum of the energy assigned to all strings* - the [partition function](https://en.wikipedia.org/wiki/Partition_function_(mathematics\).)
-->


#### Softmax units

[TODO: With the section on Gibbs sampling gone, this no longer really makes sense.]()

One thing to notice is that, for every block of N visible units representing a character, there will always be exactly one unit turned on - the probability we assign to any vector failing this criterion should be 0. We should help the network out by giving it this information for free. We'll do that by treating each of those blocks as a single 'softmax' unit. Rather than sampling each visible binary unit independently, and turning it on with some probability according to the sum of the incoming weights from the hidden layer, we'll sample using the [softmax function](https://en.wikipedia.org/wiki/Softmax_function). 

(Doing this is not strictly necessary. But, empirically, I observed that it helped training a lot.)

#### More reading

If you're interested in reading more about RBMs, I highly recommend Geoff Hinton's [A Practical Guide to Training Restricted Boltzmann Machines](http://www.cs.toronto.edu/~hinton/absps/guideTR.pdf), which was my bible during this project. The [Wikipedia article](https://en.wikipedia.org/wiki/Restricted_Boltzmann_machine) has a good overview if you prefer LaTeX formulas to code.

### Results

Evaluating generative models is hard! As [A note on the evaluation of generative models] describes, the commonly used quantitative metrics for this task can disagree with each other, and with qualitative human assessments. To make matters worse, the gold standard metric for generative models (likelihood of heldout data) is actually intractable for RBMs! 

But you didn't come here to see graphs anyways, right? So let's just look at some samples.

(In fact, when tuning hyperparameters, I relied a lot on visual assesment of samples. I did find some metrics that correlated well with my assessments - a form of [pseudolikelihood](https://en.wikipedia.org/wiki/Pseudolikelihood) and denoising - but they weren't perfect. In the words of Geoff Hinton, "use them, but don't trust them".)

If you're curious, [this README](https://github.com/colinmorris/char-rbm/blob/master/samples/cleaned/README.markdown) has details on each of the models that generated the samples below, including the hyperparameters used for training and sampling. And [*this* README](TODO) has pointers to where each dataset was downloaded from and how it was preprocessed.

## Human names

One of the first things I tried was generating first names (as Andrej Karpathy did in his [Unreasonable effectiveness of recurrent neural networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/#generating-baby-names)). They turned out pretty well! e.g.

    aluna
    lamadona
    ellin
    dovin
    filker

(For reasons of computational efficiency all but one model was trained on a lowercased version of the dataset. The exception is the GitHub repository dataset, where case is a very meaningful source of variation.)

But I suspect this is actually not a very hard problem. I noticed that merely sampling according to the biases of the visible units (completely ignoring our weights/hidden units), produced kind of reasonable names already:

    borme
    yareeh
    vestey
    sexte
    barise
    patya
    maegae

A more difficult problem is generating *full* names. Here are some samples drawn from a model trained on the full names of 1.5m actors from the [IMDB dataset](http://www.imdb.com/interfaces) (more [here](https://github.com/colinmorris/char-rbm/blob/master/samples/cleaned/actors_unique.txt)):

    omar vole
    r.j. pen
    ronald w. males
    jean-paul recan
    marxel sode
    samuel j. varga
    lionel cone

(It turns out they meant "actors" in the gendered sense of the word, which is why you won't see any female names.)

The dataset included naming traditions from around the world which created several distinct modes that the model captured pretty well. For example, it generates names like...

    hiroshi tajamara
    hing-hying li
    vladimir tjomanovic
    giuseppe rariali

But is unlikely to generate a name like "hiroshi tjomanovic".

(Incidentally, Google tells me that none of "Tajamara", "Hing-hying", "Tjomanovic" and "Rariali" are actual extant names - though based on my limited exposure to Japanese/Chinese/Slavic/Italian names, I could have believed they were all real. We want to generate novel examples not copied from the training set, so this is good news.)

## Geographic names

It's not much of a stretch of the imagination to go from training on names of people to names of places (examples from the dataset: "Gall Creek", "Grovertown", "Aneta", "Goodyear Heights"). Here are some examples from our RBM's dreamed atlas (more [here](https://github.com/colinmorris/char-rbm/blob/master/samples/cleaned/usgeo_unique.txt)):

    sama
    marchestee hill
    wano
    fleminger river
    arring lake south
    jicky park
    mount ono
    oste
    lake day

Not bad! Who wouldn't enjoy a picnic in Jicky Park?

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

#### Bonus: Board games

I spent a bit of time trying to learn board game names, but wasn't particularly successful. I suspect my dataset, at about 50k games, was just too small.

[TODO: Actual examples. But maybe retry training first just in case given what you've learned re learning rate, annealing etc.?]()

### "Did they really need a neural network for that?"

This is a question that probably doesn't get asked often enough. Our results here are pretty neat, but before we chalk this up as another victory for the deep learning revolution, we should ask whether the problem we solved was actually difficult. I'll follow the example of [Yoav Goldberg](http://nbviewer.jupyter.org/gist/yoavg/d76121dfde2618422139) and use unsmoothed maximum-likelihood character level language models as my dumb baseline to compare against. In short, we'll just predict the next letter by looking at the last n, and looking at what letters came after that prefix in the training set.

Some examples from an order-4 model: 

    Bonny Maringer City of Lake
    Sour Motoruk Mountain
    Mount Branchorage Lakes
    Duck Kill Bar Rock
    Goatyard Point
    Noblit Hollow
    Spenceton
    Jay Canal Cemetery
    Oriflamming Beach
    Duncaster Reservoir
    The Gravel Creek
    Tunnel
    Old Park

Huh. Those are, uh, actually pretty excellent. And with 4-grams it's not at the point where it's just copying the training data. Around 25% of generated names exist in the training set (compared to 1% for a typical RBM sample), but I filtered those out of the list above. Several of the individual tokens above don't exist in the training set either, including the excellent "Goatyard".

Let's see if we can salvage our dignity by comparing performance on the GitHub dataset. The order-4 output is pretty goofy, so let's give it 5 characters of context:

    littlePython-hall-effectv-frontAngles2
    media
    EasyCanvas
    shutupmrnotific
    MinkGhost-deployShpaste_ember
    terrain-Exercise3
    gaben
    bot-repots-interestingGithub.io
    CredStatus
    wall-as
    BB-FlappyBao
    py_shopping-sample

Our baseline's not looking so hot now. It's interesting to note some mistakes here that the RBM model never makes. For example, it never flubs the formatting of a URL. It's also very good at picking a consistent scheme for case and separators for each name, e.g.:

    SAPAPP
    ruby-fale-project
    DataTownSample
    java-mails-rails

This is where being able to see the whole string at once really comes in handy. When our Markov model has generated as far as "mails", it doesn't have enough context to know whether it should make `java-mails-rails` or `java-mailsRails` or `java-mails_Rails` (great repo name, btw). We can always feed it even *more* context, but a window of 5 already leads to a lot of copy-pasting from the training set. For example, `shutupmrnotific` is funny, but it's just a truncation of a repo from the training set, `shutupmrnotification`.

#### Comparing to the Unreasonable Effectiveness of RNNs

Andrej Karpathy's excellent blog post on [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) was the first thing I read that got me really excited about deep learning and noodling around with neural networks, and it was also the inspiration for this little project. I loved the RNN-generated [names](http://cs.stanford.edu/people/karpathy/namesGenUnique.txt), and also found it interesting that they were probably the most difficult to distinguish from the training data.

At the local level, the source code, the Shakespeare, and the Wikipedia all look great. But zooming out, there's a lack of long-term coherence. What are Pandarus, Second Senator, Duke Vincentio, Second Lord, Viola, and a clown all doing in a room together? But the names didn't have this problem, because they're nice little atomic units - they don't need to flow together smoothly to tell a story. And because of their atomicity, we don't even need a recurrent architecture. We can treat each name individually as an input to a feed-forward network. (Or, in this case, feed-forward-and-backward.)

Usually when we give something up (like the ability to generate arbitrary-length sequences), we gain something in return. So let's compare our results to char-rnn to see whether we actually gained anything. 

[TODO: Examples go here. Still need to train a decent model.]()

### Understanding what's going on

A common trick when working with neural nets in the image domain is to visualize what a neuron in the first hidden layer is "seeing" by treating the weights between that neuron and each input pixel as pixel intensities. [TODO: link to example]()

We can do something similar here. The columns in the tables below represent positions in a 20-character geographic name. A green character represents a strongly positive weight (i.e. this hidden unit "wants" to see that character at the position). Red characters have strongly negative weights. 

These are just a couple examples taken from a model with 250 hidden units. [This page](/assets/recep.html) has visualizations of all those units.

{% include recep149.html %}

`vndubnr`? Actually, this word search is hiding several useful words. How many can you spot?

- vagrant (and Vagrant)
- android
- arduino
- angular
- ansible

<!-- It's interesting to note that these are all of a particular type. -->

This kind of multitasking is a common theme. And maybe it shouldn't be surprising. A good model of place names or GitHub repositories needs to remember more than 200-350 words (in addition to the [phonotactic](https://en.wikipedia.org/wiki/Phonotactics) rules for inventing new words), so most of the time, it can't afford to waste a hidden unit on a single word.

Of course, this hidden unit alone is perfectly happy to see hybrid prefixes like `vadroid`, or `andulant` or even `aaDmaae`. To avoid those, it needs a little help from its friends. For example...

{% include recep122.html %}

With this and the previous unit turned on, we're now happy to see 'ang**ul**ar' and 'ans**ib**le', but not 'vag**ra**nt', 'and**ro**id', or 'ard**ui**no'.

Whereas the last unit was focused on a few domain-specific words, this unit seems very generic. It mostly just wants to see a vowel in the fourth position followed immediately by a consonant (note that the chars it *least* wants to see there are `[a, u, o, e, i]`). Of course, our model has no explicit knowledge of what a "vowel" is, so it's neat to see it picked up naturally as a useful feature.

Another emergent behaviour is the strong spatial locality. Most hidden units have their strong weights tightly clustered on a particular neighbourhood of contiguous character positions. This is neat because, again, we never told our model that certain visible units are "next to" each other - it knows nothing about the input geometry.


{% include recep9.html %}
<br/> 

Most hidden units exhibit strong spatial locality - that is, their weights are focused on a particular region within the string. This is cool because we never told the model that certain visible units are 'next to' each other - it has no prior notion of the input geometry.

The model also seems to have learned the distinction between vowels and consonants. This hidden unit really wants to see a vowel at the 15th position (`[i, a, e, o, u]`), and a consonant at the position immediately before (with `[o, e, a, i, u]` being the characters it *least* wants to see). 

{% include recep72.html %}
<br/>

One of the most surprising things is how little evidence there is of overt 'memorization' of words. This unit almost seems to have memorized the word 'ranch', except that 'k' has a slightly higher weight than 'h'. But there's a lot of green spread across many letters - in addition to "ranch" (and therefore "branch"), this unit is happy with "range" (and "grange"), "marsh", "basin", and "entrance". And that's just counting exact matches on the top-5 characters.

This kind of multitasking is a common theme. And perhaps it shouldn't be surprising. Most of these RBMs have around 150-250 hidden units. A good model of place names or GitHub repositories needs to remember more than 250 important words (in addition to the [phonotactic](https://en.wikipedia.org/wiki/Phonotactics) rules for inventing new words), so a dense representation is called for.

This also accounts for some of the most common clunkers generated by otherwise strong models, e.g.:

    Little Malding Ponk
    Millard Landing Pork
    Nouth Bay Village
    Sorth River Lakes
    PHP-Remort-Server

(For the longest time, I also thought that my geo models' predilections for generating "Millponds" and "Tanks" were also symptoms of this. Turns out those are real things. If anyone knows what they are, I'd love to know.)


### Making it better

If I wanted to promote this from a toy project, the first thing I'd do would be to reimplement it using a library with GPU support like TensorFlow or Theano. A few more interesting improvements that suggest themselves...

#### Going Deeper

RBMs can be (almost trivially) stacked on one another to form a [deep belief network](https://en.wikipedia.org/wiki/Deep_belief_network). It seems plausible that additional layers would be able to learn higher layers of abstraction and generate even better samples.

In particular, I think this would help avoid solecisms like "Lake Lake". [TODO: becauase? Sort of relates to next point. Units already look at small neighbourhoods. Need to coordinate them for bigger picture.]() Okay, names like "Days Inn Oil Field" are pretty funny tho.

### Translation Invariance

Under the current architecture, for a model to learn the word "Pond" (a very useful word to learn), it needs to memorize a separate version for each place it can appear: `___ Pond`, `____ Pond`, `_____ Pond`, etc.

We'd like our model to learn robust, position-invariant patterns and understand that "Hays Pond" and "Darby Pond" are quite similar (even though their vector representations are completely disjoint). 

One solution to this problem is to use a recurrent architecture. Another, which is more readily applicable to RBMs, is to use convolutional units. This is just like CNNs for vision tasks, where we have many collections of units - 'filters' - that each see small patches of the image, and share weights. These can detect features both low-level (lines), or high (faces), no matter where they appear in the image.

We can do the same thing with text, except that our filters would be 1-d rather than 2-d. And if we stacked them, we could presumably also get low-level features at the bottom layer (e.g. common character bigrams and trigrams like "th", "ch", "ing") and more complex features at the top (words, or patterns of words, like `$foo pond` or `$foo pond dam`).

### Practical Applications

None whatsoever.

### Acknowledgements

[The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) by Andrej Karpathy inspired me to play with character-level representations (and was basically the first thing I read that got me excited about deep learning). If you haven't read it already, go do it now! [TODO: compare results to char-rnn?]()

My RBM implementation was built on top of scikit-learn's [BernoulliRBM](http://scikit-learn.org/stable/modules/generated/sklearn.neural_network.BernoulliRBM.html#sklearn.neural_network.BernoulliRBM) class, which is cleanly written and well-commented, and easy to hack on out of the box.

Thanks to Falsifian for reviewing a draft of this post and teaching me about simulated annealing.
