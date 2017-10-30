---
layout: post
title: "The size of things: an ngram experiment"
tags: [linguistics]
date: 2017-10-30
custom_css: pd
thumbnail: "/assets/sizeof/sizeofthings.png"
excerpt: Investigating the changing popularity of size analogies in English books. Why was "the size of a pigeon's egg" a common phrase until the late 1800s?
draft: 1
large_img: 1
---


As an author, how do you communicate the size of an object? You probably compare it to some other thing the reader is likely to be familiar with. Take these descriptions of objects from Charles Dickens:

> a cauliflower somewhat larger than a chaise-umbrella

> a bit about the size of a walnut put upon the plate

> a bouquet, the size of a prize cauliflower in his buttonhole

> his potter's wheel - a disc about the size of a dinner-plate

> a massive cameo, in size and shape like the raspberry tart which is ordinarily sold for a penny

The objects that people formed comparisons with during a given time period provide an interesting window into what everyday objects they had on their minds, and what they treated as common knowledge. "the raspberry tart which is ordinarily sold for a penny" would be a pretty unhelpful reference for a modern reader, just as comparisons to credit cards or phone booths would be useless to a reader from 1844.

I used [Google Books' Ngram dataset](https://books.google.com/ngrams) to find the most popular size analogies in English books, and how they've changed from 1800 to today. In this post, I'll explore a few interesting examples of analogies that have gone in or out of fashion, and what kinds of cultural, historical, or linguistic changes they might reveal.

So what do authors most frequently reach for when describing the size of things? Here are the overall top 20, ranked by total number of occurences in books between 1800 and 2008.


![png](/assets/sizeof/writeup_21_0.png)



(As noted in the heading, I restricted my analysis to comparisons taking the form `"the size of a _____"`. For all the gory technical details, check out the appendix at the end.)

Peas seem to be the undisputed champion of size analogies.

<!-- "the size of a pinhead" is pretty hoary, but other than that, the list is actually pretty short on clichés. The ultimate groaner, the breadbox, doesn't even quite make the top 1000. -->

Because the number of books published per year has increased over time, this ranking will tend to favour terms that have been popular in recent years. So for the rest of this post, I'll be normalizing by the amount of text scanned in each year.

Let's look at the top terms for the 19th, 20th, and 21st centuries to get a sense of what's changed over time.




<style  type="text/css" >
    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row0_col0 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row0_col1 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row0_col2 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row1_col0 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row1_col1 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row1_col2 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row2_col0 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row2_col1 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row2_col2 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row3_col0 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row3_col1 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row3_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row4_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row4_col1 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row4_col2 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row5_col0 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row5_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row5_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row6_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row6_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row6_col2 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row7_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row7_col1 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row7_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row8_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row8_col1 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row8_col2 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row9_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row9_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row9_col2 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row10_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row10_col1 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row10_col2 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row11_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row11_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row11_col2 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row12_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row12_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row12_col2 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row13_col0 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row13_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row13_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row14_col0 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row14_col1 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row14_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row15_col0 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row15_col1 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row15_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row16_col0 {
            background-color:  #bebada;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row16_col1 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row16_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row17_col0 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row17_col1 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row17_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row18_col0 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row18_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row18_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row19_col0 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row19_col1 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row19_col2 {
            background-color:  #ffffb3;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row20_col0 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row20_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row20_col2 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row21_col0 {
            background-color:  #f2f2f2;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row21_col1 {
            background-color:  #8dd3c7;
        }    #T_49bf97f0_bd09_11e7_a483_889ffafd94e7row21_col2 {
            background-color:  #f2f2f2;
        }</style>  
