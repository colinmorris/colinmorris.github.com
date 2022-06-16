---
layout: post
title: "Compound pejoratives on Reddit – from <i>buttface</i> to <i>wankpuffin</i>"
custom_css: "compound_curses"
tags: [linguistics]
draft: true
thumbnail: "/assets/compound_curses/wikt_matrix.png"
excerpt: "What can Reddit comment data tell us about the rules governing the formation of insulting compound words like 'fartface', 'scumwad', or 'assgoblin'?"
---

<!-- Notes from 06/10 rereading:
Prose:
- Flexibility vignette doesn't have that much payoff. Can maybe cut, or shrink? (Esp. because these plots have the most offensive terms in the whole post - faggot/fag, cunt)
    - maybe think about a frequency threshold to exclude fag/faggot? Don't want it to become a distraction.
    - also, should scatterplots have titles or smth to make it clearer which is which?
- I wonder if Pudding might be interested? There are some places where scrollytelling and interactivity would really shine.
- hmmm, maybe drop/replace "stick" suffix from matrix? It mostly appears in confounders "dipstick" and "fuckstick". Actually, nvm, looks like both are mostly used pejoratively by a strong margin.
- draft text for reddit/twitter posts
- tighten up ending?

Technical:
- add thumbnail, excerpt
- generate a captioned version of matrix for twitter/reddit

-->

Dirty words are, let's face it, a lot of fun. If you want to express your dislike for someone and a standard insult like "jerk" or "moron" won't cut it, you can get creative. There are a few reliable recipes for forming derogatory noun-noun compounds in English. For example:

- Start with a word for a disgusting or worthless substance
- Add a word for an agglomeration or container

Hence, *dirtwad*, *scumbag*, *pissbucket*, *snotwagon*...

