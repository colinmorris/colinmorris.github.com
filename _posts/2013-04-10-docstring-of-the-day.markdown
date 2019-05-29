---
layout: post
title: "Docstring of the day: a mystery"
categories: python
---

I like to think I'm pretty good about writing docstrings that will be comprehensible to my successor when I leave a job or [get hit by a bus](http://en.wikipedia.org/wiki/Bus_factor), but sometimes I get a bit silly, and write riddles like...

{% highlight python %}
	"""Return resumes and Bjorks and pina coladas.
	"""
{% endhighlight %}

Here's the code to go along with it:

{% highlight python %}
	def mystery(s):
	    """Return resumes and Bjorks and pina coladas.
	    """
	    try:
	        return s.decode('ascii')
	    except UnicodeDecodeError:
	        s = s.decode('latin1')
	        normalized = unicodedata.normalize('NFKD', s)
	        return ''.join(char for char in normalized if ord(char) < 128)
{% endhighlight %}

If you guessed that this code strips [diacritics](http://en.wikipedia.org/wiki/Diacritic) from the given string, giving the closest possible ASCII representation of any foreign characters, then congratulations you clever so-and-so. I was inspired by a [similiar routine](https://code.google.com/p/google-refine/source/browse/trunk/main/src/com/google/refine/clustering/binning/FingerprintKeyer.java) in Google Refine. They use a sort of homebaked lookup table, rather than the pithier approach of unicode equivalence - schmucks! It turns out that normalizing foreign characters is a helpful step in clustering swathes of messy free text (something I'm doing a lot of right now at Sciencescape).
