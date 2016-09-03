---
layout: post
title: "Deploying an Angular2 app to Github Pages - a poor man's guide"
---

I recently finished my first-ever incremental game, [Tour of Heroes](https://colinmorris.github.io/tour-of-heroes/), which also happens to be my first-ever Angular 2 app. When it came time to share my app with the world, I found myself stymied. I read a lot of blog posts and StackOverflow answers:

- [Quick Angular 2 Hosting with the Angular CLI and GitHub Pages](http://developer.telerik.com/featured/quick-angular-2-hosting-angular-cli-github-pages/)
- [Building an Angular 2 Application for Production](http://blog.mgechev.com/2016/06/26/tree-shaking-angular2-production-build-rollup-javascript/)
- [How to run Angular 2 (Release Candidate) in Production Today](http://blog.angular-university.io/how-to-run-angular-2-in-production-today/)
- [How to deploy angular 2 apps?](http://stackoverflow.com/a/35563542/262271)
- [How do I actually deploy an Angular 2 + Typescript + systemjs app?](http://stackoverflow.com/a/36315060/262271)
- [Angular 2 - How to bundle for production (currently rc5)](http://stackoverflow.com/questions/37631098/angular-2-how-to-bundle-for-production-currently-rc5)

I made an earnest attempt to follow 4 or 5 such guides, and every time my quest terminated in some kind of opaque (to me) error, whether it was from the Angular CLI, npm, typings, the Typescript compiler, Gulp, or (if I got that far) the page itself. 

My abstraction ship was springing leaks left and right and sinking fast. Suddenly I needed to understand all these config files I had obediently copied from the Angular [quickstart](https://angular.io/docs/ts/latest/quickstart.html) guide. What are SystemJS and Webpack? What's UMD? AMD? What does it mean to specify 'commonjs' vs. 'system' for the 'module' key in my tsconfig? If I'm targeting ES5, how is it that my code uses stuff like Promises and Sets? What's a Polyfill?

Some day I will sit down and learn how this sausage gets made, but right now I would just like to put my app on the internet please and thank you. Here's how I did it.

## A quick and dirty gh-pages deploy in 5 steps

I'm assuming your project is based on the [Quickstart](https://angular.io/docs/ts/latest/quickstart.html) guide (in particular, that it uses SystemJS). 

In case I haven't been explicit enough about it, we're following worst practices here. If you were a good developer, you would bundle, uglify, and minify your js, and use ahead-of-time compilation. But today you're an impatient developer who just wants to get something out the door, so here's what you're going to do.

### 1. check out a gh-pages branch:

    git checkout -b gh-pages

### 2. git add **all the things**.

Here's the command I used. But before you run it, you may want to read the warnings below:

    find app node_modules -type f -name '*.js' -exec git add {} \;

If you want to be able to debug your `ts` files in the browser, you can add your app's map files too:

    find app -name '*.js.map' -exec git add {} \;

Warning 1: your `node_modules` directory may be huge. You can quickly check the size with 

    du -h -d 0 node_modules
    
If you want to trim the number of files you'll be adding to version control, try this:

    rm -r node_modules
    npm install

This should winnow your `node_modules` down to the ones specified in your current `package.json`, and get rid of any leftover modules (say, from those 5 guides to production deployment that you just tried to follow?). In my case, this reduced the size of the directory from 450MB to a petite 134MB!

Warning 2: If you have a .gitignore targeting these files, you may have to delete it or use the --force flag like so:
    
    find app node_modules -type f -name '*.js' -exec git add --force {} \;

### 3. Change the base URL

Github pages will host your app at a URL like `http://your-github.io/your-project/`. However, you've probably been testing with paths relative to the root. So, if you push now and try to load your app, you'll see a bunch of 404s for paths like `/node_modules/core-js/client/shim.min.js`. We need to get it to ask for `/your-project/node_modules/core-js/client/shim.min.js`. Surprisingly easy!

In your `systemjs.config.js` you should have a call somewhere to `System.config`. Add the following key-value pair to the config object that gets passed to that call:

    baseURL: '/your-project/'

e.g.:

    var config = {
        map: map,
        packages: packages,
        baseURL: '/tour-of-heroes/'
    };
    System.config(config);

#### 3b. Router base url

If you're using the router, you'll have an element in your index.html like...

    <base href="/">

Replace it with...

    <base href="/your-project/">


### 4. 404 Symlink

If you're using routes in your app (e.g. `yourname.github.io/yourproject/about`), GitHub Pages will serve them as 404s, because of reasons. Here's a super-quick fix:

    ln -s index.html 404.html

There are some [other](https://github.com/rafrex/spa-github-pages) solutions that are more principled or which might lead to better SEO outcomes, but remember, we're doing the absolute least here.

### 5. (Optional) enable prod mode

In development mode, angular peforms an extra check immediately after each round of change detection to detect programmer errors. If you care, turning this off should improve the performance of your app. Just add a call to `enableProdMode()` in your `main.ts`:

<script src="https://gist.github.com/colinmorris/2f4e336042967c0c253b70f2f129cc88.js"></script>

## How'd it work out?

Not badly!

Okay, the initial page load takes almost 10 seconds, and involves 400-ish requests. But that's a one-time cost for a page that will provide hours of ongoing progress-bar-watching entertainment. And the total download size is barely over a megabyte. 

The main downside of this approach is that switching to and from `gh-pages` is slow, and switching from `gh-pages` leaves `node_modules` in a half-baked state that I end up fixing by nuking it and running `npm install`. 

If you're not at all attached to your dignity, you could probably fix this by adding `node_modules` to version control in master as well. 

If it helps, you can take a look at my `gh-pages` branch [here](https://github.com/colinmorris/tour-of-heroes/tree/gh-pages), though I don't hold it up as a shining example of, well, anything.
