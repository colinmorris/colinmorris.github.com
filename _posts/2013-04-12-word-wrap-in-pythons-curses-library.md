---
layout: post
title: "Word wrap in Python's curses library"
description: ""
category: 
tags: [python, curses, recipes]
---
{% include JB/setup %}

I'm always surprised when I google a code recipe<a id="footnote-ref" href="#footnote">*</a> and don't find any corresponding blog posts or StackOverflow questions. It's like the internet is incomplete or something. Here's my homebaked implementation of word wrap in [curses](http://docs.python.org/2/library/curses.html):

{% highlight python %}
    class WindowFullException(Exception):
        pass

    def addstr_wordwrap(window, s, width, height, mode=0):
        """ (cursesWindow, str, int, int) -> None

        Add a string to a curses window with given dimensions. If mode is given 
        (e.g. curses.A_BOLD), then format text accordingly. We do very 
        rudimentary wrapping on word boundaries.

        Raise WindowFullException if we run out of room.
        """
        # TODO Is there really no way to get the dimensions of a window programmatically?
        # passing in height and width feels ugly.

        (y, x) = window.getyx() # Coords of cursor
        # If the whole string fits on the current line, just add it all at once
        if len(s) + x <= width:
            window.addstr(s, mode)
        # Otherwise, split on word boundaries and write each token individually
        else:
            for word in words_and_spaces(s):
                if len(word) + x <= width:
                    window.addstr(word, mode)
                else:
                    if y == height-1:
                        # Can't go down another line
                        raise WindowFullException()
                    window.addstr(y+1, 0, word, mode)
                (y, x) = window.getyx()

    def words_and_spaces(s):
        """
        >>> words_and_spaces('spam eggs ham')
        ['spam', ' ', 'eggs', ' ', 'ham']
        """
        # Inspired by http://stackoverflow.com/a/8769863/262271
        return list(itertools.chain.from_iterable(zip(s.split(), itertools.repeat(' '))))[:-1] # Drop the last space
{% endhighlight %}

It's not going to be as clever about wrapping as Python's [textwrap](http://docs.python.org/2/library/textwrap.html) library, but that lib is only suitable if we're writing big tracts of text all at once. With curses, you often want to add strings incrementally, bolding or underlining certain words along the way.

If anyone has an answer to the #TODO above, please ping me.

<p id="footnote" style="font-size:x-small;"><a href="#footnote-ref">*</a>How awesome would "The Joy of Coding" be as a title for a blog or a book of code recipes? And if you could emulate the iconic "Joy of Cooking" typography? Man. Someone's probably done this.</p>