<small>(In case it's not yet clear, this post will contain a *lot* of bad words. Most are merely silly or crude, but some are more seriously offensive, including slurs.)</small>

Alternatively, *-head*, *-face*, and *-brain(s)* are incredibly versatile suffixes, which can be preceded by just about any taboo word. 

The truly creative can go outside the box with oddball constructions like *fucktrumpet*, or [*wankpuffin*](https://en.wiktionary.org/wiki/wankpuffin), which perhaps succeed more by their euphony than their ability to invoke any coherent image.

If only we had some concrete data on how these pieces fit together...

## Introducing the Reddit compound pejorative dataset

I curated lists of around 70 prefixes and 70 suffixes (collectively, "affixes") that can be flexibly combined to form insulting compounds, based on a scan of Wiktionary's [English derogatory terms](https://en.wiktionary.org/wiki/Category:English_derogatory_terms) category. The terms covered a wide range of domains, including:
- scatology (*fart-*, *poop-*)
- political epithets (*lib-*, *Trump-*)
- food (*-waffle*, *-burger*)
- body parts (*butt-*, *-face*, *-head*, *-brains*)
- gendered epithets (*bitch-*, *-boy*)
- animals (*dog-*, *-monkey*)

Most terms were limited to appearing in one position. For example, while *-face* readily forms pejorative compounds as a suffix, it fails to produce felicitous compounds as a prefix (*facewad*? *faceclown*? *facefart*?).

Taking the product of these lists gives around 4,800 possible A+B combinations. I scraped all Reddit comments from 2006 to the end of 2020, and counted the number of comments containing each.

As a corpus, Reddit has the virtue of being uninhibited in its profanity, and on the cutting edge of new coinages. For example, Google Books Ngram Viewer, which indexes the majority of all books published in English up to 2019, [gives no results](https://books.google.com/ngrams/graph?content=fuckwaffle) for *fuckwaffle*, whereas the term has been used in 1,096 Reddit comments.

The full "matrix" of combinations is surprisingly dense. Of the ~4,800 possible compounds, more than half occurred in at least one comment. The most frequent compound, *dumbass*, appears in 3.6 million comments, but there's also a long tail of many rare terms, including 444 [*hapax legomena*](https://en.wikipedia.org/wiki/Hapax_legomenon) (terms which appear only once in the dataset), such as *pukebird*, *fartrag*, *sleazenozzle*, and *bastardbucket*.

In fact, the dataset approximately follows [Zipf's law](https://en.wikipedia.org/wiki/Zipf%27s_law), meaning that a log-log plot of term rank vs. frequency is close to a straight line:

![png](/assets/compound_curses/zipf.png)

## The Matrix of Pejoration

The full 66 x 73 matrix of all prefixes and suffixes is too big to fit readably in a single plot, so I've reproduced a 20 x 20 subset below, which includes many of the most productive affixes. Note that frequency is mapped to colour using a logarithmic scale, because it varies over several orders of magnitude.

![png](/assets/compound_curses/plain_matrix.png)

The rows and columns are sorted by total frequency. Of the 400 cells here, only 18 have a count of zero (examples: *dumbgoblin*, *dirthat*, *libsucker*).

## Flexible and inflexible components

One of the first things that sticks out from the above visualization is that some affixes are much more flexible (or, to use a term of art from linguistics, ["productive"](https://en.wikipedia.org/wiki/Productivity_(linguistics))) than others. Some rows have most of their weight concentrated on a single cell -- for example, *scum-* mixes with *-bag* far more readily than any other suffix, and the *-wit* column is mostly dominated by *fuckwit*. But others have their weight more evenly spread out. Prefixes like *fuck-*, *shit-* and *dick-* are extraordinarily flexible, and have non-trivial co-occurrences with all 20 suffixes on display. Suffixes like *-bag*, *-face* and *-head* also seem to be extremely productive.

We can operationalize this concept of an affix's "flexibility" using the [collision probability](https://en.wikipedia.org/wiki/R%C3%A9nyi_entropy#Collision_entropy) metric (also known as "collision entropy", or "Rényi entropy"), which is simply the answer to the question: if I randomly pick two terms using this affix, what are the chances they will be the same? The higher the collision probability, the less flexible the affix.

For example, *asshat* comprises 98.7% of the occurrences of the suffix *-hat* in our dataset, so the collision probability for *-hat* is at least .987<sup>2</sup> = 97.4% (the probability that when we pick two *-hat* words, we get two *asshat*s).

On the other hand, the much more flexible suffix *-fuck* has a much lower collision probability of 25.5% (with an 18.4% chance of colliding on *dumbfuck*, 4.8% on *bumfuck*, 1.3% on *buttfuck*, and smaller contributions from a variety of others).

The scatterplot below shows frequency vs. flexibility for all 66 prefixes.

![png](/assets/compound_curses/prefix_collisions.png)

Here's the same thing for suffixes. The most flexible affixes tend to be ones with relatively low total frequency (e.g. *monkey-*, *fart-*, *-boat*, *-brains*). Among high-frequency affixes, *fuck* is the top-ranking prefix *and* suffix.

![png](/assets/compound_curses/suffix_collisions.png)

## Are the dictionaries keeping up?

Below is our matrix of profanity again, but this time I've added a glyph to mark which compounds have a definition on English Wiktionary at the time of writing. (If you're not familiar, Wiktionary is a wiki dictionary, a sister project to Wikipedia. Despite getting a lot less attention than Wikipedia, and having orders of magnitude fewer active editors, I find the breadth of its coverage and quality of its definitions to be very high.)

![png](/assets/compound_curses/wikt_matrix.png)

The presence of a Wiktionary entry tracks pretty well with a term's popularity, with every term appearing in over 10,000 comments having an entry. But turning to the full list of compounds, a few apparent oversights emerge.

### Missing gems

Below are some more frequent compounds not in Wiktionary, sorted by count:

{% include compound_curses/missing_terms_table.md %}

The term *gaybro* originates with [a Reddit community](https://www.reddit.com/r/gaybros/), so its frequency on Reddit is probably not representative of its wider usage. But it is [attested](https://www.theatlantic.com/entertainment/archive/2013/08/the-tv-show-thats-maybe-too-gay-for-australia-but-perfect-for-america/278255/) in [plenty](https://slate.com/news-and-politics/2015/05/can-you-be-homosexual-without-being-gay-the-future-of-cruising-drag-and-camp-in-a-post-closet-world.html) of [other](https://www.vice.com/en/article/ev55y4/when-toxic-masculinity-infects-our-queer-spaces-we-all-lose) places (in contexts that don't even refer to Reddit), and so definitely meets Wiktionary's [criteria for inclusion](https://en.wiktionary.org/wiki/Wiktionary:Criteria_for_inclusion) in the dictionary.

*dumbbitch* and *femnazi* strike me as a bit odd. It's possible they're largely just typos for *dumb bitch* and *[feminazi](https://en.wiktionary.org/wiki/feminazi)*, respectively, but it's hard to determine from context.

The rest look like fairly straightforward oversights. Interestingly, Wiktionary did once have an entry for *[assbag](https://en.wiktionary.org/wiki/assbag)*, but it was deleted by an admin in 2009 with the reason "[Fatuous](https://en.wiktionary.org/wiki/fatuous) entry". (But we can't judge this too harshly without knowing what the entry looked like at the time. It might have just been some silly vandalism like "*(colloquial)* My math teacher, Mr. Lowell".)

It's worth noting that Green's Dictionary of Slang, another excellent free online dictionary, has entries for *[dicknose](https://greensdictofslang.com/entry/7xn3mmi#3tbcbxi)*  and *[ass-bag](https://greensdictofslang.com/entry/ywlso5i#7wqdpoy)*, defining both as general terms of abuse.

### Words Wiktionary maybe *shouldn't* have

On the other hand, there are a few words in Wiktionary which are vanishingly rare on Reddit, including 8 which appear less than 10 times each:

{% include compound_curses/rare_wikt_terms_table.md %}

Of course, just because they're rare on Reddit doesn't mean they weren't in common use at some time and place. (Though I'm skeptical of *homowhore*. A google books search finds only two results, one of which is a [scanno](https://en.wiktionary.org/wiki/scanno) for *somewhere*.)

## The politics of pejoration

I included a few prefixes which are primarily used to insult based on political orientation (presented here with a few of the suffixes with which they collectively appear most frequently):

<small>If these epithets feel a little dated, keep in mind the dataset only extends up to 2020.</small>

![png](/assets/compound_curses/politics_matrix.png)

The prefixes used against the left (*lib-* and *soy-*) have about 430,000 occurences between them, significantly exceeding *right-* and *trump-*, with 15,000 and 69,000, respectively. However, it's unclear to what degree this reflects the size of these political demographics on Reddit vs. their respective propensities to use vulgar language.

While *trump-* is only third in frequency among these prefixes, it is by far the most flexible. Its most common companion (*-tard*) accounts for only 45% of all its occurrences, whereas the other three prefixes have more than 90% of their occurrences tied up in one compound. Of the 73 suffixes considered, there were only 9 *trump-* compounds that never appeared on Reddit, namely: *trumpnozzle*, *trumpmitten*, *trumplib*, *trumpbandit*, *trumppirate*, *trumppuffin*, *trumpgoblin*, *trumpsplash*, and *trumpbreath*.

## Where are all the assheads?

The question of *why* certain terms combine more felicitously than others is fascinating to me. It's more than just a matter of semantics. Consider a family of synonyms like *ass*, *butt* and *bum*:

![png](/assets/compound_curses/butt_matrix.png)

(For ease of comparison, I linearly scaled each row so they summed to the same amount. Thus the colour of a cell reflects the prefix's affinity for that suffix relative to all the suffixes shown here.)

Our synonyms seem to disagree more often than they agree.

The repetition of consonants in compounds like *bummonkey* or *assslut* (a phenomenon technically known as [gemination](https://en.wikipedia.org/wiki/Gemination#English)) is orthographically and phonetically awkward, and so it makes sense that these compounds would be avoided. (Alternative spellings like *asslut*, or *bum-monkey* are somewhat more common, but still rare.)

But other lacunae are harder to account for. *Butthead* is common, so why are *asshead* and *bumhead* so rare? Why does *buttclown* fail where *assclown* succeeds?

For that matter, why are some affixes so much more productive than other terms from the same semantic category? *-face*, *-head*, and *-brain* are extremely productive suffixes. Why not other body parts? Why do *poopheart*, *scumeyes*, *dickhand*, or *monkeyhair* just sound ridiculous rather than wounding? Perhaps head, face, and brains are uniquely suited to metonymically referring to a person as a whole.

The full dataset of Reddit pejorative compounds is [available here on GitHub](https://github.com/colinmorris/pejorative-compounds). The repo also includes:
- a very long README documenting some of the technical details of the data collection process, including notes on false positives (some of which we can automatically filter out, and some we can't)
- the scripts used to create the dataset
- the code used to generate the visualizations in this post

Special thanks to my cousin Kate who opened my eyes to the joy of taboo compound formation many years ago with her Shakespearean coinage, "fuckmitten". Still not entirely sure what it means, but I think about it a lot.
