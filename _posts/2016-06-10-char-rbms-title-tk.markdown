---
layout: post
title: "Dreaming of GitHub repositories with RBMs"
categories: machine-learning
custom_css: recep
---

<!-- title candidates...
Dreaming of GitHub repositories with RBMs
Generating named entities with RBMs: Journey to Hilford Hills
-->

<!-- Graphic goes here? -->

<!-- ### Named entity generation -->

A classic problem in natural language processing is [named entity recognition](https://en.wikipedia.org/wiki/Named-entity_recognition). Given a text, we have to identify the proper nouns. But what about the generative mirror image of this problem - i.e. **named entity generation**? What if we ask a model to dream up new names of people, places and things? 

I wrote some code to do this using restricted Boltzmann machines, a nifty (if slightly passé) variety of generative neural network. It turns out they come up with some funny stuff! For example, if we train an RBM on GitHub repository names, it can come up with new ones like...

    fuzzyTools
    Slick-Android-App
    sublime-app
    Backbone-Switcher
    thenchon

If you want to flip through more examples, I wrote a little [web app](/rbm/repos/) for that (and analogous ones for generating [US place names](/rbm/geo/) and [actor names](/rbm/actors/)). If you want to learn about how I got there, read on. 

In this post, I'll give a brief overview of restricted Boltzmann machines and how I applied them to this problem, and try to give some intuition about what's going on in the brain of one of these models.

My code is available [here](https://github.com/colinmorris/char-rbm) on GitHub. Feel free to play with it (with the caveat that it's more of a research notebook than a polished library). 

### Restricted Boltzmann Machines

#### Background - generative models

Our goal is to build a model that spits out funny names, but our path there will be a bit indirect. The problem that RBMs - and generative models in general - are trying to solve is **learning a probability distribution**. We want to learn a function `P` that assigns every string a probability according to its plausibility as a particular kind of name. e.g. in the case of personal names, we probably want...

    P("John Smith") > P("Dweezil Zappa") >> P("mCN xGl  JeY")

If we can sample from this distribution, the effect should be like thumbing through a phone book. We'll see lots of "John Smith"s, we might eventually see a "Dweezil Zappa", but we'll probably never find a "mCN xGL  JeY".

#### Representing Inputs

We've said we want to learn a function over strings, but anything we're going to feed into a neural network needs to be transformed into a vector of numbers first. How should we do that in this case?

Most NLP models stop at the word level, representing texts by counts of words (or by word embeddings, such as those produced by word2vec). But breaking up GitHub repository names (like `tool_dbg`, `burgvan.github.io`, or `refcounting`) into words isn't trivial. And more to the point, we don't want to limit ourselves to regurgitating words we've seen in the training data. We want to generate whole new words (like, say, [Brinesville](https://github.com/colinmorris/char-rbm/blob/master/samples/cleaned/usgeo_unique.txt#L191)). For that, we need to go deeper, down to the character level.

We'll represent names as sequences of [one-hot](https://en.wikipedia.org/wiki/One-hot) vectors of length **N**, where **N** is the size of our alphabet. 

Because we're not using a recurrent architecture, we'll need to fix some maximum string length **M** ahead of time. Names shorter than **M** will need to be padded with some special character.

For example, let's take our alphabet to be just `{a,b,c,d,e,$}`, where '$' is our padding character, and set **M** to 4. We can encode the name '*deb*' using the following 4x6 matrix:

|index  |a      |b      |c      |d      |e      |$      |
|-------|-------|-------|-------|-------|-------|-------|
|0      |0      |0      |0      |1      |0      |0      |
|1      |0      |0      |0      |0      |1      |0      |
|2      |0      |1      |0      |0      |0      |0      |
|3      |0      |0      |0      |0      |0      |1      |


#### RBMs

A restricted Boltzmann machine (henceforth RBM) is a neural network consisting of two layers of binary units, one visible and one hidden. The visible units represent examples of the data distribution we're interested in - in this case, names. 

<figure>
    <img src="/img/rbm.svg">
    <figcaption>A tiny RBM with 3 hidden units and 24 visible units (not all shown) representing the name "deb". Two hidden units and 2 visible units (that we can see) are turned on - the rest are off.</figcaption>
</figure>

Again, RBMs try to learn a probability distribution from the data they're given. They do this by learning to assign relatively low **energy** to samples from the data distribution. That energy will be proportional to the (log) learned probability.

<!--
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
-->

In the diagram above, the energy of the RBM will be equal to the negative sum of:

- the biases on the two active (red) hidden units
- the biases on the active (blue) visible units
- the weights connecting the red and blue units (i.e. the bold lines)

There are weights connecting every visible unit to every hidden unit, but no intra-layer (visible-visible, or hidden-hidden) weights. During training, the RBM will adjust these weights, and a vector of biases for the visible and hidden units, in such a way as to bring down the energy of training examples, without bringing down the energy of everything else along with it.

<div class="panel panel-default">
<div class="panel-heading">Aside</div>
<div class="panel-body">
We said that energy is defined for a configuration of the visible <i>and</i> hidden layer, so what does it mean when we talk about the energy of a training example? The energy of a visible configuration is defined as <code>sum(energy(my_visible, hidden) for hidden in all_possible_hidden_vectors)</code>. We can't feasibly iterate over all 2<sup>n</sup> possible hidden layers, but it turns out there's an equivalent closed-form that's easy to calculate.
</div>
</div>

<!-- TODO: is this necessary?
(That last part is important. The probability assigned to a vector `X` is equal to `E(x)` *divided by the sum of the energy assigned to all strings* - the [partition function](https://en.wikipedia.org/wiki/Partition_function_(mathematics\).)
-->

#### Drawing samples

Once we've trained a model, how do we get it to talk? Starting from any random string, we sample the hidden layer. Then using that hidden layer, we sample the visible layer, getting a new string. If we repeat this process (called Gibbs sampling) a whole bunch of times, we should get a name out at the end.

What does it mean to sample the hidden/visible layer? Our binary units are **stochastic**, so given a string, each hidden unit will want to turn on with some probability, according to its bias and the weights coming into it from active visible units. Sampling the hidden layer given a visible layer means turning each hidden unit on or off according to some rolls of the dice.

#### More details (for nerds)

If you're interested in reading more about RBMs, I highly recommend Geoff Hinton's [A Practical Guide to Training Restricted Boltzmann Machines](http://www.cs.toronto.edu/~hinton/absps/guideTR.pdf), which was my bible during this project. 

I trained my models using [persistent contrastive divergence](http://www.cs.toronto.edu/~tijmen/pcd/pcd.pdf). I used softmax sampling (described in 13.1 of "Practical Guide") for the visible layer - without it, results were very poor.

When drawing samples, I actually used simulated annealing, which turned out to greatly improve sample quality compared to the naive sampling method described above.

[This README](https://github.com/colinmorris/char-rbm/blob/master/samples/cleaned/README.markdown) has details on each of the models that generated the samples below, including the hyperparameters used for training them and the annealing schedule used to sample from them. 

### Results

Let's look at what some RBMs dreamed up on a few different name-like datasets. [This README](https://github.com/colinmorris/char-rbm/blob/master/data/README.md) describes where each dataset was downloaded from and how it was preprocessed.

Any samples that existed in the training data were filtered out of the lists below (and in the name generators). This was anywhere between .01% of samples to 10% depending on the model. 

#### Human names

One of the first things I tried was generating first names (as Andrej Karpathy did in his [blog post on character-level RNNs](http://karpathy.github.io/2015/05/21/rnn-effectiveness/#generating-baby-names)). They turned out pretty well! e.g.

    aluna
    lamadona
    ellin
    dovin
    filker

(For reasons of computational efficiency all but one model was trained on a lowercased version of the dataset. The exception is the GitHub repository dataset, where case is a very meaningful source of variation.)

But I suspect this is actually not a very hard problem. I noticed that just sampling according to the biases of the visible units (completely ignoring the weights/hidden units), produced kind of reasonable names already:

    borme
    yareeh
    vestey
    sexte
    barise
    patya
    maegae

A more difficult problem is generating *full* names. Here are some samples drawn from a model trained on the full names of 1.5m actors from IMDB (more [here](https://github.com/colinmorris/char-rbm/blob/master/samples/cleaned/actors_unique.txt)): <!-- link to word lists or just the app? or both? -->

    omar vole
    r.j. pen
    ronald w. males
    jean-paul recan
    marxel sode
    samuel j. varga
    lionel cone

(It turns out they meant "actors" in the gendered sense of the word, which is why you won't see any female names.)

The dataset includes naming traditions from around the world which created several distinct modes that the model captured pretty well. For example, it generates names like...

    hiroshi tajamara
    hing-hying li
    vladimir tjomanovic
    giuseppe rariali

But is unlikely to generate a name like "hiroshi tjomanovic".

(Incidentally, Google tells me that none of "Tajamara", "Hing-hying", "Tjomanovic" and "Rariali" are actual extant names - though based on my limited exposure to Japanese/Chinese/Slavic/Italian names, I could have believed they were all real. We want to generate novel examples not copied from the training set, so this is good news.)

The model's favourite name (that is, the sample it assigned the lowest energy) was `christian scheller` (who [exists](http://www.imdb.com/name/nm1013241/) in the training set - `christian schuller`, who doesn't exist, is a close second).

#### Geographic names

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

The model's favourite place name was `indian post office`, which exists in the training set. It's second favourite is `wester post office`, which doesn't. 

#### GitHub repository names

How about some GitHub repos? More [here](https://github.com/colinmorris/char-rbm/blob/master/samples/cleaned/repos_unique.txt):
<!-- These were better? :(
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
-->

    frost2
    gruntus.js
    simpleshefe
    backbook.com
    thetesters
    mandolind
    smart-cheling
    ShreeCheck
    redget-2014
    tumber_server


Favourite name: `unity.github.io`, which doesn't exist in the training set.

#### Bonus: Board games

I spent a bit of time trying to learn board game names, but wasn't particularly successful. I suspect my dataset, at about 50k games, was just too small. Some samples (more [here](https://github.com/colinmorris/char-rbm/blob/master/samples/cleaned/games_unique.txt)):

    stopeest game
    chef ths gome
    the mitean game
    eleppitt care game
    chipling gome
    the sidal game
    elepes on the game
    the hing board game

Well, it's certainly figured out that the word "game" is important to unlocking the mystery of this distribution. Good job on that, RBM. It caught a few other types of game names, but again with a lot of jpeg compression:

    hocket'& pace
    spop the gime
    brauk
    pocket quizs

Favourite name: `the : the card game`. The most commonly sampled name was `the bile game`, which appeared **700** times in 35k samples. Neither game exists in the training set. If you do own a copy of "the bile game", don't invite me over for board game night. 

### "Did they really need a neural network for that?"

This is a question that probably doesn't get asked often enough. The results here are pretty neat, but before we claim another victory for the deep learning revolution, we should ask whether the problem we solved was actually difficult. I'll follow the example of [Yoav Goldberg](http://nbviewer.jupyter.org/gist/yoavg/d76121dfde2618422139) and use unsmoothed maximum-likelihood character level language models as my dumb baseline to compare against. In short, we'll generate strings one letter at a time, choosing the next letter by looking at the last n, and seeing which letters tended to follow that sequence in the training set.

Some examples from an order-4 model trained on the US place names dataset: 

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

Huh. Those are, uh, actually pretty excellent. And with 4-grams it's not at the point where it's just copying the training data. Around 25% of generated names exist in the training set, but I filtered those out of the list above. Several of the individual tokens above don't exist in the training set either, including the excellent "Goatyard".

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

Our baseline's not looking so hot now. It's interesting to note some mistakes here that the RBM model almost never makes. For example, it never flubs the formatting of a URL. It's also very good at picking a consistent scheme for case and separators for each name, e.g.:

    SAPAPP
    ruby-fale-project
    DataTownSample
    java-mails-rails

This is where being able to see the whole string at once really comes in handy. When our Markov model has generated as far as "mails", it doesn't have enough context to know whether it should make `java-mails-rails` or `java-mailsRails` or `java-mails_Rails` (great repo name, btw). We can always feed it even *more* context, but a window of 5 already leads to a lot of copy-pasting from the training set. For example, `shutupmrnotific` is funny, but it's just a truncation of a repo from the training set, `shutupmrnotification`.

<!-- But there are also other less flammable strawmen? HMMs? -->

### More stupid RBM tricks

The coolest thing we can do with our trained models is ask them to come up with new names, but that's not the only thing we can ask of them. We can also give them a name of our own choosing and ask them how good they think it is. Let's see if the model we trained on actor names has the hoped-for behaviour on the examples we described at the beginning:

    >>> E('john smith')
    -75.10
    >>> E('dweezil zappa')
    -38.14
    >>> E('mcn zgl jey')
    -34.25

Remember that lower energy corresponds to higher probability, so this is great! Also, energy is proportional to the log of the probability, so the model thinks that Dweezil is about 4 orders of magnitude more likely than Mcn, and 37(!) orders of magnitude less likely than John.  (That sounds like a lot, but the name "Dweezil" [is globally unique](https://books.google.com/ngrams/graph?content=Dweezil&year_start=1800&year_end=2000&corpus=15&smoothing=3&share=&direct_url=t1%3B%2CDweezil%3B%2Cc0). There are probably lots of alternate universes very similar to our own where no Dweezil will ever be born.)

It can be interesting to walk around the neighbours of a name to get a feel for the energy landscape of the model, and its robustness to small changes:

<div class="imgcap">
<img src="/assets/zohnsmith.png">
<div class="thecap">
    Energy assigned by our model to various single-character substitutions on <code>john smith</code>. Names are arranged into columns according to the affected index in the string. Note that the y-axis is reversed.
</div>
</div>

The chart above is heartening. First of all, it's great that our model assigned lower energy to the 'real' name than to any of the corrupted versions. But the order assigned to the corrupted names also seems very reasonable. The ones with the lowest energy - Messrs. Smitt, Smitz, and Smich - are the most plausible. The three samples with the highest energy are not only weird - they're not even pronouncable in English.

This is a nice intuitive way of evaluating our model's density function. We can't calculate the exact probability our model assigns to any instance, but we can compare probabilities. It seems clear that a good model should generally assign more energy to a sample from our dataset after we've randomly nudged it. In fact, we could have used something like this as a cost function to train our RBM, and if we had, we would have [wound up](http://www.iro.umontreal.ca/~vincentp/Publications/smdae_techreport.pdf) with a special case of a [denoising autoencoder](https://en.wikipedia.org/wiki/Autoencoder#Denoising_autoencoder), another powerful generative neural network.


### Understanding what's going on

A common trick when working with neural nets in the image domain is to visualize what a neuron in the first hidden layer is "seeing" by treating the weights between that neuron and each input pixel as pixel intensities. 

<img src="http://neuralnetworksanddeeplearning.com/images/net_full_layer_0.png" style="width:400px">
[TODO: Give credit and don't hotlink. You dick.]()

We can do something similar here. The tables below each represent the 'receptive field' of a particular hidden unit. The columns correspond to positions in a 17-character GitHub repo name. A green character represents a strongly positive weight (i.e. this hidden unit "wants" to see that character at the position). Red characters have strongly negative weights. 

These are just a couple examples taken from a model with 350 hidden units (the same model from which the above samples were taken). [This page](/assets/recep.html) has visualizations of all those units.

{% include rbm/149.html %}

This hidden unit wants to see... `vndubnr`? Actually, this word search is hiding several useful words. How many can you spot?

- vagrant (and Vagrant)
- android
- arduino
- angular
- ansible

<!-- It's interesting to note that these are all of a particular type. -->

This kind of multitasking is a common theme. And maybe it shouldn't be surprising. This model only has 350 hidden units, but a good model of repository names needs to remember more words than that (not to mention formatting and the [phonotactic](https://en.wikipedia.org/wiki/Phonotactics) rules for inventing new words).

Of course, this hidden unit alone is perfectly happy to see hybrid prefixes like `vadroid`, or `andulant` or even `aaDmaae`. It needs to work in concert with other hidden units that impose their own regularities, like...

{% include rbm/122.html %}

Whereas the last unit was focused on a few domain-specific words, this unit is pretty generic. It mostly just wants to see a vowel in the fourth position followed immediately by a consonant (note that the chars it *least* wants to see there are `[a, u, o, e, i]`). With this and the previous unit turned on, we're now happy to see 'ang**ul**ar' and 'ans**ib**le', but not 'vag**ra**nt', 'and**ro**id', or 'ard**ui**no'.

Of course, our model has no explicit knowledge of what a "vowel" is, so it's neat to see it picked up naturally as a useful feature.

Another emergent behaviour is the strong spatial locality. Most hidden units have their strong weights tightly clustered on a particular neighbourhood of contiguous character positions. This is neat because, again, we never told our model that certain visible units are "next to" each other - it knows nothing about the input geometry.

<!-- WIP: carousel -->

<div id="hidden-carousel" class="carousel slide" data-ride="carousel" data-interval="false">

<!-- slides -->
<div class="carousel-inner" role="listbox">

<div class="item active">
{% include rbm/5.html %}
<div class="carousel-caption">
    Github URL recognizer
</div>
</div>

<div class="item">
{% include rbm/29.html %}
<div class="carousel-caption">
    Short names (e.g. <code>CS3001</code>, <code>Team11</code>)
</div>
</div>

<div class="item">
{% include rbm/40.html %}
<div class="carousel-caption">
    Word delimeter at position 8
</div>
</div>

<div class="item">
{% include rbm/114.html %}
<div class="carousel-caption">
    Cruise control for cool.
</div>
</div>

<div class="item">
{% include rbm/331.html %}
<div class="carousel-caption">
    Three letter acronym prefixes (e.g. <code>PHP-Server</code>)
</div>
</div
>
</div><!-- /carousel-inner -->

<!-- Controls -->
<a class="left carousel-control" href="#hidden-carousel" role="button" data-slide="prev">
  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
  <span class="sr-only">Previous</span>
</a>
<a class="right carousel-control" href="#hidden-carousel" role="button" data-slide="next">
  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
  <span class="sr-only">Next</span>
</a>

</div>


### Making it better

If I wanted to promote this from a toy project, the first thing I'd do would be to reimplement it using a library with GPU support like TensorFlow or Theano. There are also some technical RBM hacks I never got around to trying which probably would have helped (like a sparsity target on hidden units and fast weights for persistent contrastive divergence learning). A few more interesting improvements that suggest themselves...

#### Going Deeper

RBMs can be (almost trivially) stacked on one another to form a [deep belief network](https://en.wikipedia.org/wiki/Deep_belief_network). It seems plausible that additional layers would be able to learn higher layers of abstraction and generate even better samples.

Remember how we saw above that most units learn patterns local to a particular region of the string? This may explain solecisms like `Lake Lake`, or `Church Swamp`. If, as seems to be the case, our initial layer of hidden units is mostly learning words, phonotactics, and low-level structural patterns (word lengths, spacing), another layer of hidden units on top of those could learn more semantic patterns. e.g. "Lake $foo", "$foo Lake", "$foo Swamp", but never "Lake Lake", "Lake Swamp", etc. I would be sad to see `Days Inn Oil Field` go though. That one was pretty good.

#### Translation Invariance

Under the current architecture, for a model to learn the word "Pond" (a very useful word to learn), it needs to memorize a separate version for each place it can appear: `___ Pond`, `____ Pond`, `_____ Pond`, etc.

We'd like our model to learn robust, position-invariant patterns and understand that "Hays Pond" and "Darby Pond" are quite similar (even though their vector representations are completely disjoint). 

One solution to this problem is to use a recurrent architecture. Another, which is more readily applicable to RBMs, is to use convolutional units. This is just like CNNs for vision tasks, where we have many collections of units - 'filters' - that each see small patches of the image, and share weights. These can detect features both low-level (lines), or high (faces), no matter where they appear in the image.

We can do the same thing with text, except that our filters would be 1-d rather than 2-d. And if we stacked them, we could presumably also get low-level features at the bottom layer (e.g. common character bigrams and trigrams like "th", "ch", "ing") and more complex features at the top.

Again, the promise of this is strongly suggested by the weights we see on the hidden units above. Our hidden units are *already* looking at local regions of the input, and there's clear evidence that the model is having to learn and store the same pattern multiple times for different positions. With convolutional units, we could help the network do what it's already doing much more efficiently (in terms of the size of the model, and the amount of information learned per training instance).[TODO: link to github.io example hidden units]()

### Practical Applications

None whatsoever.

<!--
### Acknowledgements

[The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) by Andrej Karpathy inspired me to play with character-level representations (and was basically the first thing I read that got me excited about deep learning). If you haven't read it already, go do it now! [TODO: compare results to char-rnn?]()

My RBM implementation was built on top of scikit-learn's [BernoulliRBM](http://scikit-learn.org/stable/modules/generated/sklearn.neural_network.BernoulliRBM.html#sklearn.neural_network.BernoulliRBM) class, which is cleanly written and well-commented, and easy to hack on out of the box.

Thanks to Falsifian for reviewing a draft of this post and teaching me about simulated annealing.

-->
