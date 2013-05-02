---
layout: post
title: "Calculating pizza price efficiency in Python"
description: ""
category: 
tags: [python, recipes, pizza]
---
{% include JB/setup %}

Maybe it's a bad idea to code while hungry. Last night I decided to order pizza, and took my usual step of calculating the price per square inch for different size options (price/inch^2 usually decreases monotonically from smallest pizza to largest, but not always, and it's often far from a linear progression). I stumbled on this code snippet from a site called ["codinghax"](http://codinghax.com/python-source-code-calculate-the-cost-per-square-inch-of-a-pizza/):

{% highlight python %}
    from math import * 
    def main():
        diam = eval(input('What is the diameter of the whole pizza? '))
        price = eval(input("What is the price of the pizza? "))
        rad = diam/2
        area = (pi) * (pow(rad,2)) 
        ans = area/price
        print("The cost per square inch is ", ans)
    main()
{% endhighlight %}

What's wrong with this code? If you said one of:

* it has a star import
* `eval` is unsafe
* it doesn't fail gracefully on bad user input
* it adds unnecessary, [anti-PEP-8](http://www.python.org/dev/peps/pep-0008/) parentheses
* it doesn't account for the variable crust:non-crust ratio across different sizes of pizza

Then you're probably failing to see the forest for the trees. This code calculates the number of square inches per dollar, whereas we want the reciprocal of that. 

So that this is more than just complaining, here's code that rectifies *all* of the above issues:

{% highlight python %}
import math

def price_per_squinch(diameter, price):
    rad = diameter/2.0
    area = math.pi * rad**2
    return price/area
    
def price_per_squinch_crusthater(diameter, price, crustwidth=1):
    """Return the price per square inch of a pizza with the given diameter and
    price, excluding the crust with width specified.
    """
    delicious_diam = min(0, diameter - (crustwidth * 2))
    return price_per_squinch(delicious_diam, price)
    

def prompt_bool(prompt_text):
    while 1:
        inp = raw_input(prompt_text)
        if inp in 'yYnN':
            return inp in 'yY'
        else:
            print 'Choose Y or N please.'
            
def prompt_float(prompt_text):
    while 1:
        inp = raw_input(prompt_text)
        try:
            return float(inp)
        except ValueError:
            print 'Please enter a number with no symbols other than digits and a decimal point.'
                

def main():
    print "Welcome to the Python Pizza Price Pcalculator"
    likes_crusts = prompt_bool("Do you like crusts? (Y/N) ")
    price_fn = price_per_squinch if likes_crusts else price_per_squinch_crusthater
    while 1:
        diam = prompt_float("What is the diameter of the pizza? ")
        price = prompt_float("What is the price of the pizza? ")
        
        try:
            ppsq = price_fn(diam, price)
        except ZeroDivisionError:
            print "Price per square inch is undefined. Your pizza is either 0-dimensional, or you don't like crusts and it's completely crusty."
            continue
        print "The price per square inch is %.2f" % (ppsq)
        
        print "Let's calculate the cost of another pizza!"


if __name__ == '__main__':
    main()
{% endhighlight %}
