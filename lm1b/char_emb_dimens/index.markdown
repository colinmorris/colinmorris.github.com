---
layout: page
title: "Character Embedding Dimensions"
custom_css: fat
---

Each of the plots below show one of the 16 dimensions of the character embeddings in the `lm_1b` model (see [this post](/blog/1b-words-char-embeddings) for more context).

These are 1-dimensional plots. The x position of a character corresponds to the value of that character's embedding in the given dimension. y position is not meaningful - characters are just jittered along that axis to avoid overlap.

The salmon markers are special meta characters with the following semantics:

- **{{"<S> and </S>" | escape}}** mark the beginning and end of a sentence
- **{{"<W> and </W>" | escape}}** mark the beginning and end of a word
- **{{"<PAD>" | escape}}** is used to right-pad words to the same length (50)

{% for i in (0..15) %}
  <img src="d{{i}}.png">
{% endfor %}
- 
