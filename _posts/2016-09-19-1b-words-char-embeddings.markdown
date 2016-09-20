---
layout: post
title: "Dissecting Google's Billion Word Language Model Part 1: Character Embeddings"
custom_css: "charemb"
---

Earlier this year, some researchers from Google Brain published a paper called [Exploring the Limits of Language Modeling](http://arxiv.org/abs/1602.02410), in which they described a language model that improved perplexity on the [One Billion Word Benchmark](http://arxiv.org/abs/1312.3005) by a staggering margin (down from about 50 to 30). Last week, they [released that model](https://github.com/tensorflow/models/tree/master/lm_1b). 

As someone with an [interest in character-aware language models](http://colinmorris.github.io/blog/dreaming-rbms), I've been looking forward to sniffing around this model.

In this post, I'll go into the very first layer of the model: character embeddings.

## Background - language models

To begin with, let's define what we mean by a **language model**. A language model is just a probability distribution over sequences of words. Given a sentence like "Hello world", or "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo", the model outputs a probability, telling us how likely that sentence is.

Language models are evaluated by their perplexity on heldout data, which is a measure of how likely the model thinks that heldout data is. Lower is better, and perplexity is logarithmic, so 30 is *orders of magnitude* better than 50.

The `lm_1b` language model takes one word of a sentence at a time, and produces a probability distribution over the next word in the sequence. Therefore it can calculate the probability of the sentence "Hello world." as...

    P("<S> Hello world . </S>") = product(P("<S>"),  P("Hello" | "<S>"),
        P("world" | "<S> Hello"), P("." | "<S> Hello world"), 
        P("</S>" | "<S> Hello world ."))

({{'"<S>" and "</S>"' | escape }} are beginning and end of sentence markers. Note also that tokenization splits punctuation.)

## The lm_1b architecture

<figure class="model-arch">
<img src="/lm1b/lm1b_arch_a.png">
<figcaption>Modified diagram from pg. 2 of <a href="http://arxiv.org/pdf/1602.02410v2.pdf">Exploring the Limits of Language Modeling</a></figcaption>
</figure>

The `lm_1b` architecture has three major components, shown in the image to the right:

1. The 'Char CNN' stage (blue) takes the raw characters of the input word and produces a word-embedding.
2. The [LSTM](https://en.wikipedia.org/wiki/Long_short-term_memory) (yellow) takes that word representation, along with its state vector (i.e. its memory of words it's seen so far in the current sentence), and outputs a representation of the word that comes next.
3. A final softmax layer (green) learns a distribution over all the words of the vocabulary, given the output of the LSTM.

## Char CNN?

This is short for character-level convolutional neural network. If you don't know what that means, forget I said anything - because in this post, I'll be focusing on what happens before the network does any convolving. Namely, **character embeddings**.

## Character embeddings?

The most obvious way to represent a character as input to our neural network is to use a [one-hot encoding](https://en.wikipedia.org/wiki/One-hot). For example, if we were just encoding the lowercase Roman alphabet, we could say...

    onehot('a') = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    onehot('c') = [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

And so on. Instead, we're going to learn a "dense" representation of each character.  If you've used word embedding systems like [word2vec](https://en.wikipedia.org/wiki/Word2vec) then this will sound familiar.

The first layer of the Char CNN component of the model is just responsible for translating the raw characters of the input word into these character embeddings, which are passed up to the convolutional filters.

In `lm_1b`, the character alphabet is of size 256 (non-ascii characters are expanded into multiple bytes, each encoded separately), and the space these characters are embedded into is of dimension 16. For example, 'a' is represented by the following vector:

    array([ 1.10141766, -0.67602301,  0.69620615,  1.96468627,  0.84881932,
            0.88931531, -1.02173674,  0.72357982, -0.56537604,  0.09024946,
           -1.30529296, -0.76146501, -0.30620322,  0.54770935, -0.74167275,
            1.02123129], dtype=float32)


That's pretty hard to interpret. Let's use [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding) to shrink our character embeddings down to 2 dimensions, to get a sense of where they fall relative to one another.

<figure>
  <img src="/lm1b/tsne_embeddings.png">
  <figcaption>
  t-SNE embedding of commonly occurring characters. Salmon markers are special meta characters. {{"<S> and </S>" | escape}} mark the beginning and end of a sentence. {{"<W> and </W>" | escape}} mark beginning and end of a word. {{"<PAD>" | escape}} is used to right-pad words to the max length of 50. Yellow markers are punctuation, blue are digits, and light/dark green are uppercase/lowercase alphabetical characters.
  </figcaption>
</figure>

A few interesting regularities jump out here:

- not only are digits clumped closely together, they're basically arranged in order along a snaky number line!
- in many cases, the uppercase and lowercase versions of a letter are very close. However, a few, such as "k/K" are widely separated. This trend holds in the original embedding space as well - 50% of lowercase letters have their uppercase counterpart as their nearest alphabetical neighbor.
- in the upper-right corner, all the ASCII punctuation marks that can end a sentence (`.?!`) are in a tight huddle
- meta characters (in salmon-pink) form a loose cluster. Non-terminal punctuation forms an even looser one (with "%" and ")" as outliers).

There's also a *lack of regularity* that's worth noting here. Other than the (inconsistent) association of uppercase/lowercase pairs, alphabetical characters seem to be arranged randomly. They're well-separated from one another, and are smeared all across the projected space. There's no island of vowels, for example, or liquid consonants. Nor is there a clear overall separation between uppercase and lowercase characters.

It could be that this information is present in the embeddings, but that t-SNE just doesn't have enough degrees of freedom to preserve those distinctions in a 2-d planar projection. Maybe by inspecting each dimension in turn, we can pick up on some more subtleties in the embeddings:

<figure>
  <div class="dimension_example">
  </div>
  <figcaption>Here is a caption.</figcaption>
</figure>

You can check out all 16 dimensions [here](/lm1b/char_emb_dimens/) - I haven't managed to extract much signal from them however.

## Vector math

Perhaps the most famous feature of word embeddings is that you can add and subtract them, and (sometimes) get results that are semantically meaningful. For example:

    vec('woman') + (vec('king') - vec('man')) ~= vec('queen')

It'd certainly be interesting if we could do the same with character vectors. There aren't a lot of obvious analogies to be made here, but what about adding or subtracting 'uppercaseness'?

    def analogy(a, b, c):
      """a is to b, as c is to ___,

      Return the three nearest neighbors of c + (b-a) and their distances.
      """
      # ...

'a' is to 'A' as 'b' is to...

    >>> analogy('a', 'A', 'b')
    b: 4.2
    V: 4.2
    Y: 5.1

Okay, not a good start. Let's try some more:

    >>> analogy('b', 'B', 'c')
    c: 4.2
    C: 5.2
    +: 5.9

    >>> analogy('b', 'B', 'd')
    D: 4.2
    ,: 4.9
    d: 5.0

    >>> analogy('b', 'B', 'e')
    N: 4.7
    ,: 4.7
    e: 5.0

Partial success! In fact, if we're willing to stretch our definition of success, even the first result here is not bad, because the difference in distance between 'c' and 'C' from 'c'+('B'-'b') (5.2 - 4.2 = 1.0) is much less than the distance between 'c' and 'C' (4.3). In other words, this point is much closer to 'C' than we would expect from a random point chosen on a circle with radius 4.2 centered on 'c'.

Repeating this a bunch of times, we at least get the 'right' answer more often than would be expected by chance. 

## Vector math - for real this time

I guess the only thing left to try is...

    >>> analogy('1', '2', '2')
    2: 2.4
    E: 3.6
    3: 3.6

    >>> analogy('3', '4', '8')
    8: 1.8
    7: 2.2
    6: 2.3

    >>> analogy('2', '5', '5')
    5: 2.7
    6: 4.0
    7: 4.0

Okay, note to self: do not use character embeddings as tip calculator.

Given our visualization above, it's actually kind of surprising that this doesn't work better. In fact, if we took the vector between 3 and 4, and added it to 8, we really would land close to '9' in our 2-d space. So what's happening here?

Most likely the model has learned that digits close together on the number line should have nearby character embeddings. That much seems useful for generalizing knowledge about phrases with numbers - '36 years old' is pretty much substitutable for '37 years old', '$800.00' is more like '$900.00' or '$700.00' than '$100.00'.

*But*, that doesn't mean it's learned that these digits vary along a single 'magnitude' dimension. In 2 dimensions, laying them out on a line is just about our only choice. But the real embedding has 16 dimensions - more dimensions than there are digits! So there are probably lots of weird, loopy, hyperspiral shapes these digits could be arranged that would still preserve the appropriate closeness relations between digits.

# What's going on here?

asdf
