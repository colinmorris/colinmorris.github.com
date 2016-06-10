---
layout: post
title: "Fantastic beasts of SQLAlchemy and where to find them"
categories: python sqlalchemy naming
---

I'm a big fan of fruity class names. (Working on a graph traversal problem a couple weeks, I defined a `DestituteWormException` \- try to figure that one out). So I was quite pleased to discover that SQLAlchemy internally uses a class called [\_ConnectionFairy](http://docs.sqlalchemy.org/ru/latest/core/events.html#sqlalchemy.events.PoolEvents.checkout). Delightful!

If you're curious, a \_ConnectionFairy ["proxies a DB-API connection and provides return-on-dereference support."](http://sqlalchemy.sourcearchive.com/documentation/0.6.0/classsqlalchemy_1_1pool_1_1__ConnectionFairy.html). A Disney adaptation is surely in the works.
