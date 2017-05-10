---
layout: post
title: "6 Weird Pop Songs, Visualized"
tags: [data-visualization]
custom_css: songsim
---

I recently made [SongSim](https://colinmorris.github.io/SongSim/#/), a little web app that creates interactive visualizations from song lyrics. One nice property of its visualizations is that they often make it apparent when something weird is going on.

The 6 songs I picked for this post are each weird in different ways, and their self-similarity matrices tell the story of their weirdness.

## [0. Ke$ha - Tik Tok](https://www.youtube.com/watch?v=iP6XpLQM2Cs)

Number 0 isn't actually part of the list proper. I wanted to start with an extremely *ordinary*<a id="cite1" href="#footnote1">*</a> pop song, for comparison. Here's what the self-similarity matrix of a normal, healthy pop song looks like:

<figure>
  <img src="/assets/songsim/tiktok.png" />
  <figcaption>
    <a href="/SongSim/#/tiktok">Interactive version</a>
  </figcaption>
</figure>

If you're not familiar with how to interpret these matrices, I recommend taking look at SongSim's [About](https://colinmorris.github.io/SongSim/#/about) section, which explains how they're constructed, and describes some [common matrix patterns](https://colinmorris.github.io/SongSim/#/about/advanced) and their meaning.

But to briefly recap: a dot off the main diagonal means a word is used in more than one place in the song. If multiple dots line up diagonally, it means a sequence of words is repeated. 

This song follows the pattern:

    verse chorus verse chorus bridge chorus

The song starts from the top-left corner with the first 
verse<a id="cite2" href="#footnote2">**</a>. 
Reading across the rows (or down the columns), there are no matching phrases. That's how it usually goes with a verse.

The long green-ish diagonals represent some long section that's repeated 3 times - looks like a chorus! (The smaller diagonals on either side of each chorus mean that it's internally repetitive. In this case, it splits cleanly down the middle, consisting of the same 28 word sequence sung twice in a row.)

We can guess that the reddish thing is a bridge, because it doesn't match any other parts of the song and, unlike the verses, it has some distinct internal structure. Also, it occurs about 3/4s of the way through. Very bridge-like.

The only other notable feature is the small fuchsia pattern before the second chorus. That's just some very brief, local repetition at the end of the verse: "Or the police shut us down, down / Police shut us down, down").

## [1. Kylie Minogue - Can't Get You Out Of My Head](https://www.youtube.com/watch?v=YPwtJ89jes4)

Now here's a pop song with a mutation on the X gene:

<figure>
  <img src="/assets/songsim/cgyoomh.png" />
  <figcaption>
    <a href="/SongSim/#/cgyoomh">Interactive version.</a> Title phrase in fuchsia.
  </figcaption>
</figure>

The most eye-catching features here are the big black boxes. These appear when a single word is sung over and over. In this case, it's the "la la la / la la la la la" hook. This song is 47% "la"! It's as much a chant as it is a pop song.

The high-level structure is also odd. The songwriters acknowledge this in an [interview](http://www.m-magazine.co.uk/creators/i-wrote-that-cant-get-you-out-of-my-head/):

> None of the sections in the song conform to the typical verse-chorus structure... It breaks a few rules, as it starts with a chorus and in comes the “la’s” – that is what confused my publisher when he first heard it.

Having looked at a lot of these matrices, I no longer believe that leading with the chorus is very special. (It's [not](https://colinmorris.github.io/SongSim/#/think) a [new](https://colinmorris.github.io/SongSim/#/jimmymack) phenomenon [either](https://colinmorris.github.io/SongSim/#/sugarsugar)).

But the absence of any verses is pretty unusual. The closest things are the sections after the 2nd and 3rd choruses ("Every night, every day...", "There's a dark secret in me..."), but they have some lyrical overlap, and they sound more bridge-y.

The structure of the last third of the song is pretty cool. It interleaves the "la la" hook with the just the title line from the chorus. (Ending with a mash-up of previously-seen hooks is a pretty common pop trope. We'll see it again in #6.)

## [2. The Beach Boys - Wouldn't It Be Nice?](https://www.youtube.com/watch?v=nZBKFoeDKJo)

<figure>
  <img src="/assets/songsim/wouldntitbenice.png" />
  <figcaption>
    <a href="/SongSim/#/wouldntitbenice">Interactive version.</a> Title in fuchsia.
  </figcaption>
</figure>

Wouldn't it be nice if this song had a chorus?

Whereas the last song was wall-to-wall repetition, this one has almost none. The only repeating sequence of more than 2 words is the title phrase. 

Of course, melodically speaking, there is a chorus that repeats twice ("Wouldn't it be nice if we were older...", "Wouldn't it be nice if we could wake up..."). It's just that the lyrics are completely different each time, with the exception of the title phrase at the beginning.

## [3. Lorde - Ribs](https://www.youtube.com/watch?v=4qaeoz_7cyE)

<figure>
  <img src="/assets/songsim/ribs.png" />
  <figcaption>
    <a href="/SongSim/#/ribs">Interactive version.</a> Generated with "colorful mode", which assigns a different colour to each distinct word.
  </figcaption>
</figure>

This song has two interesting properties which seem totally at odds:

1. It's uber-repetitive. There's only *one* line in the whole song that isn't repeated somewhere else (can you find it?).

2. It has no chorus.

The key here is that there's a lot of repetition, but it's all *local*. All the repetition stays close to the main diagonal. The top-right and bottom-left corners of the matrix are barren, meaning none of the repeated sections occur very long after they were first sung.

If we label the major repeated sections A, B, C... in order of first appearance, then the structure of the song looks like:

    A B A A C B C C D D(?) E E

Trippy!

## [4. Robyn - Don't Fucking Tell Me What To Do](https://www.youtube.com/watch?v=h7975tw0EJA)

<figure>
  <img src="/assets/songsim/dontfuckingtellmewhattodo.png" />
  <figcaption>
    <a href="/SongSim/#/dontfuckingtellmewhattodo">Interactive version</a>
  </figcaption>
</figure>

When you set eyes on the matrix for this one, it's immediately clear that something really weird is going on.

The first ~15% of the song is a single line repeated many times (hence the "stripey square" pattern):

> My drinking is killing me  
> My drinking is killing me  
> My drinking is killing me...

That's contained in a much larger square that's extremely dense with short diagonals (and a few longer ones). This pattern means the lyrics are riffing on short phrase that recurs frequently:

> My phone is killing me  
> My e-mail's killing me  
> These hours are killing me  
> My tour is killing me  
> This flight is killing me

So those short diagonals correspond to "killing me" (and sometimes, "is killing me", "are killing me", "killing me My", etc.).

It's interesting to see that one swathe of lines (the longest line off the main diagonal) is repeated in order ("my e-mail", "these hours"... "my landlord"), and there are a few other lines that are repeated seemingly randomly ("your nagging is killing me", "can't sleep it's killing me"...). It's the kind of thing I'd probably never notice if I listened to the song 100 times.

In the last section of the song, which is so clearly distinct from what came before, Robyn just repeatedly sings the title line.

Weird!

## [5. Girls Aloud - Can't Speak French](https://www.youtube.com/watch?v=Vhz1eKLsepo)

<figure>
  <img src="/assets/songsim/cantspeakfrench.png" />
  <figcaption>
    <a href="/SongSim/#/cantspeakfrench">Interactive version</a> (song title in fuchsia)
  </figcaption>
</figure>

Unlike all the other songs on this list so far, this one actually has all the main ingredients of a pop song:

- verses
- a chorus
- a bridge

The weird part is how they're assembled. A normal verse-chorus structure is something like...

    verse chorus verse chorus bridge chorus chorus

But rather than interleaving the repeated and non-repeated parts, this song segregates them, looking something like:

    verse verse chorus bridge chorus

The song is only 3 minutes 21 seconds<a id="cite3" href="#footnote3">***</a>, but Girls Aloud make us wait a minute and 10 seconds before they introduce the chorus. For comparison, I measured the time of chorus onset for a few randomly chosen pop songs of about the same length:

- Ke$ha - Tik Tok: 0:33/3:19
- Sia - Chandelier: 0:35/3:36
- Carly Rae Jepsen - Call Me Maybe: 0:29/3:13

Girls Aloud are really testing our patience with this one.

(An interesting feature which *isn't* apparent in the matrix is the the second half of the non-repeating section. Melodically, it's clearly a pre-chorus. It just looks like a verse here, because it never gets repeated. Xenomania pull a similar trick in another Girls Aloud track, Biology ([song](https://www.youtube.com/watch?v=bBPtP4t2J1k), [matrix](https://colinmorris.github.io/SongSim/#/biology)): they write a banging pre-chorus/B-chorus ("closer...", "we give it up, and then they take it away..."), but never bother to use it more than once.)

## [6. Lady Gaga - Bad Romance](https://www.youtube.com/watch?v=qrO4YZeyl0I)

<figure>
  <img src="/assets/songsim/badromance.png" />
  <figcaption>
    <a href="/SongSim/#/badromance">Interactive version</a>
  </figcaption>
</figure>

There's a lot of interesting stuff going on here...

### I. So many hooks

How many hooks can Lady Gaga squeeze in to 4 minutes and 54 seconds? Let's count:

1. "Ohohohhhohhhhh, caught in a bad romance" <small>[orange]</small>
2. "Rah rah, ah ah ah..." <small>[brown]</small>
3. "I want your love / Love love love / I want your love" <small>[green]</small>
4. "You know that I want you..." <small>[green/turquoise]</small>
5. "I want your love, and I want your revenge / You and me could write a bad romance..." <small>[turquoise]</small>
6. "Walk, walk, fashion, baby..." <small>[purple]</small>

("Hook" might not technically be the correct word for all these. What I mean is just a lyrical theme of non-trivial size, which is non-locally repeated.)

### II. Discombobulated chorus

Arguably, the best contender for the title of "chorus" is the combination of #5 followed by #1(x2):

> I want your love, and I want your revenge  
> You and me could write a bad romance  
> I want your love, and all your love is revenge  
> You and me could write a bad romance  
> Oh, caught in a bad romance  
> Oh, caught in a bad romance

So why do #5 and #1 deserve to be called separate hooks? Well, #1 appears unyoked at the very beginning of the song (take note, "Can't Get You Out Of My Head" songwriters: if you really want to break the rules, try starting *halfway through* the chorus), and post-bridge.

Scanning along the top row, you may be able to count 10 occurences of hook #1 (it manifests as a bright orange line). Up to the bridge, it's always sung twice in a row.

But after the bridge, things get loopy. Gags introduces a new variation on #5 ("I want your love / I don't wanna be friends"), runs it through Google Translate, and throws it in a blender with #1, interleaving bits of #5 with unpaired instances of #1. This is similar to the end of "Can't Get You Out Of My Head", but way more chaotic.

### III. Anaphoric verses

Unusually, the verses (the large, mostly-green squares in the first half), have at least as much internal repetition as the chorus.

The longish diagonals containing the filled-in green blocks are the #3 hook above (a hook that appears 6 times, but only in the verses). But all the other, shorter diagonals, are a template that Gaga is doing variations on with each line:

> I want your ugly, I want your disease  
> I want your everything as long as it's free... [#3]  
> I want your drama, the touch of your hand  
> I want your leather studded kiss in the sand... [#3]

This pattern of starting each line with the same phrase is called [anaphora](https://en.wikipedia.org/wiki/Anaphora_(rhetoric)). This is very similar to what we saw in the Robyn song, though in that case the repeated phrase was at the end of the pattern ("X is killing me"). (The name for that is "epistrophe", in case it comes up on Jeopardy.)

### IV. Nifty bridge

The bridge really stands out visually in this matrix, with the corresponding rows and columns forming pristine "gutters", that stand out from the high density of global repetition elsewhere. The bridge and the French interlude are the only parts of the song that bear virtually no resemblence to any other part - though both sections have a high amount of internal repetition. 

As a chant, the bridge makes a nice "stripey square" pattern, punctuated with buttons for the repeated word that begins each line: "walk, walk, fashion, baby / work it, move that bitch, crazy". The very last diagonal is broken because of a slight variation: "walk, walk, **passion**, baby". 

The very last line, "Work it, I'm a free bitch, baby", further breaks from the pattern. It's also the only line from the bridge with any antecedent. Gaga throws in a "'Cause I'm a free bitch, baby", in the second pre-chorus. Lyrical foreshadowing? Yassss Gaga.

## Acknowledgements/Disclaimer

I'm not an expert on music theory, songwriting, or pop music (except insofar as eating a lot makes you an expert chef). If you are, feel free to correct my amateurish mistakes.

Examples of earnest treatments of pop music that inspired this work include:
- [Owen Pallett's series](http://www.slate.com/articles/arts/culturebox/2014/03/katy_perry_s_teenage_dream_explaining_the_hit_using_music_theory.html) deconstructing pop songs with music theory.
- The [Song Exploder](https://en.wikipedia.org/wiki/Song_Exploder) podcast
- [Popjustice](https://www.popjustice.com/), the gold standard for smart, reverent writing on pop. 💖

### Footnotes 

<small>
<a href="#cite1" id="footnote1">^</a> *
ordinary in terms of lyrical structure, which is the only level I'll be analyzing these songs on. My tool says nothing about the sonic properties of the song. (For that reason, these visualizations can sometimes be misleading. e.g. a long instrumental section will be invisible to the tool. The "wouldn't it be nice" at the beginning of the titular Beach Boys is sung with a very different melody and prosody compared to the one at the end, but in the eyes of the matrix, they're the same.)</small>

<small>
<a href="#cite2" id="footnote2">^</a> **
Based on the melody, what I'm calling the verses are probably better described as each being a verse and a pre-chorus. Unusually, the two instances of the pre-chorus have no lyrical overlap, so it'd be impossible to make this distinction without listening to the audio.</small>

<small>
<a href="#cite3" id="footnote3">^</a> ***
I used the radio edit/single version. The album version is about 40 seconds longer, and features another repetition of the chorus at the end, and some longer instrumentals. What, you already knew that?</small>

<img src="https://media.giphy.com/media/wOfmYO0pFGpDa/giphy.gif" />
