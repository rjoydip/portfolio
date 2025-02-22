---
idOnly: true
title: Nodejs Thread Pool
description: How does the thread pool work in Node.js?
pubDate: Sep 25, 2018
---
## How does the thread pool work in Node.js?

Many parts make Node.js. One important part is asynchronous I/O — [libuv](http://libuv.org).

## Threading in Node.js

In Node, there are two types of threads:

1. **Event Loop** (aka the main loop, the main thread, event thread, etc.)
2. **Worker Pool** (a pool of 4 Workers, aka the thread pool)

The **libuv** library maintains a pool of threads that are used by Node.js to perform long-running operations in the background, without blocking its main thread.

### Purpose of the Worker Pool

Node uses the Worker Pool to handle "expensive" tasks. This includes:

- I/O operations for which an operating system does not provide a non-blocking version.
- CPU-intensive tasks.

### Work Request Execution Flow

1. Convert V8 JavaScript objects (Numbers, Strings, etc.) to their C/C++ representations.
2. Pack them into a struct (since V8 is not thread-safe, this should be done before running the function).
3. Run the function on a separate thread.
4. After execution, libuv calls another function in the main thread with the results.
5. Wrap the results back into V8 objects and call the JavaScript callback.

When at least one thread in the thread pool is idle, the first work request from the queue is assigned to that thread. Otherwise, work requests wait for a thread to become available.

## Thread Pool Size and Execution

The default size of libuv's thread pool is **4**. This explains why, out of 6 calls to `fs.readdir()`, two of them finished after two seconds instead of one. Since all threads were busy for a whole second (waiting on `sleep()`), the remaining tasks had to wait for a free thread, leading to a delay.

Under normal conditions, without artificial slowdowns, this wouldn't be noticeable. However, in some cases, it might be more evident.

### Simplified Execution Flow Diagram

<figure>
  <img src="/images/nodejs-thread-pool-1.png" alt="Simplified Execution Flow Diagram" class="border base rounded-xl">
  <figcaption>Simplified Execution Flow Diagram</figcaption>
</figure>

### libuv Architecture

<figure>
  <img src="/images/nodejs-thread-pool-2.png" alt="libuv Architecture" class="border base rounded-xl">
  <figcaption>The architecture of libuv — source: <a href="http://docs.libuv.org" target="_blank">The architecture of libuv</a></figcaption>
</figure>

### Configuring Thread Pool Size

The default **UV_THREADPOOL_SIZE** is **4**, but it can be changed at startup by setting the environment variable:

```sh
export UV_THREADPOOL_SIZE=8
```

The absolute maximum value is **1024**.

## Why is the Event Loop Needed if the Worker Pool Handles Async Tasks?

- The **event loop** executes JavaScript and orchestrates some asynchronous operations (e.g., sending/receiving network traffic, depending on OS support and libuv).
- The **worker pool** handles asynchronous I/O operations where kernel support is weak (e.g., file system and DNS operations) and CPU-bound tasks in core modules (e.g., `zlib` for compression, `crypto` for cryptography).

### Example

```js
const {readdir} = require('node:fs');

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
