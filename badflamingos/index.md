---
layout: blank
title: "Bad Flamingos"
custom_css: badflamingos
---


<div class="gallery">
    <h1>Bad Flamingos</h1>
    <p>The 'worst' 400 out of about 100,000 flamingo drawings from the <a href="https://github.com/googlecreativelab/quickdraw-dataset">Quick Draw</a> dataset. See <a href="/blog/bad_flamingos">this blog post</a> for the methodology.</p>
    {% for i in (0..399) %}
        <div class="col-xs-4 col-md-3">
            <img src="/assets/quickdraw/svgs/single/flamingo_bottom_ppxnorm_{{ i }}.svg">
        </div>
    {% endfor %}
</div>
<hr />
