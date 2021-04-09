Hey, it's my blog.

This readme is mostly just notes to myself of things I keep forgetting/losing time to.

## Things to remember

To preview the site locally run `bundle exec jekyll serve`. (As a prereq, [install jekyll](https://jekyllrb.com/docs/installation/) and its dependencies.)

Sometimes you will paste in some HTML having attribute values not enclosed in quotation marks. This will cause Jekyll to shit its pants in extremely subtle and unhelpful ways. Try not to lose too much time to this.

If you post-date a blog post, it will just not show up. What a great feature that is.

## Layout hierarchy

raw > default > 
  page # used for non-blog pages like "Toys", "About"
  post > # incorporates tags, adds disqus comments
    notebook-post > dcss-post # auto-gen'd posts from ipynbs (not used anymore)
  blog_by_tag
generator-app

## Includes

head: y'know, head things. scripts, stylesheets, metadata stuff
header: Site header with title + navigation links
footer

## Post metadata

### Jekyll builtins

- title
- layout

### Custom

- draft: If truish, hides post from listing (in index.html), but still generates the page. 
- thumbnail: Path to an image file relative to site root. Will be used as preview img by reddit, twitter, facebook etc.
- excerpt: Some short text description of content. Used in previews on twitter, fb. If not specified, falls back to something like the first 160 characters of the post.
- tags: array of tags. must be specified in `_my_tags` directory. e.g. `[data-visualization, linguistics]`
- custom_css: base name of a css file in the `css/` directory (e.g. `recep`)
- large_img: if truthy, use `summary_large_image` twitter card metadata instead of just `summary`
- headtitle: if present, used for the \<title\> element in the head in place of the regular title value. (e.g. if the regular title has some html tags, put a stripped down version here)
