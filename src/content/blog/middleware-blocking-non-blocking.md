---
idOnly: true
title: Middleware Blocking and Non Blocking
description: How blocking and non-blocking works inside middleware?
pubDate: Sep 30, 2018
---

## How does it work?

**Blocking:** If you do some `synchronus` tasks in middleware before sending a response. Mean time no others request will be accepted.

**Non-blocking:** If you do some `asynchronus` tasks in middleware server will accept other requests once tasks completed it entrance into routes and send a response to the client.

Here is the source code: [rjoydip-zz/middleware-blocking-non-blocking](https://github.com/rjoydip-zz/middleware-blocking-non-blocking)
