# fungus

A functional programming library implemented in ES6.


###### Build Status

Branch | Node | Browser | Coverage
---    | ---  | ---     | ---
master | [![Master - Node build status][master-travis-image]][master-travis-url] | [![Master - Browser build status][master-coveralls-image]][master-coveralls-url] | [![Master - Coverage][master-coveralls-image]][master-coveralls-url]
master | [![Dev - Node build status][dev-travis-image]][dev-travis-url] | N/A | [![Dev - Coverage][dev-coveralls-image]][dev-coveralls-url]

[![Sauce Test Status](https://saucelabs.com/browser-matrix/fungusjs.svg)](https://saucelabs.com/u/fungusjs)


## Installation and Use

### Node

Install using `npm install {--save} fungus` and include in your project:

```javascript
var fungus = require('fungus');
```

### Browser

Include the script in your HTML:

```html
<script src="dist/fungus.min.js" encoding="utf-8"></script>
```

Currently Fungus is not distributed via Bower, Component, etc. (This will change soon.) For now you can clone and build the repository.

## Development

Requirements:
- Node.js v0.10.x
- [Watchman][watchman] *(Optional)*

### Build Tasks

Task                           | Description
---                            | ---
`make`                         | Runs the default task (`make build`).
`make test`                    | Runs the test suite. Runs both the `test.node` and `test.browser` tasks.
`make test.node`               | Runs the test suite in a Node environment.
`make test.browser`            | Runs the test suite in a browser environment.
`make coverage-report`         | Generate an HTML coverage report to `.tmp/coverage/lcov-report/index.html`.
`make build`                   | Builds the library into ES5-compatible script (minified and unminified).
`make docs`                    | Builds the documentation.

### Building

To build the library, run the command [listed above](#build-tasks).

### Testing

To run tests, run the command [listed above](#build-tasks).

### Documentation

To build documentation, run the command [listed above](#build-tasks). To view the built documentation:

```
cd .tmp/docs
python -m SimpleHTTPServer
open http://localhost:8000
```




<!--
## Goals

- Puts the developer first:
  - Usable in browser and Node
  - Forward-thinking
    - Written in ES6
  - Lightweight
    - Doesn't use ES6 features if they bloat the runtime
  - Modular
    - Take only what you need
    - First-class support for environments where page weight is a concern
  - Well documented
    - Good documentation is just as important as code
  - Feels like JavaScript
    - Immediately familiar to Lodash, Underscore users
    - Pragmatic without sacrificing core FP tenets
    - Interfaces are as flexible as possible
  - Principle of least surprise as a design guideline
    - Smallest API possible
    - Alias common alternative names
    - Very well tested
  - Easy to understand
    - The project should shield you from digging into source whenever possible,
      but if you want to or need to, it should be easy to understand
    - Usable as a study guide for FP
-->

<!-- Links -->

[master-travis-image]:    https://travis-ci.org/ndhoule/fungus.svg?branch=master
[master-travis-url]:      https://travis-ci.org/ndhoule/fungus
[master-sauce-image]:     https://saucelabs.com/buildstatus/ndhoule
[master-sauce-url]:       https://saucelabs.com/u/ndhoule
[master-coveralls-image]: https://coveralls.io/repos/ndhoule/fungus/badge.png?branch=master
[master-coveralls-url]:   https://coveralls.io/r/ndhoule/fungus?branch=master
[dev-travis-image]:    https://travis-ci.org/ndhoule/fungus.svg?branch=dev
[dev-travis-url]:      https://travis-ci.org/ndhoule/fungus
[dev-coveralls-image]: https://coveralls.io/repos/ndhoule/fungus/badge.png?branch=dev
[dev-coveralls-url]:   https://coveralls.io/r/ndhoule/fungus?branch=master
