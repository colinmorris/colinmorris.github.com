---
title: "Does ChatGPT know about things Wikipedia doesn't?"
tags: [wikipedia, machine-learning]
excerpt: "Damaged Goods is a 1901 play about syphilis. It is so obscure it doesn't have a Wikipedia article. Does ChatGPT know anything about it?"
---

I've spent a lot of time editing Wikipedia. I do it for many reasons, but one of the sillier ones floating around the margins of my consciousness is that I like to think that, by expanding Wikipedia, I am in some small way helping the advance of AI and speeding along the arrival of the singularity. After all, Wikipedia has historically been an important training corpus for AI models.

But large language models like ChatGPT are getting astonishingly good. How close are we to being able to let them loose to write Wikipedia articles themselves?

The other day, before writing a new article about a turn-of-the-century play about syphilis (why yes, I am enjoying my retirement, thanks for asking), I decided to ask ChatGPT to write an article about it for me. I was especially interested in this as a test of the *breadth* of the AI's knowledge. Does ChatGPT know anything about an old play so obscure it doesn't even have a Wikipedia article?

The answer, surprisingly to me, was yes. I needed to do some prodding to get it to use appropriate formatting ("repeat but use wikilinks", "don't forget the categories", "please use ref tags to format your inline citations", etc.), but it eventually produced a wikitext article that looked like this when rendered:

![Article written by ChatGPT, rendered by Wikipedia's software](/assets/damaged_goods/chatgpt_article.png)

Above all else, I'm really impressed that ChatGPT is even aware of such an obscure entity. This is a play which, as far as I can tell, was last staged in 1943, and which has just a smattering of modern coverage in a few books, journal articles, and blogs. That ChatGPT was exposed to information about the play shows the great volume of text it was trained on. That it "remembers" something about it shows it has an extremely impressive capacity to retain information.

I was also tickled that it cited A. M. Brandt's 1985 book "No Magic Bullet: A Social History of Venereal Disease in the United States Since 1880". That's a real book, and it does have a couple pages about Damaged Goods. It was actually this book that exposed me to the play, and led me to want to create an article about it!

Though it was impressive at first glance, I had no intention of actually publishing ChatGPT's article to Wikipedia as written, or even using it as a starting point for my own article. I went off and [wrote an article about the play from scratch](https://en.wikipedia.org/wiki/Les_Avari%C3%A9s). When I returned to the ChatGPT article after that, I realized that I had been right to be cautious.

To someone only vaguely familiar with the play, ChatGPT's article seemed right on. But after having done a few hours of research, it became apparent that, throughout the article, the AI had indulged in its hallmark bad habit of blithely filling in gaps in its knowledge with plausible-sounding lies.

Here is an inventory of the major errors in ChatGPT's article:

* The play was written in 1901, and published not long after. 1911 is the date of initial publication for the English translation.
* George's wife is named Henriette, not Blanche.
* George discovers he has syphilis before he marries, not after. The first act is all about the dilemma of whether George should delay his marriage for a few years until his syphilis can be treated (it took a long time back then!).
* The play *was* banned in multiple countries, but the USA was not one of them.
* American Experience is a real PBS television show, but as far as I can tell, it has never run an episode about this play.
* Not an error, but a major oversight: the plot summary neglects to mention that George and Henriette have a baby which is born with congenital syphilis. This is the main plot point that drives the second and third act of the play.

It would certainly be a mistake to let ChatGPT loose to edit Wikipedia in its current state. But still, this experiment, on the whole, increased my esteem for ChatGPT's abilities. The fact that it can even muddle its way through a half-correct description of such a profoundly obscure topic speaks to an absolutely colossal breadth of knowledge floating around in those billions of parameters.

If you're not familiar with how ChatGPT and other large language models work, you'll probably be less impressed by this than you ought to be. A point I want to emphasize is that it would be a mistake to conceptualize ChatGPT as containing or being able to refer to databases or indices of items like plays, people, events, places, and so on. If it's going to refer to these things in its answers, it needs to have "memorized" them the hard way - in a manner very similar to how we memorize things: by encoding them as patterns in its "brain". Its knowledge of this obscure French play exists only as a pattern in a hierarchy of abstractions represented by a bunch of nodes connected by floating point numbers. That's so cool! (The brilliant science fiction writer Ted Chiang recently wrote an article for The New Yorker, ["ChatGPT is a Blurry Jpeg of the Web"](https://www.newyorker.com/tech/annals-of-technology/chatgpt-is-a-blurry-jpeg-of-the-web), which is sort of relevant to this idea, and also touches on the phenomenon of "hallucinations" demonstrated in the example above.)