<table id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7"  class="table table-condensed dataframe">
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >1800s</th> 
        <th class="col_heading level0 col1" >1900s</th> 
        <th class="col_heading level0 col2" >2000s</th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row0" class="row_heading level0 row0" >1</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row0_col0" class="data row0 col0" >pea</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row0_col1" class="data row0 col1" >pea</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row0_col2" class="data row0 col2" >pea</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row1" class="row_heading level0 row1" >2</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row1_col0" class="data row1 col0" >walnut</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row1_col1" class="data row1 col1" >walnut</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row1_col2" class="data row1 col2" >walnut</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row2" class="row_heading level0 row2" >3</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row2_col0" class="data row2 col0" >pinhead</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row2_col1" class="data row2 col1" >pinhead</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row2_col2" class="data row2 col2" >quarter</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row3" class="row_heading level0 row3" >4</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row3_col0" class="data row3 col0" >egg</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row3_col1" class="data row3 col1" >egg</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row3_col2" class="data row3 col2" >football field</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row4" class="row_heading level0 row4" >5</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row4_col0" class="data row4 col0" >hen's egg</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row4_col1" class="data row4 col1" >orange</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row4_col2" class="data row4 col2" >egg</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row5" class="row_heading level0 row5" >6</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row5_col0" class="data row5 col0" >orange</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row5_col1" class="data row5 col1" >hen's egg</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row5_col2" class="data row5 col2" >grapefruit</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row6" class="row_heading level0 row6" >7</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row6_col0" class="data row6 col0" >hazelnut</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row6_col1" class="data row6 col1" >hazelnut</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row6_col2" class="data row6 col2" >house</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row7" class="row_heading level0 row7" >8</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row7_col0" class="data row7 col0" >pigeon's egg</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row7_col1" class="data row7 col1" >man</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row7_col2" class="data row7 col2" >golf ball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row8" class="row_heading level0 row8" >9</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row8_col0" class="data row8 col0" >shilling</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row8_col1" class="data row8 col1" >fist</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row8_col2" class="data row8 col2" >man</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row9" class="row_heading level0 row9" >10</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row9_col0" class="data row9 col0" >nut</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row9_col1" class="data row9 col1" >bean</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row9_col2" class="data row9 col2" >fist</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row10" class="row_heading level0 row10" >11</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row10_col0" class="data row10 col0" >cherry</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row10_col1" class="data row10 col1" >dime</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row10_col2" class="data row10 col2" >pinhead</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row11" class="row_heading level0 row11" >12</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row11_col0" class="data row11 col0" >bean</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row11_col1" class="data row11 col1" >apple</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row11_col2" class="data row11 col2" >dime</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row12" class="row_heading level0 row12" >13</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row12_col0" class="data row12 col0" >apple</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row12_col1" class="data row12 col1" >cherry</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row12_col2" class="data row12 col2" >orange</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row13" class="row_heading level0 row13" >14</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row13_col0" class="data row13 col0" >sixpence</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row13_col1" class="data row13 col1" >pigeon's egg</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row13_col2" class="data row13 col2" >baseball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row14" class="row_heading level0 row14" >15</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row14_col0" class="data row14 col0" >pigeon</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row14_col1" class="data row14 col1" >quarter</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row14_col2" class="data row14 col2" >postage stamp</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row15" class="row_heading level0 row15" >16</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row15_col0" class="data row15 col0" >goose</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row15_col1" class="data row15 col1" >silver dollar</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row15_col2" class="data row15 col2" >basketball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row16" class="row_heading level0 row16" >17</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row16_col0" class="data row16 col0" >man</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row16_col1" class="data row16 col1" >marble</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row16_col2" class="data row16 col2" >football</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row17" class="row_heading level0 row17" >18</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row17_col0" class="data row17 col0" >nutmeg</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row17_col1" class="data row17 col1" >house</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row17_col2" class="data row17 col2" >deck of cards</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row18" class="row_heading level0 row18" >19</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row18_col0" class="data row18 col0" >pin</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row18_col1" class="data row18 col1" >pin</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row18_col2" class="data row18 col2" >tennis ball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row19" class="row_heading level0 row19" >20</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row19_col0" class="data row19 col0" >millet seed</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row19_col1" class="data row19 col1" >lead pencil</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row19_col2" class="data row19 col2" >silver dollar</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row20" class="row_heading level0 row20" >21</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row20_col0" class="data row20 col0" >cat</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row20_col1" class="data row20 col1" >nut</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row20_col2" class="data row20 col2" >pencil</td> 
    </tr>    <tr> 
        <th id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7level0_row21" class="row_heading level0 row21" >22</th> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row21_col0" class="data row21 col0" >crown piece</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row21_col1" class="data row21 col1" >shilling</td> 
        <td id="T_49bf97f0_bd09_11e7_a483_889ffafd94e7row21_col2" class="data row21 col2" >credit card</td> 
    </tr></tbody> 
</table> 



(Terms are coloured according to the subset of centuries in which they chart.)

"the size of a pea" is consistently the number 1 size comparison from 1800 to present day. Eggs and walnuts also remain consistently popular, but beyond those examples, there's a lot of change from century to century.

Some differences have obvious historical reasons. For example, the shilling was out of circulation by the dawn of the millenium, and credit cards didn't exist in the 19th century. But most are less obvious. Why have we gradually forgetten how big pigeon eggs are? Why is a deck of cards such a distinctly modern point of reference?

Let's dig into some trends and a few specific curiosities.

### Down with nature

One general trend that stands out is a drop over time in references to 'natural' objects.




<style  type="text/css" >
    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row0_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row0_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row0_col2 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row1_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row1_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row1_col2 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row3_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row3_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row4_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row4_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row4_col2 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row5_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row5_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row5_col2 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row6_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row6_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row7_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row9_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row9_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row10_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row11_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row11_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row12_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row12_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row12_col2 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row13_col1 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row14_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row15_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row17_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row19_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row20_col0 {
            background-color:  #9fe0be;
        }    #T_49bf97f1_bd09_11e7_a483_889ffafd94e7row20_col1 {
            background-color:  #9fe0be;
        }</style>  
