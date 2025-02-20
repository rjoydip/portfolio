---
idOnly: true
title: Nodejs Threadpool
description: How does the thread pool work in Node.js?
pubDate: Sep 25, 2018
---

# How does the thread pool work in Node.js?

Many parts make Node.js. One important part is asynchronous I/O — [libuv](https://github.com/libuv/libuv).

## Threading in Node.js

In Node, there are two types of threads:

1. **Event Loop** (aka the main loop, the main thread, event thread, etc.)
2. **Worker Pool** (a pool of 4 Workers, aka the thread pool)

The **libuv** library maintains a pool of threads that are used by Node.js to perform long-running operations in the background, without blocking its main thread.

## Purpose of the Worker Pool

Node uses the Worker Pool to handle "expensive" tasks. This includes:

- I/O operations for which an operating system does not provide a non-blocking version.
- CPU-intensive tasks.

## Work Request Execution Flow

1. Convert V8 JavaScript objects (Numbers, Strings, etc.) to their C/C++ representations.
2. Pack them into a struct (since V8 is not thread-safe, this should be done before running the function).
3. Run the function on a separate thread.
4. After execution, libuv calls another function in the main thread with the results.
5. Wrap the results back into V8 objects and call the JavaScript callback.

When at least one thread in the thread pool is idle, the first work request from the queue is assigned to that thread. Otherwise, work requests wait for a thread to become available.

## Thread Pool Size and Execution

The default size of libuv's thread pool is **4**. This explains why, out of 6 calls to `fs.readdir()`, two of them finished after two seconds instead of one. Since all threads were busy for a whole second (waiting on `sleep()`), the remaining tasks had to wait for a free thread, leading to a delay.

Under normal conditions, without artificial slowdowns, this wouldn't be noticeable. However, in some cases, it might be more evident.

## Configuring Thread Pool Size

The default **UV_THREADPOOL_SIZE** is **4**, but it can be changed at startup by setting the environment variable:

```bash
export UV_THREADPOOL_SIZE=8
```

The absolute maximum value is **128**.

## Why is the Event Loop Needed if the Worker Pool Handles Async Tasks?

- The **event loop** executes JavaScript and orchestrates some asynchronous operations (e.g., sending/receiving network traffic, depending on OS support and libuv).
- The **worker pool** handles asynchronous I/O operations where kernel support is weak (e.g., file system and DNS operations) and CPU-bound tasks in core modules (e.g., `zlib` for compression, `crypto` for cryptography).

## When you need to set value to "UV_THREADPOOL_SIZE"?

- Libuv has a default thread pool size of **4**, and uses a queue to manage access to the thread pool - the upshot is that if you have 5 
long-running DB queries all going at the same time, one of them (and any other asynchronous action that relies on the thread pool) will be 
waiting for those queries to finish before they even get started.

- Note, however, that tuning `UV_THREADPOOL_SIZE` may make more sense for a standalone application like a CLI written in Node.js. If you are standing up a bunch of Node.js processes using the cluster module then I would be surprised if tuning `UV_THREADPOOL_SIZE` was particularly beneficial for you. But if your application resembles the web tooling benchmarks then tuning `UV_THREADPOOL_SIZE` may help with performance.

### Example

```js
const {readdir} = require('fs');

process.env.UV_THREADPOOL_SIZE = 6; // This will work

readdir('.', () => {
    process.env.UV_THREADPOOL_SIZE = 20; // This won't
});

[1,2,3].forEach(element => {
    process.env.UV_THREADPOOL_SIZE = 7; // This will work because this isn't a async task
});

process.stdout.write("[UV_THREADPOOL_SIZE]", process.env.UV_THREADPOOL_SIZE);

// Note: You cannot change the size of the thread pool once it is created or entered in the event-loop/worker-thread.

// npm-script: cross-env UV_THREADPOOL_SIZE=5 node index
// install "cross-env" as devDependencies
```

### Tags

`JavaScript` • `Node` • `Thread Pool` • `Asynchronous`
