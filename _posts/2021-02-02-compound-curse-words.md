---
layout: post
title: "Compound pejoratives on Reddit – from <i>buttface</i> to <i>wankpuffin</i>"
custom_css: "compound_curses"
tags: [linguistics]
draft: true
thumbnail: "/assets/compound_curses/wikt_matrix.png"
excerpt: "What can Reddit comment data tell us about the rules governing the formation of insulting compound words like 'fartface', 'scumwad', or 'assgoblin'?"
---

<!-- TODO
Prose:
- draft text for reddit/twitter posts
- tighten up ending?
    - link to James BP might be a good thing to wrap up with
- test on mobile
- latex?

Matrix:
- how grokkable is the matrix without context? Would it help to label the rows as prefixes? Add a dash after each to indicate that it's a prefix?
    - or maybe just add another subtitle line like "Rows (prefixes) and columns (suffixes) sorted by total frequency"
- generate a captioned version of matrix for twitter/reddit
    - need to decide on title

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

I collected lists of around 70 prefixes and 70 suffixes (collectively, "affixes") that can be flexibly combined to form insulting compounds, based on a scan of Wiktionary's [English derogatory terms](https://en.wiktionary.org/wiki/Category:English_derogatory_terms) category. The terms covered a wide range of domains, including:
- scatology (*fart-*, *poop-*)
- political epithets (*lib-*, *Trump-*)
- food (*-waffle*, *-burger*)
- body parts (*butt-*, *-face*, *-head*, *-brains*)
- gendered epithets (*bitch-*, *-boy*)
- animals (*dog-*, *-monkey*)

Most terms were limited to appearing in one position. For example, while *-face* readily forms pejorative compounds as a suffix, it fails to produce felicitous compounds as a prefix (*facewad*? *faceclown*? *facefart*?).

Taking the product of these lists gives around 4,800 possible A+B combinations. Most are of a pejorative character, though some false positives slipped in (e.g. *dogpile*, *spitballs*). I scraped all Reddit comments from 2006 to the end of 2020, and counted the number of comments containing each.