<table id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7"  class="table table-condensed dataframe">
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >1800s</th> 
        <th class="col_heading level0 col1" >1900s</th> 
        <th class="col_heading level0 col2" >2000s</th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row0" class="row_heading level0 row0" >1</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row0_col0" class="data row0 col0" >pea</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row0_col1" class="data row0 col1" >pea</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row0_col2" class="data row0 col2" >pea</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row1" class="row_heading level0 row1" >2</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row1_col0" class="data row1 col0" >walnut</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row1_col1" class="data row1 col1" >walnut</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row1_col2" class="data row1 col2" >walnut</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row2" class="row_heading level0 row2" >3</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row2_col0" class="data row2 col0" >pinhead</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row2_col1" class="data row2 col1" >pinhead</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row2_col2" class="data row2 col2" >quarter</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row3" class="row_heading level0 row3" >4</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row3_col0" class="data row3 col0" >egg</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row3_col1" class="data row3 col1" >egg</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row3_col2" class="data row3 col2" >football field</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row4" class="row_heading level0 row4" >5</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row4_col0" class="data row4 col0" >hen's egg</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row4_col1" class="data row4 col1" >orange</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row4_col2" class="data row4 col2" >egg</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row5" class="row_heading level0 row5" >6</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row5_col0" class="data row5 col0" >orange</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row5_col1" class="data row5 col1" >hen's egg</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row5_col2" class="data row5 col2" >grapefruit</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row6" class="row_heading level0 row6" >7</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row6_col0" class="data row6 col0" >hazelnut</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row6_col1" class="data row6 col1" >hazelnut</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row6_col2" class="data row6 col2" >house</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row7" class="row_heading level0 row7" >8</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row7_col0" class="data row7 col0" >pigeon's egg</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row7_col1" class="data row7 col1" >man</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row7_col2" class="data row7 col2" >golf ball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row8" class="row_heading level0 row8" >9</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row8_col0" class="data row8 col0" >shilling</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row8_col1" class="data row8 col1" >fist</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row8_col2" class="data row8 col2" >man</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row9" class="row_heading level0 row9" >10</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row9_col0" class="data row9 col0" >nut</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row9_col1" class="data row9 col1" >bean</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row9_col2" class="data row9 col2" >fist</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row10" class="row_heading level0 row10" >11</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row10_col0" class="data row10 col0" >cherry</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row10_col1" class="data row10 col1" >dime</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row10_col2" class="data row10 col2" >pinhead</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row11" class="row_heading level0 row11" >12</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row11_col0" class="data row11 col0" >bean</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row11_col1" class="data row11 col1" >apple</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row11_col2" class="data row11 col2" >dime</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row12" class="row_heading level0 row12" >13</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row12_col0" class="data row12 col0" >apple</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row12_col1" class="data row12 col1" >cherry</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row12_col2" class="data row12 col2" >orange</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row13" class="row_heading level0 row13" >14</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row13_col0" class="data row13 col0" >sixpence</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row13_col1" class="data row13 col1" >pigeon's egg</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row13_col2" class="data row13 col2" >baseball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row14" class="row_heading level0 row14" >15</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row14_col0" class="data row14 col0" >pigeon</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row14_col1" class="data row14 col1" >quarter</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row14_col2" class="data row14 col2" >postage stamp</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row15" class="row_heading level0 row15" >16</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row15_col0" class="data row15 col0" >goose</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row15_col1" class="data row15 col1" >silver dollar</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row15_col2" class="data row15 col2" >basketball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row16" class="row_heading level0 row16" >17</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row16_col0" class="data row16 col0" >man</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row16_col1" class="data row16 col1" >marble</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row16_col2" class="data row16 col2" >football</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row17" class="row_heading level0 row17" >18</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row17_col0" class="data row17 col0" >nutmeg</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row17_col1" class="data row17 col1" >house</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row17_col2" class="data row17 col2" >deck of cards</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row18" class="row_heading level0 row18" >19</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row18_col0" class="data row18 col0" >pin</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row18_col1" class="data row18 col1" >pin</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row18_col2" class="data row18 col2" >tennis ball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row19" class="row_heading level0 row19" >20</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row19_col0" class="data row19 col0" >millet seed</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row19_col1" class="data row19 col1" >lead pencil</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row19_col2" class="data row19 col2" >silver dollar</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row20" class="row_heading level0 row20" >21</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row20_col0" class="data row20 col0" >cat</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row20_col1" class="data row20 col1" >nut</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row20_col2" class="data row20 col2" >pencil</td> 
    </tr>    <tr> 
        <th id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7level0_row21" class="row_heading level0 row21" >22</th> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row21_col0" class="data row21 col0" >crown piece</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row21_col1" class="data row21 col1" >shilling</td> 
        <td id="T_49bf97f1_bd09_11e7_a483_889ffafd94e7row21_col2" class="data row21 col2" >credit card</td> 
    </tr></tbody> 
</table> 



16 of the top 22 terms in the 19th century refer to objects from nature (seeds, fruits, animals, nuts, eggs...), but by the 21st century there are only 5.

### Up with sports

Not a single sports analogy makes the list in the 19th and 20th centuries, but they explode onto the scene in the 21st century: 




<style  type="text/css" >
    #T_49bf97f2_bd09_11e7_a483_889ffafd94e7row3_col2 {
            background-color:  #e5dea5;
        }    #T_49bf97f2_bd09_11e7_a483_889ffafd94e7row7_col2 {
            background-color:  #e5dea5;
        }    #T_49bf97f2_bd09_11e7_a483_889ffafd94e7row13_col2 {
            background-color:  #e5dea5;
        }    #T_49bf97f2_bd09_11e7_a483_889ffafd94e7row15_col2 {
            background-color:  #e5dea5;
        }    #T_49bf97f2_bd09_11e7_a483_889ffafd94e7row16_col2 {
            background-color:  #e5dea5;
        }    #T_49bf97f2_bd09_11e7_a483_889ffafd94e7row18_col2 {
            background-color:  #e5dea5;
        }</style>  
