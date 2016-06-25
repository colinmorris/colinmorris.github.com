---
layout: post
title: "Evaluating char-rbms"
categories: machine-learning
---

# Evaluating RBMs

RBMs have a reputation for being a bit finnicky to train, and my experience working on this project is consistent with that. And there are a lot of hyperparameters to tweak. The most significant one is probably learning rate, but some others include:

- Weight cost (add a cost to the magnitude of weights to prevent overfitting, and encourage a good mixing rate)
- Batch size
- Number of fantasy particles
- Number of hidden units
- Epochs (number of times to cycle through the training data)
- Number of rounds of Gibbs sampling on fantasy particles per update (usually 1, but could be more)

There are also some knobs to turn that are specific to this problem, like:

- Whether to do softmax sampling of visible units
- Maximum string length
- Padding character (using spaces reduces the complexity of the model by reducing the size of the visible layer, but a special padding character gives a clearer signal.)

It makes sense to try lots of variations on these parameters, and see what sticks. But, having trained a bunch of models, how do we rank them?

This turns out to be a surprisingly hairy problem. If we were classifying spam, the answer would be obvious - we want the model with the highest accuracy. (Or F\_Beta score for some Beta). 

The most obvious way to assess a generative model is to look at the probability it assigns to some data from the target distribution - ideally, heldout test data that it didn't see during training. If `P_A(test_set) > P_B(test_set)` then we can say that model A is better than B. 

But here's a bombshell I've been holding on to until now. **Likelihood is intranctable for RBMs**. The probability of a visible vector v and hidden vector h is...

    P(v, h) = 1/Z * exp(-E(v,h))

`E(v,h)` is our familiar energy function from earlier, but `Z` is new. It's called the *partition function*, and it's defined as

    sum(exp(-E(v,h)) for (v,h) in all_possible_v_and_h)

If we want to train a model on GitHub repository names of up to length 18, the number of possible visible vectors will be 66^18. That's a for loop we probably don't want to wait on.

Let's talk about some evaluation metrics that are tractable.

#### Pseudolikelihood

[Pseudolikelihood](https://en.wikipedia.org/wiki/Pseudolikelihood) approximates the likelihood of a vector X by the product of the probabilities of each individual X\_i conditioned on the other values. e.g.

    P(X='Bort') = P(X[0] = 'B' | '_ort')
                * P(X[1] = 'o' | 'B_rt')
                * P(X[2] = 'r' | 'Bo_t')
                * P(X[3] = 't' | 'Bor_')

To understand why this isn't a perfect approximation, let's consider a name like 'Barbara'.

I'll use [ghits](http://itre.cis.upenn.edu/~myl/languagelog/archives/000954.html) as a rough proxy for name popularity. "Barbara" has around 500 Mghits. There are no single-character substitutions that have anywhere near that popularity. The only reasonably popular variants I could find were "Darbara" (300k), and "Barbora" (15m). So, if our conditional probabilities follow these counts, our pseudolikelihood product looks something like:

P(X='Barbara') = .995 * .999 * .999 * .999 * .95 * .999 * .999 ~= .90

I do not live in a universe where 90% of people are named 'Barabara'. Though I kind of wish I did.

#### Noise discrimination 


We can't directly calculate the probability of a string, but because E(X) is directly proportional to P(X), we can easily tell whether one string is more or less likely than another, by comparing their energies.

A good model should assign high likelihood to data from the target distribution. Which is another way of saying it should assign higher likelihood to data from the target distribution than it does to some data from not-the-target-distribution.

If we have some mutagen function f that introduces some noise to an instance, we can propose a binary classification problem where the classifier wins if `E(x) < E(f(x))`. 

One simple function we can use just ignores x and returns some uniform noise (either in the space of binary vectors, or one-hot character vectors). This is maybe a bit too easy because most mutants can be tossed out immediately for reasons of form rather than content. For example, the geo-names training corpus will never contain:

- a padding character preceding a non-padding character
- two or more consecutive spaces
- a string with no padding characters or spaces (i.e. a single-word name 20 characters long)

This is not a great differentiator, since even the worst models get error rates around 0.1%.

A more subtle noising function is the one that just alters a single randomly-chosen character (while obeying the constraints above - e.g. never replacing a padding character past the first one). This is a better differentiator than pure noise. Error rates range from 5.5% to 10.6%. 

[Scatter plots of PL vs. err rate](TODO)

Yet another noising function returns a 'sillhouetted' version of x, preserving the spaces and padding characters, but replacing all the other characters with ones chosen uniformly at random. In terms of differentiation, this one seems strongest, with error rates ranging from 0.4% to 12.1%. 

#### Qualitative Evaluation

Blah blah.

#### Other methods.

Annealed importance sampling, reconstruction error, blah blah.

