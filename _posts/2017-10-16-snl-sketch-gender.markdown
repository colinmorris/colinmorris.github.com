---
layout: post
title: "Breaking down the gender composition of SNL sketches"
tags: [data-visualization]
excerpt: ""
---

It's a great time for women on SNL. Since the early 2000's, the majority of the show's breakout stars have been women. Of the 18 Emmy nominations for acting the show has received since 2000, 14 went to women.

An anecdotal trend I've noticed in recent seasons is an increasing number of [sketches](https://www.youtube.com/watch?v=mWYcobbgIU0) with [entirely](https://www.youtube.com/watch?v=h_DHJrswOKw) [female](https://www.youtube.com/watch?v=3twGmSu1MI0) ensemble casts.

I was curious to see whether this is actually borne out in the data, so I turned to the excellent [snldb](https://github.com/hhllcks/snldb).

![png](/assets/snl-sketch-gender/output_11_0.png)


<small>Some notes on how this was calculated:</small>
- <small>Only cast members are counted - not hosts or cameo appearances. If a sketch has 2 female cast members, 2 male cast members, and the (male) host, it will be counted as 50:50, rather than majority male.</small>
- <small>I counted sketches, live or filmed. I did not include the host's monologue or Weekend Update.</small>
- <small>A sketch had to have at least 2 cast members to be counted.</small>
- <small>I did not include the current season (43) because it's only a few episodes in.</small>

<small>But the overall trend is pretty robust in the face of changes to the above parameters.</small>

The last few seasons do stand out pretty remarkably in terms of female-dominated sketches. Starting in season 40, for the first time, more than 1 out of 4 sketches had more women than men. The last season also represents an all-time low for all-male sketches, a continuation of a pretty steady decades-long trend.

# Chick Sketches and Guy Sketches

It's interesting to peek at a few examples of all-female and all-male sketches through the ages.

Below I randomly sampled from each season one sketch meeting the following criteria:
- At least 3 performers
- All of them women (including the host, if present)

These are slightly more stringent than the criteria I used for measuring 'all-female' sketches in the chart above, but it still doesn't seem like a very high bar to clear. But remarkably, there are 8 seasons without a single sketch that passes this test.








![png](/assets/snl-sketch-gender/output_15_0.png)




Here's the same thing for all-male sketches through the ages.




![png](/assets/snl-sketch-gender/output_18_0.png)


It's interesting to note that the majority of the all-female sketches are about explicitly 'girly' topics (e.g. 'Neutrogena Coin Slot Cream', 'Cheerleaders', 'Lesbian Cruise'). On the other hand, a handful of the all-male sketches are gender-specific ("Steve Martin's Penis Beauty Creme", "Guy Talk"), but the majority aren't "guy sketches" - they're just sketches.













# Effect of cast demographics

The gender makeup of SNL sketches has changed considerably over time. But so has the gender makeup of the show's cast.




![png](/assets/snl-sketch-gender/output_27_0.png)


Maybe the changes in sketch demographics are just a straightforward consequence of changes in the cast demographics.

We can compute the predicted distribution of male/female-dominated sketches under a null hypothesis where sketch casts are entirely random. To be precise, we'll imagine that the number of roles in each sketch is fixed, and that those roles are filled by selecting performers from the cast uniformly at random, without replacement. The result looks like this:






![png](/assets/snl-sketch-gender/output_30_0.png)


Our null hypothesis actually predicts reality pretty well. The main difference is that the number of all-female and majority-female sketches are pretty consistently underestimated. (In our simulation, we still haven't crossed the 25% threshold, which was in reality crossed in season 40)




![png](/assets/snl-sketch-gender/output_32_0.png)


The green/orange regions represent how much majority female sketches are overrepresented/underrepresented compared to what would be expected by chance (the dashed line).

The data points to around 4 distinct eras of female excellence on SNL, where majority-female sketches are significantly overrepresented. Each lines up with a cohort of MVP female cast members who joined and left around the same time:
1. The early years (Gilda Radner, Jane Curtin, Laraine Newman)
2. The mid-to-late-90's (Molly Shannon, Cheri Oteri, Ana Gasteyer)
3. The era of funny women from Chicago (Tina Fey, Amy Poehler, Rachel Dratch), plus Maya Rudolph, and later Kristen Wiig (whose tenure on the show almost comprises an era of its own).
4. The modern era (Kate McKinnon, Cecily Strong, Vanessa Bayer, Aidy Bryant)

It's interesting to note the contractions between each of the last 3 periods, marking 'rebuilding years'.




![png](/assets/snl-sketch-gender/output_34_0.png)

<small><i>(Sorry about the hack job annotations.)</i></small>


There's a pretty clear pinch from seasons 25-27, after the exit of key players from the previous generation (Oteri, Shannon), and before the next cohort fills out (with the addition of Amy Poehler in season 27) and finds its voice.

Season 38 represents another major rebuilding year. This is the first season without Kristen Wiig (Fey, Poehler, et. al having left long ago). Future MVPs Kate McKinnon, Cecily Strong, and Aidy Bryant all joined as featured players in this season, with Vanessa Bayer having joined the year earlier.

Outside of these golden ages, there also seems to exist a (relative) 'dark age' for women on SNL which stretches through all of the 80's into the early 90's, up to about season 20. During this time, a lot of very funny women joined the show, failed to thrive there, and left after one or two seasons: e.g. Janeane Garofalo, Sarah Silverman, Julia-Louis Dreyfus. SNL had plenty of undeniable stars during this time - Eddie Murphy, Phil Hartman, Adam Sandler, Chris Farley, Dana Carvey, Mike Meyers... But women like Jan Hooks, Victoria Jackson and Nora Dunn arguably failed to attain to the same level of prominence on the show. 

In *Live From New York*, an oral history of SNL, Tina Fey offers a simple explanation for the sea change that was taking place when she joined the show:

<blockquote>
<p>
I think we had enough of a shift in the makeup of the writing staff, and we had Beth McCarthy as a female director - we just had more women in the room. And so not for any political reason, but they laughed at things that the women were doing that the men didn't get on the same level. If you were doing your same bit in a room of all white men it's not necessarily going to play the same. I mean, an easy example is - not that these sketches hold up in any way - we used to write . . . these parodies of <i>The View</i>, and some of the men would say, "What is this, is this a real thing?" And I would go, "Yeah, it's a thing and at least it's a chance for all the women cast to get out."
</p>
<p>
. . . . And so I think by the time, like, Molly and Ana and Cheri . . . and by the time Maya and Kristen and Amy and Dratch got there they didn't have to do the side work of, like, proving that it made sense for them to be on. They just came in, they killed at the table, they had tremendous confidence, and they got their stuff on.
</p>
</blockquote>

Thanks to [Hendrik Hilleckes](https://github.com/hhllcks) for creating snldb, the dataset I used for this analysis, and to the maintainers of [SNL Archives](http://www.snlarchives.net/), from which snldb scrapes its data. If you're interested in doing your own analysis, you can find snldb on [GitHub](https://github.com/hhllcks/snldb) or [Kaggle](https://www.kaggle.com/hhllcks/snldb). The code used to generate the graphics in this post is on GitHub [here](https://github.com/colinmorris/snl-notebooks).