<table id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7"  class="table table-condensed dataframe">
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >1800s</th> 
        <th class="col_heading level0 col1" >1900s</th> 
        <th class="col_heading level0 col2" >2000s</th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row0" class="row_heading level0 row0" >1</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row0_col0" class="data row0 col0" >pea</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row0_col1" class="data row0 col1" >pea</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row0_col2" class="data row0 col2" >pea</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row1" class="row_heading level0 row1" >2</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row1_col0" class="data row1 col0" >walnut</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row1_col1" class="data row1 col1" >walnut</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row1_col2" class="data row1 col2" >walnut</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row2" class="row_heading level0 row2" >3</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row2_col0" class="data row2 col0" >pinhead</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row2_col1" class="data row2 col1" >pinhead</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row2_col2" class="data row2 col2" >quarter</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row3" class="row_heading level0 row3" >4</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row3_col0" class="data row3 col0" >egg</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row3_col1" class="data row3 col1" >egg</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row3_col2" class="data row3 col2" >football field</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row4" class="row_heading level0 row4" >5</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row4_col0" class="data row4 col0" >hen's egg</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row4_col1" class="data row4 col1" >orange</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row4_col2" class="data row4 col2" >egg</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row5" class="row_heading level0 row5" >6</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row5_col0" class="data row5 col0" >orange</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row5_col1" class="data row5 col1" >hen's egg</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row5_col2" class="data row5 col2" >grapefruit</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row6" class="row_heading level0 row6" >7</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row6_col0" class="data row6 col0" >hazelnut</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row6_col1" class="data row6 col1" >hazelnut</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row6_col2" class="data row6 col2" >house</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row7" class="row_heading level0 row7" >8</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row7_col0" class="data row7 col0" >pigeon's egg</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row7_col1" class="data row7 col1" >man</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row7_col2" class="data row7 col2" >golf ball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row8" class="row_heading level0 row8" >9</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row8_col0" class="data row8 col0" >shilling</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row8_col1" class="data row8 col1" >fist</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row8_col2" class="data row8 col2" >man</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row9" class="row_heading level0 row9" >10</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row9_col0" class="data row9 col0" >nut</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row9_col1" class="data row9 col1" >bean</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row9_col2" class="data row9 col2" >fist</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row10" class="row_heading level0 row10" >11</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row10_col0" class="data row10 col0" >cherry</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row10_col1" class="data row10 col1" >dime</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row10_col2" class="data row10 col2" >pinhead</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row11" class="row_heading level0 row11" >12</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row11_col0" class="data row11 col0" >bean</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row11_col1" class="data row11 col1" >apple</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row11_col2" class="data row11 col2" >dime</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row12" class="row_heading level0 row12" >13</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row12_col0" class="data row12 col0" >apple</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row12_col1" class="data row12 col1" >cherry</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row12_col2" class="data row12 col2" >orange</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row13" class="row_heading level0 row13" >14</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row13_col0" class="data row13 col0" >sixpence</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row13_col1" class="data row13 col1" >pigeon's egg</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row13_col2" class="data row13 col2" >baseball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row14" class="row_heading level0 row14" >15</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row14_col0" class="data row14 col0" >pigeon</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row14_col1" class="data row14 col1" >quarter</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row14_col2" class="data row14 col2" >postage stamp</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row15" class="row_heading level0 row15" >16</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row15_col0" class="data row15 col0" >goose</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row15_col1" class="data row15 col1" >silver dollar</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row15_col2" class="data row15 col2" >basketball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row16" class="row_heading level0 row16" >17</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row16_col0" class="data row16 col0" >man</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row16_col1" class="data row16 col1" >marble</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row16_col2" class="data row16 col2" >football</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row17" class="row_heading level0 row17" >18</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row17_col0" class="data row17 col0" >nutmeg</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row17_col1" class="data row17 col1" >house</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row17_col2" class="data row17 col2" >deck of cards</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row18" class="row_heading level0 row18" >19</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row18_col0" class="data row18 col0" >pin</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row18_col1" class="data row18 col1" >pin</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row18_col2" class="data row18 col2" >tennis ball</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row19" class="row_heading level0 row19" >20</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row19_col0" class="data row19 col0" >millet seed</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row19_col1" class="data row19 col1" >lead pencil</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row19_col2" class="data row19 col2" >silver dollar</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row20" class="row_heading level0 row20" >21</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row20_col0" class="data row20 col0" >cat</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row20_col1" class="data row20 col1" >nut</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row20_col2" class="data row20 col2" >pencil</td> 
    </tr>    <tr> 
        <th id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7level0_row21" class="row_heading level0 row21" >22</th> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row21_col0" class="data row21 col0" >crown piece</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row21_col1" class="data row21 col1" >shilling</td> 
        <td id="T_49bf97f2_bd09_11e7_a483_889ffafd94e7row21_col2" class="data row21 col2" >credit card</td> 
    </tr></tbody> 
</table> 



Most of the referenced sports weren't invented until around the turn of the century, so it isn't surprising they didn't make the pre-1900 list. But it's not like they didn't have any sports in the 19th century. Why weren't analogies to golf balls or cricket balls popular back then?

