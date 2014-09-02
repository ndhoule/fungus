# fungus

A functional programming library implemented in ES6.


###### Build Status

Branch | Status                                                            | Coverage
---    | ---                                                               | ---
master | ![Master](https://travis-ci.org/ndhoule/fungus.svg?branch=master) | [![Coverage Status](https://img.shields.io/coveralls/ndhoule/fungus.svg)](https://coveralls.io/r/ndhoule/fungus?branch=master)
dev    | ![Dev](https://travis-ci.org/ndhoule/fungus.svg?branch=dev)       | [![Coverage Status](https://img.shields.io/coveralls/ndhoule/fungus.svg)](https://coveralls.io/r/ndhoule/fungus?branch=dev)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/ndhoule.svg)](https://saucelabs.com/u/ndhoule)


## Installation

```bash
npm install {--save} fungus
```

## Use

Fungus currently can't easily be used in a project. Check back soon!

<!--
```javascript
var fungus = require('fungus');
```
-->


## Development

Requirements:
- Node.js v0.10.x
- [Watchman](https://facebook.github.io/watchman/docs/install.html) *(Optional)*

### Build Tasks

Task           | Description
---            | ---
`make`         | Runs the default task (`make build`).
`make test`    | Runs the test suite.
`make build`   | Builds the library into ES5-compatible modules.
`make docs`    | Builds the documentation.
`make watch`   | Watch and rebuild the source and documentation on file changes.
`make unwatch` | Stop file watching.

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
