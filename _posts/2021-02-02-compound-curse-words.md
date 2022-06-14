---
layout: post
title: "title tk"
headtitle: "title tk"
custom_css: "compound_curses"
tags: [linguistics]
---

<!-- Notes from 06/10 rereading:
Prose:
- Intro may be a bit slow. Might lose people at "metonymically", or "euphony"
    - some of this theorizing could be moved toward the end. Similar point to whence assheads.
- Be consistent for formatting of words-as-words. (italics)
- fill in final sections (not sure if appendix is needed - not sure what I was originally planning to put there. probably stuff about how affixes were chosen, filtering, caveats about confounders e.g. stinkweed)
- explain gemination inline rather than just linking it.
- Flexibility vignette doesn't have that much payoff. Can maybe cut, or shrink? (Esp. because these plots have the most offensive terms in the whole post - faggot/fag, cunt)
- add comment after matrix commenting on (surprising?) density. Very few zeros.  
- move flexibility stuff to just after matrix?
- collision probability aka collision entropy: https://en.wikipedia.org/wiki/R%C3%A9nyi_entropy#Collision_entropy (aka Renyi entropy)
- content warning, esp. if flexibility scatterplots are kept as is
- link to code/repo at end

Technical:
- bitchass, lameass since added to wikt
- create repo. Add readme.

-->

Dirty words are, let's face it, a lot of fun. If you want to express your dislike for someone and a standard insult like "jerk" or "moron" won't cut it, you can get creative. There are a few reliable recipes for forming derogatory noun-noun compounds in English. For example:

- Start with a word for a disgusting or worthless substance
- Add a word for an agglomeration or container

Hence, *dirtwad*, *scumbag*, *pissbucket*, *snotwagon*...