<!-- It's tempting to connect this to the decline in plants and animals. Blah blah. -->

<!-- https://books.google.com/ngrams/graph?content=%28size+of+a+football+-+size+of+a+football+field%29%2Csize+of+a+baseball%2Csize+of+a+basketball%2Csize+of+a+golf+ball%2Csize+of+a+tennis+ball%2Csize+of+a+cricket+ball&year_start=1800&year_end=2008&corpus=15&smoothing=20&share=&direct_url=t1%3B%2C%28size%20of%20a%20football%20-%20size%20of%20a%20football%20field%29%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20baseball%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20basketball%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20golf%20ball%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20tennis%20ball%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20cricket%20ball%3B%2Cc0 -->

<iframe class="ngramchart" name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=%28size+of+a+football+-+size+of+a+football+field%29%2Csize+of+a+baseball%2Csize+of+a+basketball%2Csize+of+a+golf+ball%2Csize+of+a+tennis+ball%2Csize+of+a+cricket+ball&year_start=1800&year_end=2008&corpus=15&smoothing=20&share=&direct_url=t1%3B%2C%28size%20of%20a%20football%20-%20size%20of%20a%20football%20field%29%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20baseball%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20basketball%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20golf%20ball%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20tennis%20ball%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20cricket%20ball%3B%2Cc0"   marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>

This provides circumstantial evidence that people in the English-speaking world are at least thinking about sports a lot more than they did 1 or 2 generations ago. If that's true, is it being driven by increases in leisure time allowing more people to play? Or advances in mass media that have made it easier to watch professional sports? That sounds like a question for a sociologist.

### The decline of pigeon eggs

Pigeon eggs were an astonishingly common benchmark for comparisons in the 19th century, ranking 8th (with "size of a pigeon" at number 15). But they experienced a sharp drop in the late 19th century and a gradual decline thereafter.

<img src="/assets/sizeof/pigeonsegg.png" />

Why was everyone familiar with the size of pigeon eggs in the 1800s? I've lived in cities with lots of pigeons and never seen one of their eggs. 

