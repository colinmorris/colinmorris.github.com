---
layout: post
title: "Title TK char rbms"
categories: machine-learning
---

<!-- Graphic goes here? -->

### Named entity generation

A classic problem in NLP is [named entity recognition](https://en.wikipedia.org/wiki/Named-entity_recognition). Given a text, we have to identify the proper nouns. But what about the generative mirror image of this problem? What if we ask a model to dream up new names of people, places and things? It turns out it comes up with some funny stuff! Here's a random sampling of geographic place names:

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


### Restricted Boltzmann Machines

#### How do they work?

A restricted Boltzmann machine (or RBM) is a neural network consisting of two layers of binary units, one visible and one hidden. The visible units represent examples of the data distribution we're interested in - often images, but we can also encode text (as we'll see shortly), or [other examples](?). 

As a generative model, RBMs try to learn the distribution of the data they're given. It does this by trying to assign relatively low 'energy' to samples from the data distribution. The energy of a visible vector is defined as...

    E(v) = 

Where the energy of a visible vector v, and a hidden vector h is...

    E(v, h) = 


<!-- stop there? -->
There are weights connecting every visible unit to every hidden unit, but no intra-layer (visible-visible, or hidden-hidden) weights. During training, the RBM will adjust these weights, and a vector of biases for the visible and hidden units, in such a way as to bring down the energy of good examples, and raise the energy of bad ones. The probability of a visible vector is...

    P(v) =

Where Z is the sum of the energy over *all* possible vectors. 

#### What are they good for?

As the name suggests, a generative model can be used to generate samples from the model's approximation of the data distribution. That is, we can show it a bunch of examples of names, and then say "give me more like that". That's the capacity in which I'll be using them in this experiment.

In practice, RBMs are more often used to pretrain the weights of a feedforward network which is then used for supvervised learning. Like autoencoders (which are the more popular choice for this nowadays), RBMs are good 'feature detectors'. Also like auto-encoders, they can be stacked on top of one another to learn increasingly abstract representations.

### Character-level RBMs

Most NLP models stop at the word level, representing texts by counts of words (or by word vectors). But we don't want to limit ourselves to regurgitating words we've seen in the training data - we want whole new words (like "memarill" or "campterton"). For that, we need to go deeper, down to the character level.

We'll represent names as a sequence of M [one-hot](https://en.wikipedia.org/wiki/One-hot) vectors [diagram]() of length N, where M is the maximum length of name that we'll consider, and N is the size of our alphabet. Because we're not using a recurrent architecture, we'll need to fix some string length ahead of time. Names shorter than M will need to be padded with spaces\*. 

#### Softmax units

One thing to notice here is that, for every block of N visible units representing a character, there will always be exactly one unit turned on - the probability of any vector failing this criterion should be 0. We should help the network out by giving it this information for free. We'll do that by treating each of those blocks as a single 'softmax' unit. Rather than sampling each binary unit indepedently, and turning it on with some probability according to the sum of the incoming weights from the hidden layer, we'll sample using the [softmax function](https://en.wikipedia.org/wiki/Softmax_function). 

(Doing this is not strictly necessary. But, empirically, I observed that it helped training a lot.)

### The Code

### The Data

### Sampling

### Results

#### Comparing to the Unreasonable Effectiveness of RNNs