<small>(In case it's not yet clear, this post will contain a *lot* of naughty words. Most are merely silly, crude, or scatalogical, but some visualizations will contain a few more seriously offensive terms, including slurs.)</small>

Alternatively, *-head*, *-face*, and *-brain(s)* are incredibly versatile suffixes, which can be preceded by just about any taboo word. (It's curious that this doesn't work for other body parts. Why do *poopheart*, *scumeyes*, *dickhand*, or *farthair* just sound ridiculous rather than wounding? Perhaps head, face, and brains are uniquely suited to metonymically referring to a person as a whole.)

The truly creative can go outside the boundaries of such recipes altogether to produce innovative terms like *fucktrumpet*, or [*wankpuffin*](https://en.wiktionary.org/wiki/wankpuffin), which perhaps succeed by virtue of euphony moreso than their ability to invoke any coherent image.

## Introducing the Reddit compound pejorative dataset

I manually curated lists of around 70 prefixes and suffixes that I judged to be productive, based on a scan of Wiktionary's [English derogatory terms](https://en.wiktionary.org/wiki/Category:English_derogatory_terms) category. The terms covered a wide range of domains, including:
- scatology (*fart-*, *poop-*)
- political epithets (*lib-*, *Trump-*)
- food (*-waffle*, *-burger*)
- body parts (*butt-*, *-face*, *-head*, *-brains*)
- gendered epithets (*bitch-*, *-boy*)
- animals (*dog-*, *-monkey*)

Most terms were limited to appearing in one position. For example, while *-face* readily forms pejorative compounds as a suffix, it fails to produce extant compounds as a prefix (*facewad*? *faceclown*? *facefart*?). But a few terms, like *fuck*, *weasel*, and *ass*, made their way onto both lists.

Taking the product of these lists gives around 4,800 possible A+B combinations. I scraped all Reddit comments from 2006 to the end of 2020, and counted the number of comments containing each of these compounds. (See the appendix at the end of this post for some more technical details on the data collection process.)

As a corpus, Reddit has the virtue of being uninhibited in its profanity, and on the cutting edge of new coinages. For example, Google Books Ngram Viewer, which indexes the majority of all books published in English up to 2019, [gives no results](https://books.google.com/ngrams/graph?content=fuckwaffle) for *fuckwaffle*, whereas the term has been used in 1,096 Reddit comments.

The resulting matrix was fairly dense. More than half of the 4,800 combinations occurred at least once, including a substantial long tail of rare terms. Some examples with single digit counts include: *fartbucket*, *dorkdog*, and *poonuts*.

I've reproduced a portion of the matrix below as a heatmap. For the sake of legibility, this includes only around a quarter of all compounds measured. You can find the full dataset [here](TODO).

![png](/assets/compound_curses/plain_matrix.png)

The rows and columns are sorted by total frequency.

I mapped frequency to color using a logarithmic scale because the data had a heavy-tailed distribution. In fact, it approximately follows [Zipf's law](https://en.wikipedia.org/wiki/Zipf%27s_law), meaning that a log-log plot of term rank vs. frequency is close to a straight line:

![png](/assets/compound_curses/zipf.png)

In this post I'll talk about a few fun findings in the data.

## xxx

One of the first things that sticks out from the above visualization is that some affixes are much more flexible than others. Some rows have most of their weight concentrated on a single cell -- for example, *scum-* mixes with *-bag* far more readily than any other suffix, and the *-wit* column is mostly dominated by *fuckwit*. But others have their weight more evenly spread out. Prefixes like *fuck-*, *shit-* and *dick-* are extraordinarily flexible, and have non-trivial co-occurrences with all 20 suffixes on display. Suffixes like *-bag*, *-face* and *-head* also seem to be extremely productive.

We can operationalize this concept of an affix's "flexibility" using collision probability, which is simply the answer to the question: if I randomly pick two terms using this affix, what are the chances they will be the same? The higher the collision probability, the less flexible the affix.

For example, the suffix *-hat* has a very high collision probability of 97.5%. *asshat* comprises 98.7% of the words that use that suffix, hence its collision probability is .987^2 plus change. On the other hand, *-fuck* has a probability of just 25.5%. 

The scatterplots below show frequency vs. flexibility for all ~140 prefixes and suffixes. The most flexible affixes tend to be ones with relatively low total frequency (e.g. *monkey-*, *fart-*, *-boat*, *-brains*). Among high-frequency affixes, *fuck* is the top-ranking prefix *and* suffix.

![png](/assets/compound_curses/prefix_collisions.png)
![png](/assets/compound_curses/suffix_collisions.png)

## Are the dictionaries keeping apace?

Below is our matrix of profanity again, but this time I've added a glyph to mark which compounds have a definition on English Wiktionary at the time of writing. (If you're not familiar, Wiktionary is a wiki dictionary, a sister project to Wikipedia. Despite getting a lot less attention than Wikipedia, and having orders of magnitude fewer active editors, I find the breadth of its coverage and quality of its definitions to be very high.)

![png](/assets/compound_curses/wikt_matrix.png)

The presence of a Wiktionary entry tracks pretty well with a term's popularity, with every term appearing in over 10,000 comments having an entry. But turning to the full list of compounds, a few apparent oversights emerge.

### Missing gems

The most frequent term without a Wiktionary entry is *bitchass*, which appears in 36,000(!) comments. It turns out Wiktionary does have an entry for the hyphenated form, *[bitch-ass](https://en.wiktionary.org/wiki/bitch-ass)*, though it currently fails to reflect the term's breadth of meaning. The following example Reddit comments illustrate at least four distinct senses, of which Wiktionary records only the first two:

Pejorative noun *bitchass*:
> This **bitchass** never been to a crawfish boil

Pejorative adjective *bitchass*:
> Your little poll is so **bitchass**, I just can't even bring myself to vote.

[Metonymic](https://en.wiktionary.org/wiki/Appendix:Glossary#metonymic) *bitchass*:
> Shut your **bitchass** up.

Approving adjective *bitchass* (compare *[bitching](https://en.wiktionary.org/wiki/bitching#English)*):
> Now if it was a book of agriculture then it'd be one **bitchass** movie.

Below are some more frequent compounds not in Wiktionary, sorted by count:

{% include compound_curses/missing_terms_table.md %}

The term *gaybro* originates with [a Reddit community](https://www.reddit.com/r/gaybros/), so its frequency on Reddit is probably not representative of its wider usage. But it is [attested](https://www.theatlantic.com/entertainment/archive/2013/08/the-tv-show-thats-maybe-too-gay-for-australia-but-perfect-for-america/278255/) in [plenty](https://slate.com/news-and-politics/2015/05/can-you-be-homosexual-without-being-gay-the-future-of-cruising-drag-and-camp-in-a-post-closet-world.html) of [other](https://www.vice.com/en/article/ev55y4/when-toxic-masculinity-infects-our-queer-spaces-we-all-lose) places (in contexts that don't even refer to Reddit), and so definitely meets Wiktionary's [criteria for inclusion](https://en.wiktionary.org/wiki/Wiktionary:Criteria_for_inclusion) in the dictionary.

*dumbbitch* and *femnazi* strike me as a bit odd. It's possible they're largely just typos for *dumb bitch* and *[feminazi](https://en.wiktionary.org/wiki/feminazi)*, respectively, but it's hard to determine from context.

The rest look like fairly straightforward oversights. Interestingly, Wiktionary did once have an entry for *[assbag](https://en.wiktionary.org/wiki/assbag)*, but it was deleted by an admin in 2009 with the reason "[Fatuous](https://en.wiktionary.org/wiki/fatuous) entry". (But we can't judge this too harshly without knowing what the entry looked like at the time. It might have just been some silly vandalism like "*(colloquial)* My math teacher, Mr. Lowell".)

It's worth noting that Green's Dictionary of Slang, another excellent free online dictionary, has entries for *[dicknose](https://greensdictofslang.com/entry/7xn3mmi#3tbcbxi)*  and *[ass-bag](https://greensdictofslang.com/entry/ywlso5i#7wqdpoy)*, defining both as general terms of abuse.

### Words Wiktionary maybe *shouldn't* have

On the other hand, there are a few words in Wiktionary which are vanishingly rare on Reddit, including 6 which appear less than 10 times each:

{% include compound_curses/rare_wikt_terms_table.md %}

Of course, just because they're rare on Reddit doesn't mean they weren't in common use at some time and place. (Though I'm skeptical of *homowhore*. A google books search finds only two results, one of which is a [scanno](https://en.wiktionary.org/wiki/scanno) for *somewhere*.)

## The most versatile ingredients

In the matrix visualization, you'll notice that some rows and columns have most of their weight concentrated on one or two specific compounds. For example, the suffix *-hat* has a strong tendency to combine with *ass-* over any other prefix. Others have their weight more evenly distributed, such as *-face* or *shit-*.

We can operationalize this concept of an affix's "flexibility" using collision probability, which is simply the answer to the question: if I randomly pick two terms using this affix, what are the chances they will be the same? For *-hat*, this probability will be high, since 99% of all *-hat* compounds are *asshat*. But for something like *fuck-*, the chance of collision will be low, since there are many viable compounds to choose from (*fuckface*, *fuckwad*, *fuckknuckle*, *fuckboy*, etc.). This metric is closely related to [Shannon entropy](https://en.wikipedia.org/wiki/Shannon_entropy), and gives very similar results.

Here's a scatterplot of total frequency vs. collision probability for all the prefixes measured:

![png](/assets/compound_curses/prefix_collisions.png)

*fuck-* and *shit-* are the clear standouts, in that they're used extremely frequently and in a wide variety of compounds.

Here's the same for suffixes:

![png](/assets/compound_curses/suffix_collisions.png)

## The politics of pejoration

I only included 4 prefixes which are primarily used to insult based on political orientation (presented here with a few of the suffixes with which they collectively appear most frequently):

![png](/assets/compound_curses/politics_matrix.png)

The prefixes used against the left (*lib-* and *soy-*) have about 430,000 occurences between them, significantly exceeding *right-* and *trump-*, with 15,000 and 69,000, respectively. However, it's unclear to what degree this reflects the size of these political demographics on Reddit vs. their respective propensities to use vulgar language.

While *trump-* is only third in frequency among these prefixes, it is by far the most flexible. Its most common companion (*-tard*) accounts for only 45% of all its occurrences, whereas the other three prefixes have more than 90% of their occurrences tied up in one compound. Of the 73 suffixes considered, there were only 9 *trump-* compounds that never appeared on Reddit, namely: *trumpnozzle*, *trumpmitten*, *trumplib*, *trumpbandit*, *trumppirate*, *trumppuffin*, *trumpgoblin*, *trumpsplash*, and *trumpbreath*.

## Where are all the assheads?

The question of *why* certain terms combine more felicitously than others is fascinating to me. It's more than just a matter of semantics. Consider a family of synonyms like *ass*, *butt* and *bum*:

![png](/assets/compound_curses/butt_matrix.png)

(For ease of comparison, I linearly scaled each row so they summed to the same amount. Thus the colour of a cell reflects the prefix's affinity for that suffix relative to all the suffixes shown here.)

Our synonyms seem to disagree more often than they agree. It's understandable that the [gemination](https://en.wikipedia.org/wiki/Gemination#English) of *assslut*, *butttard*, and *bummonkey* are avoided (the spellings *asslut* and *buttard* are slightly more common, but still very rare). But other lacunae are harder to account for. Butthead is common, so why are asshead and bumhead so rare? Why does buttclown fail where assclown succeeds?

I suspect that euphony is a prime consideration here. There's something deeply pleasing in the assonance of *spunktrumpet*, *douchecanoe*, and *wankstain*.

### Visualizing attachment patterns

[TODO: link to James's work]

## Appendix: Technical details

Stuff to talk about (maybe):
- Filtering. Copypasta, urls, etc.
- Sampling for frequent terms
- Confounders (e.g. stinkweed is real, femboy is not pejorative)
