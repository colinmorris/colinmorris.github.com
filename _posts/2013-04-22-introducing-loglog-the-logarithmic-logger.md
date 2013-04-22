---
layout: post
title: "Introducing LogLog, the logarithmic logger"
description: ""
category: 
tags: [python, logging, recipes]
---
{% include JB/setup %}

Let's have a dialog.

I'm sure everyone has written code like this before:

{% highlight python %}
    niters = 0
    for gum in gumfile:
        chew(gum)
        niters += 1
        if niters % 1000 == 0:
            print "Chewed %d pieces of gum" % (niters)
{% endhighlight %}

Getting these messages is nice, because they tell me that my program isn't hanging, and give me some idea of how long I should expect to wait before it finishes. But this is a fair bit of boilerplate for what would otherwise be 2 lines of code. And if I want timing information (as I often do) it becomes even worse:

{% highlight python %}
    import time
    niters = 0
    t1 = time.time()
    for gum in gumfile:
        chew(gum)
        niters += 1
        if niters % 1000 == 0:
            t2 = time.time()
            print "Chewed %d pieces of gum in %d seconds" % (niters, t2-t1)
            t1 = t2
{% endhighlight %}


But the most annoying thing is the high probability of one of two outcomes.

Log starvation
--------------

> What's taking it so long?

> Should I set that notification interval lower? No, it's been running for a while, it must be close.

> Is it stuck in an infinite loop? Where could I have put an infinite loop?

`Chewed 1000 pieces of gum in 742 seconds`

> Oh, there it is.

[Logorrhea](http://en.wikipedia.org/wiki/Logorrhoea)
----------------------------------------------------

    Chewed 1000 pieces of gum in 0 seconds
    Chewed 2000 pieces of gum in 0 seconds
    Chewed 3000 pieces of gum in 0 seconds
    Chewed 4000 pieces of gum in 0 seconds
    Chewed 5000 pieces of gum in 0 seconds

> OKAY OKAY I GET IT, SHUT UP

This seems to happen to me all the time when I'm dealing with, well, not Big Data, but... husky data? I often have a hard time guessing _a priori_ even the order of magnitude of time my code will take. I've taken to revising the above code to look something like:

{% highlight python %}
    import time
    niters = 0
    notification_interval = 10
    max_notification_interval = 10**6
    t1 = time.time()
    for gum in gumfile:
        chew(gum)
        niters += 1
        if niters % notification_interval == 0:
            t2 = time.time()
            print "Chewed %d pieces of gum in %d seconds" % (niters, t2-t1)
            t1 = t2
            notification_interval = min(notification_interval*2, max_notification_interval)
{% endhighlight %}

This is sort of the opposite of an [exponential backoff](http://en.wikipedia.org/wiki/Exponential_backoff) algorithm (except that there's no backoff). After writing this kind of code often enough, my [laziness](http://threevirtues.com/) compels me to wrap this pattern up in a nice little module that I can import when needed.

Enter LogLog
------------

With LogLog, the above code can be effectively replaced with:

{% highlight python %}
    import loglog
    log = loglog.LogLog(desc="chewed gum", max=10**6)
    for gum in gumfile:
        chew(gum)
        log.tick()
{% endhighlight python %}

If chewing gum ends up being blazingly fast, we get a bit of logorrhea for the first minute, and then messages quickly calm down.

    INFO 2013-04-22 14:27:28,486 : chewed gum 10 times
    INFO 2013-04-22 14:27:28,487 : chewed gum 20 times
    INFO 2013-04-22 14:27:28,489 : chewed gum 40 times
    INFO 2013-04-22 14:27:28,492 : chewed gum 80 times
    INFO 2013-04-22 14:27:28,497 : chewed gum 160 times
    INFO 2013-04-22 14:27:28,509 : chewed gum 320 times
    INFO 2013-04-22 14:27:28,533 : chewed gum 640 times
    INFO 2013-04-22 14:27:28,582 : chewed gum 1280 times
    INFO 2013-04-22 14:27:28,678 : chewed gum 2560 times
    INFO 2013-04-22 14:27:28,869 : chewed gum 5120 times
    INFO 2013-04-22 14:27:29,252 : chewed gum 10240 times
    INFO 2013-04-22 14:27:30,022 : chewed gum 20480 times
    INFO 2013-04-22 14:27:31,559 : chewed gum 40960 times
    INFO 2013-04-22 14:27:34,631 : chewed gum 81920 times
    INFO 2013-04-22 14:27:40,755 : chewed gum 163840 times
    INFO 2013-04-22 14:27:53,053 : chewed gum 327680 times
    INFO 2013-04-22 14:28:17,652 : chewed gum 655360 times

Alternatively, if chewing gum takes a long time, we still get some messages quickly. We know our program isn't hanging, and we can estimate our gum-chewing rate.

    INFO 2013-04-22 14:29:05,557 : chewed gum 10 times
    INFO 2013-04-22 14:29:15,569 : chewed gum 20 times
    INFO 2013-04-22 14:29:35,591 : chewed gum 40 times
    INFO 2013-04-22 14:30:15,634 : chewed gum 80 times

Clone it!

![](http://25.media.tumblr.com/d3ea4eb1f5315d8796d0073f2ee8eda1/tumblr_mic544mqGI1qc7rneo1_500.gif)
