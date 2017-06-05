---
layout: post
title: "Searching for the worst flamingo drawings of all time"
tags: [machine-learning]
custom_css: quickdraw
---

Have you played [Quick, Draw!](https://quickdraw.withgoogle.com/) yet? It's basically Pictionary, played against an A.I., and it's a lot of fun. Not long ago, Google released a [dataset](https://github.com/googlecreativelab/quickdraw-dataset) of some of the millions of sketches people have drawn so far over 345 categories (I'll be sticking to the 'flamingo' category in this post).

Some of them are quite lovely.

<figure>
<img src="/assets/quickdraw/svgs/nice_flamingos.svg" >
</figure>


... and some are less inspiring

<figure>
<img src="/assets/quickdraw/svgs/nonnice_flamingo.svg" >
<figcaption>
It's, um, a viking ship with a chicken carved into the prow?
</figcaption>
</figure>

What if we want to automatically identify the crummiest flamingos in the dataset?

## Sketch-RNN

Along with the datasets, Google has released some [pre-trained models](https://github.com/tensorflow/magenta/tree/master/magenta/models/sketch_rnn#pre-trained-models) that use the Sketch-RNN architecture described in [this paper](https://arxiv.org/abs/1704.03477).

The idea behind these models is to learn to generate new sketches. For example:

<figure>
<img src="/assets/quickdraw/svgs/generated_flamingos.svg">
</figure>

But we can also repurpose them to get some insight into existing human-generated sketches. As I talked about in an earlier post on [character-level RBMs](http://colinmorris.github.io/blog/dreaming-rbms), learning to generate new examples of X is basically the same as learning the probability distribution of X.

Sketch-RNN treats each sketch as a sequence of strokes, rather than a grid of pixels. At each timestep, the RNN receives the hidden state from the previous step and the previous stroke, and, based on those inputs, outputs the parameters of a probability distribution for the next stroke. To dream a new flamingo sketch, we just sample from that distribution to get the next stroke, feed that stroke to the next RNN cell, and continue until we have a complete drawing.

But we can also feed a complete human-generated flamingo sketch to an RNN trained on flamingos, and, at each step, see how well the actual next stroke fits with what the model expects the next stroke to be. In this way, we can get some overall idea of how probable the model thinks the whole sketch is. Intuitively, it makes sense that the sketches that the model assigns the lowest probabilities should be among the 'worst'.

<small>The real picture is a little messier than this. Check out the appendix at the end of this post for some of the gorey details.</small>

## Good flamingos

Before we roast Quickdraw's least gifted flamingo-drawers, let's look at some of the 'best' flamingo sketches - i.e. those assigned the highest probabilities:

<figure>
    <img src="/assets/quickdraw/svgs/flamingo_best.svg">
</figure>

Audubon they ain't, but these are at least recognizable as flamingos. Because we're ranking by probability, we should in some sense expect the most 'typical' sketches here, rather than the most beautiful.

# Bad flamingos

As Tolstoy once said, happy flamingos are all alike, but every garbage flamingo is garbage in its own way.

We can broadly classify our worst birds into a few groups

## Well-intentioned but frankly awful

God bless these artists, they really tried.

<div class="gallery row">
    {% for i in (0..12) %}
        <div class="cell col-xs-4 col-md-3">
            <img src="/assets/quickdraw/svgs/bottom/awful/{{ i }}.svg">
        </div>
    {% endfor %}
</div>

You can check out some more examples [here](/assets/quickdraw/svgs/botflamingos_awful.svg).

## Scribbles

<div class="gallery row">
    {% for i in (0..12) %}
        <div class="cell col-xs-4 col-md-3">
            <img src="/assets/quickdraw/svgs/bottom/scribbles/{{ i }}.svg">
        </div>
    {% endfor %}
</div>

In most cases, the artist started out with something flamingo-like, then scratched it out in frustration. Here's one example animated:

<div class="scribble-demo">
    {% include quickdraw/scribble.html %}
</div>

## Cheating attempts

<div class="gallery row">
    {% for i in (0..12) %}
        <div class="cell col-xs-4 col-md-3">
            <img src="/assets/quickdraw/svgs/bottom/cheat/{{ i }}.svg">
        </div>
    {% endfor %}
</div>

## Have you ever seen a flamingo before?

<div class="gallery row">
    {% for i in (0..12) %}
        <div class="cell col-xs-4 col-md-3">
            <img src="/assets/quickdraw/svgs/bottom/wtf/{{ i }}.svg">
        </div>
    {% endfor %}
</div>

## Graffiti

<figure>
    <img src="/assets/quickdraw/svgs/graffiti_censored.svg">
</figure>

Some scoundrels just treated Quickdraw like a bathroom wall. The scandalous uncensored version is [here](/assets/quickdraw/svgs/graffiti_uncensored.svg) (NSFW).

## The unjustly maligned

<div class="gallery row">
    {% for i in (0..2) %}
        <div class="cell col-xs-4 col-md-3">
            <img src="/assets/quickdraw/svgs/bottom/notbad/{{ i }}.svg">
        </div>
    {% endfor %}
</div>

Most of what we found was garbage, but the three above are actually kind of gorgeous? Add some colour to #3 and it could be a New Yorker cover! What gives?

These are great drawings, and instantly recognizable as flamingos, but that doesn't count for much. We're not ranking by how clearly these images represent their subject (i.e. `P(category=flamingo | drawing)`), but rather how likely someone is to come up with this when asked to draw a flamingo (`P(drawing | category=flamingo)`).

Very few people would think to draw the legs and head, with the body out of frame, as #3 does. #s 1 and 2 use many short, disconnected lines, which is unusual.

<figure>
<div class="row audubon-comparison">
    <div class="col-xs-6">
        <img class="lookalike" src="/assets/quickdraw/svgs/bottom/notbad/5.svg">
    </div>
    <div class="col-xs-6">
        <img class="audubon" src="/assets/quickdraw/Audubon-Flamingo.jpg">
    </div>
</div>
<figcaption>Left: Anonymous Quickdraw artist. Right: The American flamingo, illustrated by by <a href="https://en.wikipedia.org/wiki/John_James_Audubon">John Audubon</a>.</figcaption>
</figure>

The drawing above is another good example. Flamingos totally bend their heads down low like that, but when asked to draw a flamingo, almost no-one thinks to pose it with its head below the horizon.


# Is this useful?

It totally could be! 

Google described their dataset as being 'individually moderated', and you can scroll through the examples [here](https://quickdraw.withgoogle.com/data/flamingo) for a long time before hitting any graffiti (and if you do, find any, you can even click it to 'flag as inappropriate'), so it's clear they've already done a pretty good job of filtering out most of the irrelevant/malicious sketches that surely ended up in the raw data.

But this approach (which is quite 'cheap', since it uses an existing model trained for a different purpose) was able to easily identify a subset of sketches containing a high density of overlooked graffiti, scribbles, and irrelevant sketches. If we wanted to go further, this would be a good place to start to get some labelled examples to bootstrap a graffiti classifier. Also, if we had a conditonal model, a neat thing to try would be looking at sketches that map to latent vectors that are close to the encoding of a graffito sketch.

# Appendix: Probability densities



