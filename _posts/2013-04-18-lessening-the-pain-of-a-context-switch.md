---
layout: post
title: "Lessening the pain of a context switch"
description: ""
category: 
tags: [programming, productivity, IDEs]
---
{% include JB/setup %}

This is how I feel when I come back to code I was writing yesterday.

![](http://24.media.tumblr.com/bc530abf9c128b53b6836319d18a5d04/tumblr_mj697xfcSD1rlsczgo1_500.gif "Its Monsoon season, bitches")

Supposedly, it takes an average 15 minutes to get back to "maximum productivity" when returning to a task after an interruption (this is why one of the points on [Joel's List](http://www.joelonsoftware.com/articles/fog0000000043.html) is that programmers must have quiet working conditions. 

But is there some way to cut down on that number? Surely the mechanical step of finding your way back to the point in your source code where you were last working is a significant part of this cost. I've heard fellow programmers say they put in intentional syntax errors, with the benefits that:

* They won't accidentally build their incomplete code later, and have it fail subtly.
* Most IDEs will loudly point you to the location of the error.

Lately I've been favouring syntax error plus a `#YOUAREHERE` comment (so future-me remembers the intention behind the syntax error). I also added this as a special [TODO pattern in PyCharm](http://www.jetbrains.com/pycharm/webhelp/using-todo-lists.html#procedure%0A______to_define_a_todo_pattern,_follow_these_general_stepsdefining_todo_patternsaswritten) in a flamboyant, hard-to-miss colour. 

![](assets/img/pycharm_youarehere.png)

This works, but still doesn't feel very satisfying. I'm amazed there isn't a standard IDE feature to leave a conspicuous breadcrumb trail to the section (or sections) of code you were working on. Or is there one that's escaped my view?