If you're skeptical, you can browse some examples from Google Books [here](https://www.google.ca/search?q=%22size+of+a+pigeon%27s%22&tbm=bks&lr=lang_en&gws_rd=cr&dcr=0&ei=ACLyWZqTNMbejwTiqaEQ). It's not that this time period has an extraordinary number of books on ornithology. The comparison occurs frequently in technical texts on areas like medicine, botany and geology. But it also occurs in books aimed at non-technical audiences (e.g. [a Jules Verne novel](https://books.google.ca/books?id=TMqzAwAAQBAJ&pg=PT101&dq=%22size+of+a+pigeon%27s%22&hl=en&sa=X&ved=0ahUKEwi5tfql7o7XAhUK6IMKHfIuCqg4ggEQ6AEITjAH#v=onepage&q=%22size%20of%20a%20pigeon's%22&f=false), or [The Practice of Cookery: Adapted to the Business of Every Day Life](https://books.google.ca/books?id=y6N2cnCzajUC&pg=PA477&dq=%22size+of+a+pigeon%27s%22&hl=en&sa=X&ved=0ahUKEwiw_buR7o7XAhUl3YMKHdpsCJ84WhDoAQgsMAE#v=onepage&q=%22size%20of%20a%20pigeon's%22&f=false) by one "Mrs. Dalgairns").

This was hugely baffling to me, until I remembered [that *other* pigeon](https://en.wikipedia.org/wiki/Passenger_pigeon).

<img src="/assets/sizeof/passenger_pigeon_shoot.jpg" />

Passenger pigeons were once the most abundant bird in North America - flocks (like the one illustrated above) were described as blocking out the sun. The [wiki article](https://en.wikipedia.org/wiki/Passenger_pigeon) is full of vivid descriptions of their abundance and the extravagance with which they were hunted:

> Passenger pigeons were shot with such ease that many did not consider them to be a game bird, as an amateur hunter could easily bring down six with one shotgun blast; a particularly good shot with both barrels of a shotgun at a roost could kill 61 birds.

> The pigeon was considered so numerous that 30,000 birds had to be killed to claim the prize in one competition.

And this particularly relevant one regarding nesting sites:

> Nearly every tree capable of supporting nests had them, often more than 50 per tree; one hemlock was recorded as holding 317 nests.

Of course, their story doesn't have a happy ending. As a result of overhunting and deforestation, by the 1870's their numbers had noticeably declined, and they were virtually extinct in the wild by the 1890's. Concurrently, "size of a pigeon's egg" analogies began their own slow march toward extinction.

<!-- size of a hen's egg -->

### The size of a nutmeg?

This one is pretty baffling.

<iframe class="ngramchart" name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=size+of+a+nutmeg&year_start=1800&year_end=2008&corpus=15&smoothing=5&share=&direct_url=t1%3B%2Csize%20of%20a%20nutmeg%3B%2Cc0"   marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>

This is consistent with the general observation that terms from nature have declined over time. We generally spend less time making food than our ancestors did, so nuts and spices are less likely to be at the forefront of our minds than golf balls and quarters. But this dramatic, steep decline isn't experienced by walnuts or hazelnuts or even the relatively obscure millet seed.

Another curious aspect here is that nutmeg is treated as a count noun ("a nutmeg") rather than a mass noun ("some nutmeg", "a teaspoon of nutmeg"). To my ear, this sounds utterly bizarre, though it seems like it's not entirely archaic. <!-- When referring to the hard spherical things you grate to get nutmeg, the [Wikipedia article](https://en.wikipedia.org/wiki/Nutmeg) alternates between "nutmegs" and "nutmeg seeds".--><!--("size of a nutmeg seed" doesn't even appear in the Google ngram data, meaning it hasn't reached the threshold of 40 occurences. "size of a nutmeg" appears 4,500 times) --> The [Corpus of Contemporary American English](https://corpus.byu.edu/coca/) turns up 8 hits each for "a nutmeg" and "nutmegs" (vs. 1700 for "nutmeg"). For example, this passage from a [2012 Washington Post article](https://www.washingtonpost.com/lifestyle/food/pie-a-la-mcdermott-mode-or-how-to-know-when-dessert-is-done/2012/07/09/gJQAZnp9aW_story.html):

> Important additions: a squeeze of lemon juice and two — no more — Microplaned swipes of a nutmeg. Those go into every fruit pie, she says.

Or this exchange from a 2001 episode of the Oprah Winfrey Show (condensed to remove some crosstalk):

> WINFREY: OK. What are you doing?  
> Ms-KOSTYRA: I'm grating a nutmeg. The two most popular flavorings for apple pie are cinnamon, nutmeg.  
> WINFREY: And you can grate it. I thought you bought it in a little jar that -- that you -- that...  
> Ms-KOSTYRA: Well, it's fresh.  
> WINFREY: You can buy fresh nutmeg?  

This actually speaks to how unhelpful "it was the size of a nutmeg" might be today. Oprah is used to buying jars of grated nutmeg. She, and many others, might not even know what a whole nutmeg seed looks like. Maybe the sale of grated nutmeg killed "size of a nutmeg" analogies? (Though I suspect the reality is more complicated.)

(An unrelated but delightful discovery: the Oxford English Dictionary lists "nutmegs" as obsolete slang for testicles and offers this as the origin of the slang "nuts". The earliest quotation it offers, "I'll immediately whip out your nutmegs, he cry'd" comes from a bawdy 1690 song, [The Lancashire Cuckold: OR, THE Country Parish-Clark betrayd by a Conjurers Inchanted Chamber-pot.](https://ebba.english.ucsb.edu/ballad/31958/xml))

### Pencils and lead pencils

"pencil" charts only in the 21st century. It's preceded by the curious "lead pencil" which peaked in popularity in the early 20th century.

<!-- size of a pencil,size of a lead pencil -->
<iframe class="ngramchart" name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=size+of+a+pencil%2Csize+of+a+lead+pencil&year_start=1800&year_end=2008&corpus=15&smoothing=3&share=&direct_url=t1%3B%2Csize%20of%20a%20pencil%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20lead%20pencil%3B%2Cc0"   marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>

What gives? It turns out that ["pencil"](https://en.wiktionary.org/wiki/pencil#Noun) used to refer to a small, fine paintbrush used for writing. The writing tool we're familiar with today was originally termed a "lead pencil" because of its similar appearance and purpose. As this new tool gained popularity, the name was shortened and the original pencil faded from memory.


Before the popularization of lead pencils, goose quills may have filled a similar niche (in analogies as in reality).

<iframe class="ngramchart" name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=size+of+a+pencil%2Csize+of+a+lead+pencil%2Csize+of+a+goose+quill&year_start=1800&year_end=2008&corpus=15&smoothing=3&share=&direct_url=t1%3B%2Csize%20of%20a%20pencil%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20lead%20pencil%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20goose%20quill%3B%2Cc0"   marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>

### The modernity of decks of cards

Here's a graph that I found pretty surprising:

<iframe class="ngramchart" name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=deck+of+cards&year_start=1800&year_end=2008&corpus=15&smoothing=5&share=&direct_url=t1%3B%2Cdeck%20of%20cards%3B%2Cc0"   marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>

Playing cards have been around for ages, but referring to collections of them as 'decks' seems to be a distinctly 20th century (late 20th-century, even) habit. Before that, 'pack' was the standard nomenclature:

<iframe class="ngramchart" name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=deck+of+cards%2Cpack+of+cards&year_start=1800&year_end=2008&corpus=15&smoothing=5&share=&direct_url=t1%3B%2Cdeck%20of%20cards%3B%2Cc0%3B.t1%3B%2Cpack%20of%20cards%3B%2Cc0"   marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>


Though actually, the story has some more wrinkles than that. 'Deck of cards' has a long history, and was in fact popular in Early Modern English (far enough back that Google Books ngrams has spotty coverage). Here's an example from Shakespeare's *King Henry VI*:

> But, whiles he thought to steal the single ten,  
> The king was slily finger'd from the deck!

But at some point this usage fell out of favour and drifted into obscurity. An [1826 edition](https://books.google.ca/books?id=RCA4AQAAMAAJ&dq=%22of%20cards%22&pg=PA557#v=onepage&q&f=false) of the play has the following footnote explaining the above passage:

> A pack of cards was anciently termed *a deck of cards*, or *a pair of cards*, and this is still in use in some parts.

A similar explanation is given in 1886's [A Glossary of Obscure Words and Phrases in the Writings of Shakspeare and His Contemporaries ...](https://archive.org/details/aglossaryobscur00mackgoog), so the phrase must have remained obscure to a common audience until at least the late 19th century.

(And yes, you read that footnote right. At some time, in some place, people thought it was a fine idea to call a collection of 52 cards "a pair of cards". According to the OED, this usage still exists today "Now chiefly Brit. regional and Irish English (north.)")

<br/>

That concludes our survey of weird trends in size analogies. I hope you enjoyed it. If you're interested in some of the technical details of how I performed this analysis, feel free to read on. The code used for this analysis is available on GitHub [here](https://github.com/colinmorris/size-of-an-x). That repo includes a [csv file](https://github.com/colinmorris/size-of-an-x/blob/master/sizeofthings.csv) with stats on around 4,000 "size of a..." phrases, if you're interested in investigating some more obscure size analogies.

## Appendix: Methodology

For this analysis I used the most recent English [Google Books ngram data](https://books.google.com/ngrams/datasets). I downloaded all 4-grams and 5-grams beginning with 'si' and grepped for `size of an? *`.

Below are a few details and caveats are worth mentioning.

### Non-figurative phrases

Sometimes "the size of an X" is an actual object of discussion, e.g.:

> Excessive magnification of the size of an image can make it difficult to recognize what real object it represents.

Fortunately, there is a pretty clean division between objects that are used in those contexts, and objects used for comparison. There are very few earnest discussions of the size of a pea or the size of a pin's head. And images, networks, and families are rarely referenced when making size comparisons.

I manually curated a list of objects that are mostly used non-figuratively, and excluded them from the analysis. Most of them are computer terms (object, image, partition, array...). The only phrase listed in the high-score table above having a non-trivial proportion of non-figurative uses is "house" (my back-of-the-envelope estimate is that around 10% of "size of a house"s are non-figurative).

### 4-grams, 5-grams and disambiguation

You may notice that some objects are unigrams (single words like "pea") and some are bigrams (two-word phrases like "football field").

I used 4-gram data ("size of a X") as a starting point to get unigram counts for different values of X, and extended the results as necessary using 5-grams ("size of a X Y").

Some tokens were partially extended. For example, "football" followed by any of "field", "pitch", "player", or "stadium" were each treated as distinct objects. The remaining counts for "size of a football" (after subtracting the counts for "size of a football field" etc.) went to the "football" object.

If a token could not stand alone as an object, it was fully split. For example, "the size of a tea" is not a meaningful phrase, so I ignored the count for the "tea" unigram, and separately counted all bigrams beginning with "tea" (tea chests, tea plates, tea saucers, tea trays...).

In some cases, even a bigram couldn't stand alone as a meaningful object - e.g. "deck of". In most cases, there was a unique larger phrase that the bigram unambiguously prefixed (e.g. "deck of cards" in the previous example). Where possible, I filled in these completions transparently.

In a few rare cases, the completion was ambiguous. The two most common bigrams with this problem were "grain of" and "man's" (in the Google Books ngram data, this is tokenized as `["man", "'s"]`). I applied a quick hack to patch up these two cases. I looked at 5-grams matching "as a man 's X" and "as a grain of X" to calculate the distribution of completions. I then divided the bigram counts for "man's" and "grain of" into trigrams according to the distribution of those completions. (e.g. if 50% of X's were "mustard" in "as a grain of X" in 1958, and "size of a grain of" had 800 appearances in 1958, "size of a grain of mustard" would be recorded with 400 appearances in 1958).

### Orthographic variations

I merged together the counts for minor orthographic variations of the same phrase. For example, "a pin's head", "a pin head", and "a pinhead". Though not the focus of my analysis, the changes in spelling of a term over time can occasionally be quite dramatic:

<img src="/assets/sizeof/pinheads.png" />

I didn't merge significantly different surface realizations of the same object, e.g. {"an egg", "a hen's egg"}, or {"a hazelnut", "a filbert"}.

I curated a small set of common, innocuous adjectives like "small", "large", "ordinary", "standard". I merged counts for bigrams matching "&lt;adjective&gt; X" into X - e.g. the counts for "the size of an ordinary apple" are counted under "apple".

Without these merging heuristics, the results are not appreciably different. One interesting feature of the ranking of 'raw' terms: such is the primacy of peas that they would appear 3 times in the top 20: 1. pea, 12. small pea, 18. large pea.

### Normalization

As mentioned earlier, later years have more scanned books, so measuring a phrase's popularity by its raw counts will tend to put a disproportionate weight on recent years. It would be nice to come up with a metric that doesn't have this problem, but that turns out to be surprisingly difficult.

The most obvious solution (and the one used in the [Ngram Viewer](https://books.google.com/ngrams) charts) is to normalize each year's counts by the number of words scanned in that year. i.e. what % of all n-grams in a given year are "size of a goose" or whatever. This was in fact the solution I used, but there's a subtle problem with it.

Here are the most common analogies from the 19th and 21st centuries, with their relative frequency plotted on the same scale:

<img src="/assets/sizeof/sizeofthings_labeled_toscale.png" />

The most common analogies in the 19th century are far more frequent than those in the 21st century. It's not that the latter has a flatter distribution - i.e. a greater diversity of analogies. As a whole, there are far fewer "size of a" analogies per page in the 21st century than in the 19th.

One reason for this could be shifting genre distributions. Some genres, like fiction, or technical writing on natural history or medicine tend to have lots of size analogies ("patient presented with a tumour the size of a golf ball"). Books about tax law, psychology, or algebra are unlikely to do much describing of the sizes of objects. 

If "size of a pea" is .001% of 4-grams in 1900 and .0005% of 4-grams in 2000, we might conclude that peas became a less popular size reference in that time span. But if 1900 has twice as many size analogies per page as 2000, then our conclusion is spurious - of the times people compared the size of something to something else, they chose peas as that something else the same % of the time in 1900 as in 2000.

One solution to *that* problem would be to normalize by the total counts of "size of a(n)" per year. The problem with this is that, as noted earlier, not all occurences of that phrase correspond to size analogies. And recent years have a much higher rate of non-figurative phrases ("the size of a file", "the size of a disk", "the size of an array").

Another solution is to fix a single genre. Google offers an 'English fiction' version of the ngram dataset.

<iframe class="ngramchart" name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=size+of+a+walnut%3Aeng_fiction_2012%2Csize+of+a+walnut%3Aeng_2012&year_start=1800&year_end=2008&corpus=16&smoothing=3&share=&direct_url=t1%3B%2Csize%20of%20a%20walnut%3Aeng_fiction_2012%3B%2Cc0%3B.t1%3B%2Csize%20of%20a%20walnut%3Aeng_2012%3B%2Cc0"   marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>

Whereas the default corpus of all books gives the impression that walnut analogies have dropped over time, they've remained pretty flat in the fiction corpus (which is probably closer to the reality we're trying to capture, since walnuts been consistently the second-most popular analogy in each of the 19th, 20th, and 21st centuries).

Unfortunately, while fiction is about 25% of the dataset in recent years, until the late 20th century, it comprises quite a small proportion of books scanned per year.


![png](/assets/sizeof/writeup_42_0.png)


For most of the 19th century, there are just a few hundred books per year. Which is nothing to sneeze at, but insufficient to statistically analyse these kinds of linguistic needles in a haystack.

So the simplest approach to normalization is probably the least of all evils. The good news is that, whatever bias is baked into our measurement, it applies evenly to all terms. So if "deck of cards" shoots up during a time when "pack of cards" falls, we can at least be confident that the former is growing in popularity relative to the latter. But we should be a bit cautious in interpreting the shape of a single phrase's usage over time. 

### More ngram dataset caveats

Another contributor to the apparent overall decline over time of all our analogies is what Alberto Acerbi calls the "recent-trash" argument in his post about [normalization biases in Google ngram data](https://acerbialberto.com/2013/04/14/normalisation-biases-in-google-ngram/) (which is an excellent read). This is the claim that recent books have a higher ratio of junk (data, formulas, special characters) to 'real' words or sentences, which leads to an overall bias toward declining frequency for legitimate words and phrases.

[This paper](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0137041) makes a couple interesting arguments for why we should be skeptical of cultural or linguistic trends inferred from the dataset:

1. It imposes a sort of false democracy by counting each book equally, regardless of its popularity. A hack writer churning out reams of obscure pulp fiction could have an outsized influence. The impact of a term from a single widely-read book or series (e.g. "Frodo") could be underestimated.
2. An increase in the proportion of academic articles in recent years, creating trends toward academic language not reflective of general usage. (Though not a part of the paper's claims, this seems relevant to the recent-trash argument).

Anecdotally, I've observed something like the opposite of 1. Popular stories are reprinted, serialized, anthologized and excerpted, with the effect that each of their n-grams are counted many times over. One of my favourite analogies found in the dataset was "the size of a fine cauliflower", which appears 73 times between 1800 and 2008. But it turns out [every single one](https://www.google.ca/search?q=%22size+of+a+fine+cauliflower%22&tbm=bks&lr=lang_en&gws_rd=cr&dcr=0&ei=dNv0WbL9IKyPjwSFlJHYCw) is from the same sentence in Charles Dickens' [Pictures From Italy](https://en.wikipedia.org/wiki/Pictures_from_Italy). (Yes, the same Dickens who has two further cauliflower analogies quoted at the top of this post. Dude would not shut up about cauliflowers.)

In addition to overcounting, this phenomenon leads to another problem:

<iframe class="ngramchart" name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=size+of+a+fine+cauliflower&year_start=1800&year_end=2008&corpus=15&smoothing=3&share=&direct_url=t1%3B%2Csize%20of%20a%20fine%20cauliflower%3B%2Cc0"   marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>

Fine cauliflowers peaked in the mid-1800s when *Pictures From Italy* was first published, but they pop up all through the 20th century and beyond. Books are associated with their year of publication, but a story written in 1846 reprinted in 2008 is not at all reflective of language use in the 2000s.

I haven't made any attempt to estimate the size of these effects (but it'd be an interesting experiment to try!).

<br/>
