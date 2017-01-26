---
layout: page
title: "Toys"
quick_css: >
  .post-content h3 {
    margin-top: 28px;
  }
---

### RBMs

I trained some restricted Boltzmann machines on short texts and got them to generate new ones. Here are some web apps that let you sample outputs from models trained on a few different domains:

- [GitHub repo generator](/rbm/repos)
- [Place name generator](/rbm/geo)
- [Actor name generator](/rbm/actors)

The [Hidden Unit Zoo](/rbm/zoo) shows visualizations of the hidden units of an RBM model trained on GitHub repos.

### Visualizing char-CNN filters

[Here are some visualizations of convolutional filters](/lm1b/filters/width3.html) from a neural language model released by Google.

### Sentences through the eyes of a language model

See how a language model (the same one as above) assigns probabilities to each word in a sentence. Explore random sentences from:

- [The Billion Word Benchmark](/lm-sentences/#/billion_words) - a heldout fold of the same corpus the model was trained on
- [Brown Corpus - news](/lm-sentences/#/brown_news) - the same domain as the training corpus, but from 1961.
- [Brown Corpus - romance novels](/lm-sentences/#/brown_romance)

### Tour of Heroes

[Tour of Heroes](/tour-of-heroes/) is an incremental game implemented using Angular2. It's in a rough beta-ish state. I'll get around to finishing it eventually, maybe.