As a corpus, Reddit has the virtue of being uninhibited in its profanity, and on the cutting edge of new coinages. For example, Google Books Ngram Viewer, which indexes the majority of all books published in English up to 2019, [gives no results](https://books.google.com/ngrams/graph?content=fuckwaffle) for *fuckwaffle*, whereas the term has been used in 1,096 Reddit comments.

The full "matrix" of combinations is surprisingly dense. Of the ~4,800 possible compounds, more than half occurred in at least one comment. The most frequent compound, *dumbass*, appears in 3.6 million comments, but there's also a long tail of many rare terms, including 444 [*hapax legomena*](https://en.wikipedia.org/wiki/Hapax_legomenon) (terms which appear only once in the dataset), such as *pukebird*, *fartrag*, *sleazenozzle*, and *bastardbucket*.

In fact, the dataset approximately follows [Zipf's law](https://en.wikipedia.org/wiki/Zipf%27s_law), meaning that a log-log plot of term rank vs. frequency is close to a straight line:

![png](/assets/compound_curses/zipf.png)

## The Matrix of Pejoration

The full 66 x 73 matrix of all prefixes and suffixes is too big to fit readably in a single plot, so I've shown a 20 x 20 subset below, which includes many of the most productive affixes. Note that frequency is mapped to colour using a logarithmic scale, because it varies over several orders of magnitude.

![png](/assets/compound_curses/plain_matrix.png)

The rows and columns are sorted by total frequency. Of the 400 cells here, only 13 have a count of zero (examples: *dumbgoblin*, *dirthat*, *libsucker*).

## Flexible and inflexible affixes

One of the first things that sticks out from the above visualization is that some affixes are much more flexible (or, to use a term of art from linguistics, ["productive"](https://en.wikipedia.org/wiki/Productivity_(linguistics))) than others. Some rows have most of their weight concentrated on a single cell -- for example, *dirt-* strongly combines with *-bag*, but not much else. Others, like *fuck-* and *dick-*, have significant co-occurrences with almost all suffixes.

I experimented with a few metrics for quantifying this notion of an affix's "flexibility" (including measures of statistical diversity like [Shannon entropy](https://en.wikipedia.org/wiki/Shannon_entropy)). The one that I found best matched my intution was simply the sum of the logarithms of the counts. You can think of this as the total amount of "redness" of an affix's row or column in the above matrix visualization.


To take a toy example:

|           | fart | head | stick | breath |
|:----------|:-----|:-----|:------|:-------|
| **butt**  |  100 | 100,000 | 10 |  1,000 |
| **dip**   |  1   |  10  | 1,000,000 | 1  |

Here the total frequency of the prefix *dip* is far greater than that of *butt*, but its "log sum" is log(1) + log(10) + log(1,000,000) + log(1) = 0 + 1 + 6 + 0 = 7, which is less than *butt*'s, which is 2 + 5 + 1 + 3 = 11. The contribution to this score from any single high frequency compound is subject to greatly diminishing returns, so it pays to diversify.

The scatter plot below shows total frequency vs. this log sum metric for most of the prefixes in the dataset (including many not included in the matrix above):

![png](/assets/compound_curses/prefix_collisions.png)

*shit-* and *fuck-* are clear standouts. But we should also give credit to prefixes like *turd-* and *poop-* which are punching far above their weight, outgunning prefixes which are orders of magnitude above them in total frequency, like *dumb-*, *scum-*, and *dip-*.

Here's the same thing for suffixes:

![png](/assets/compound_curses/suffix_collisions.png)

The dynamic duo of *shit* and *fuck* also put up a strong showing in their capacity as suffixes, though *-face* clearly takes the cake as the most prolifically diverse suffix.

## Are the dictionaries keeping up?

Below is our matrix of profanity again, but this time I've added a glyph to mark which compounds have a definition on English Wiktionary at the time of writing. (If you're not familiar, Wiktionary is a wiki dictionary, a sister project to Wikipedia. Despite getting a lot less attention than Wikipedia, and having orders of magnitude fewer active editors, I find the breadth of its coverage and quality of its definitions to be very high.)

![png](/assets/compound_curses/wikt_matrix.png)

The presence of a Wiktionary entry tracks pretty well with a term's popularity, with every term appearing in over 10,000 comments having an entry. But turning to the full list of compounds, a few apparent oversights emerge.

### Missing gems

Below are some of the most frequent compounds *not* in Wiktionary, sorted by count:

{% include compound_curses/missing_terms_table.md %}

There are a couple odd entries here. *femnazi* is likely just a misspelling of *[feminazi](https://en.wiktionary.org/wiki/feminazi)*. *dumbbitch* is on the list because it was actually a keyword on the [/r/fffffffuuuuuuuuuuuu/](https://www.reddit.com/r/fffffffuuuuuuuuuuuu/) subreddit more than a decade ago, used to generate the [Yao Ming reaction face](https://knowyourmeme.com/memes/yao-ming-face-bitch-please#fn14) in comments, a stock rage comic element. (The foregoing sentence will probably be meaningless to you unless you were part of the mostly male, millennial userbase of primeval Reddit. Don't worry -- you didn't miss much.)

But the others seem like genuine oversights -- words which ought to be included in a "complete" lexicon of the English language, and which are in sufficiently widespread use to satisfy Wiktionary's [criteria for inclusion](https://en.wiktionary.org/wiki/Wiktionary:Criteria_for_inclusion).

Interestingly, Wiktionary did once have an entry for *assbag*, but it was [deleted by an admin in 2009](https://en.wiktionary.org/w/index.php?title=Special:Log&logid=2917072) with the reason "Fatuous entry". (But we can't judge this too harshly without knowing what the entry looked like at the time. It might have just been some silly vandalism like "*(colloquial)* My math teacher, Mr. Lowell".)

It's worth noting that Green's Dictionary of Slang, another excellent free online dictionary, does have entries for *[dicknose](https://greensdictofslang.com/entry/7xn3mmi#3tbcbxi)*  and *[ass-bag](https://greensdictofslang.com/entry/ywlso5i#7wqdpoy)*, defining both as general terms of abuse. It also defines *[shitrag](https://greensdictofslang.com/entry/2jwxjqa#4xls6aq)* as "a third-rate publication" (it also seems to be commonly used as a general term of abuse, on Reddit and elsewhere). But on the whole, Wiktionary's coverage seems to be stronger -- Green's is missing a number of high-frequency compounds which Wiktionary does include, such as *twatwaffle*, *libtard*, or *fucknugget*. Green's is even missing *shitlord*, which is one of the top 10 compounds in the dataset!

### Words Wiktionary maybe *shouldn't* have

On the other hand, there are a few words in Wiktionary which are vanishingly rare on Reddit, including 8 which appear less than 10 times each:

{% include compound_curses/rare_wikt_terms_table.md %}

Of course, just because they're rare on Reddit doesn't mean they weren't in common use at some time and place. (Though I'm skeptical of some of these. For example, a Google Books search for *homowhore* finds only two results, one of which is a [scanno](https://en.wiktionary.org/wiki/scanno) for *somewhere*.)

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

The repetition of consonants in compounds like *bummonkey* or *assslut* is orthographically and phonetically awkward, so it makes sense that these compounds would be avoided. (Alternative spellings like *asslut*, or *bum-monkey* are somewhat more common, but still rare.)

But other lacunae are harder to account for. *Butthead* is common, so why are *asshead* and *bumhead* so rare? Why does *buttclown* fail where *assclown* succeeds?

For that matter, why are some affixes so much more productive than other terms from the same semantic category? *-face*, *-head*, and *-brain* are extremely productive suffixes. Why not other body parts? Why do *poopheart*, *scumeyes*, *dickhand*, or *monkeyhair* just sound ridiculous rather than wounding? Perhaps head, face, and brains are uniquely suited to metonymically referring to a person as a whole.

The full dataset of Reddit pejorative compounds is [available here on GitHub](https://github.com/colinmorris/pejorative-compounds). The repo also includes:
- a very long README documenting some of the technical details of the data collection process, including notes on false positives (some of which we can automatically filter out, and some we can't)
- the scripts used to create the dataset
- the code used to generate the visualizations in this post

Special thanks to my cousin Kate who opened my eyes to the joy of taboo compound formation many years ago with her Shakespearean coinage, "fuckmitten". Still not entirely sure what it means, but I think about it a lot.
