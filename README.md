# fungus

A functional programming library implemented in ES6.


###### Build Status

Branch | Status | Coverage | Dependencies
---    | ---    | ---      | ---
master | ![Master](https://travis-ci.org/ndhoule/fungus.svg?branch=master) | [![Coverage Status](https://coveralls.io/repos/ndhoule/fungus/badge.png?branch=master)](https://coveralls.io/r/ndhoule/fungus?branch=master) | ![Master Dependencies](https://david-dm.org/ndhoule/fungus.svg)
dev | ![Dev](https://travis-ci.org/ndhoule/fungus.svg?branch=dev) | [![Coverage Status](https://coveralls.io/repos/ndhoule/fungus/badge.png?branch=dev)](https://coveralls.io/r/ndhoule/fungus?branch=dev) | N/A

[![Sauce Test Status](https://saucelabs.com/browser-matrix/ndhoule.svg)](https://saucelabs.com/u/ndhoule)


## Installation and Use

### Node

Install using `npm install {--save} fungus` and include in your project:

```javascript
var fungus = require('fungus');
```

<!--
### Browser

```html
<script src="dist/browser.min.js" encoding="utf-8"></script>
```
-->


## Development

Requirements:
- Node.js v0.10.x
- [Watchman][watchman] *(Optional)*

### Build Tasks

Task                           | Description
---                            | ---
`make`                         | Runs the default task (`make build.commonjs`).
`make test`                    | Runs the test suite. Runs both the `test.node` and `test.browser` tasks.
`make test.node`               | Runs the test suite in a Node environment.
`make test.browser`            | Runs the test suite in a browser environment.
`make test.coverage.coveralls` | Runs the test suite in a Node environment, outputting a coverage report and sending it to the [Coveralls][coveralls] code coverage tracking service.
`make test.coverage.html`      | Runs the test suite in a Node environment, outputting a HTML coverage report.
`make build.commonjs`          | Builds the library into ES5-compatible CommonJS modules.
`make build.amd`               | Builds the library into ES5-compatible AMD modules.
`make build.script`            | Builds the library into a single, ES5-compatible script file.
`make docs`                    | Builds the documentation.
`make watch`                   | Watch and rebuild the source and documentation on file changes. Runs as a background task via [Watchman][watchman].
`make unwatch`                 | Stop file watching.

[coveralls]: http://coveralls.io
[watchman]: https://facebook.github.io/watchman/docs/install.html

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
