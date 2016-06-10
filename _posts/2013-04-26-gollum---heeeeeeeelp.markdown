---
layout: post
title: "gollum --heeeeeeeelp"
categories: gollum documentation
---

I find it ironic that [gollum](https://github.com/gollum/gollum) -- a system for *creating documentation* (it powers GitHub's wikis) -- has some of the worst documentation I've seen. They have

* A [README.md](https://github.com/gollum/gollum/blob/master/README.md)
* A [wiki](https://github.com/gollum/gollum/wiki) with **2 pages**, [one of which](https://github.com/gollum/gollum/wiki/Sdw-Test) has title "Sdw Test" and body "This is a test.".
* A [docs directory](https://github.com/gollum/gollum/tree/master/docs) with **1 page** written 3 years ago.

That's it. So good luck if you want to do something ridiculously simple like use GitHub Flavored Markdown instead of vanilla. 

**Edit**: After some searching, I found that someone had opened [an issue](https://github.com/gollum/gollum/issues/372) about precisely this question. This was closed with the remark that gollum does not support "specifying a particular markdown rendering library" (which sort of disingenuously suggests that this is just a matter of choosing between different libraries for rendering a particular language, rather than choosing between different dialects of a language with different semantics). Subsequent comments do little to illuminate the matter. Things are made even more complicated by my discovery that [wiki pages seem to be rendered with GF markdown, whereas the edit-mode preview uses vanilla](https://github.com/gollum/gollum/issues/690). No bueno.
