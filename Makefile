6_TO_5 = ./node_modules/.bin/6to5
BROWSERIFY = ./node_modules/.bin/browserify
COVERALLS = ./node_modules/.bin/coveralls
EXORCIST = ./node_modules/.bin/exorcist
ISTANBUL = ./node_modules/.bin/istanbul
JSHINT = ./node_modules/.bin/jshint
KARMA = ./node_modules/.bin/karma
MOCHA = ./node_modules/.bin/mocha
_MOCHA = ./node_modules/.bin/_mocha
SASS = ./node_modules/.bin/node-sass
UGLIFYJS = ./node_modules/.bin/uglifyjs

DIST_DIR = ./dist
LIB_DIR = ./lib
SRC_DIR = ./src
TEST_DIR = ./test
TMP_DIR = ./.tmp

NODE_DEPS = $(wildcard node_modules/*/package.json)
SRCS = $(wildcard src/*.js src/**/*.js)
TESTS = $(wildcard test/unit/*.test.js test/unit/**/*.test.js)

HTMLMIN_FLAGS = --collapse-whitespace \
	--minify-js \
	--remove-comments

MOCHA_FLAGS = \
	--ui bdd \
	--check-leaks \
	--require $(TEST_DIR)/config/node

#
# Support.
#

node_modules: package.json
	@npm install

clean:
	@rm -rf $(TMP_DIR) $(DIST_DIR)

$(DIST_DIR):
	@mkdir -p $(DIST_DIR)

$(DIST_DIR)/browser:
	@mkdir -p $(DIST_DIR)/browser

$(TMP_DIR):
	@mkdir -p $(TMP_DIR)

$(TMP_DIR)/docs:
	@mkdir -p $(TMP_DIR)/docs

#
# Build Targets.
#

$(LIB_DIR): $(SRCS)
	@$(6_TO_5) $(SRC_DIR) --out-dir $@ > /dev/null 2>&1
	@echo "Library compiled to $@."

$(DIST_DIR)/fungus.js: Makefile $(NODE_DEPS) $(SRCS) | $(DIST_DIR)
	@$(BROWSERIFY) dist/index.js \
							--debug \
							--standalone fungus \
							--transform [ 6to5ify --sourceMapRelative src ] | \
							$(EXORCIST) $@.map > $@
	@echo "Library built to $@."

$(DIST_DIR)/fungus.min.js: $(DIST_DIR)/fungus.js
	@$(UGLIFYJS) $(DIST_DIR)/fungus.js \
						--mangle \
						--screw-ie8 \
						--compress keep-fargs=true \
						--reserved fungus \
						--in-source-map $(DIST_DIR)/fungus.js.map \
						--source-map $@.map > $@
	@echo "Library built to $@."

build: $(DIST_DIR)/fungus.min.js

#
# Testing.
#

test.browser: $(DIST_DIR)/fungus.js
	@$(KARMA) start test/config/karma.conf.js

test.node: $(LIB_DIR)
	@NODE_ENV=test $(MOCHA) $(MOCHA_FLAGS) --reporter spec $(TESTS)

# XXX: Does not build to this loc
$(TMP_DIR)/coverage/lcov.info: $(LIB_DIR) $(TESTS) | $(TMP_DIR)
	@NODE_ENV=coverage $(ISTANBUL) cover --report lcovonly --dir $(TMP_DIR)/coverage \
		$(_MOCHA) -- $(MOCHA_FLAGS) $(TESTS)
	@echo "Coverage report written to $@."

$(TMP_DIR)/coverage/lcov-report/index.html: $(LIB_DIR) $(TESTS) | $(TMP_DIR)
	@NODE_ENV=coverage $(ISTANBUL) cover --dir $(TMP_DIR)/coverage \
		$(_MOCHA) -- $(MOCHA_FLAGS) $(TESTS)
	@open $@

test.coveralls: $(TMP_DIR)/coverage/lcov.info
	@cat $< | $(COVERALLS)
	@echo Coverage report sent to Coveralls.

# TODO: Lint $(TEST_DIR) and fix failures
# TODO: Switch to Eslint when ES6 syntax is more comprehensive.
#       See this issue for progress: https://github.com/eslint/espree/issues/10
lint:
	@$(JSHINT) --reporter=./node_modules/jshint-stylish/stylish $(SRC_DIR)

coverage-report: $(TMP_DIR)/coverage/lcov-report/index.html
test: test.node test.browser

#
# Documentation.
#

$(TMP_DIR)/docs/%.css: docs/scss/%.scss
	@$(SASS) --include-path=./node_modules/bootstrap-sass/assets/stylesheets $< -o $@ > /dev/null 2>&1

$(TMP_DIR)/docs/fungus.min.js: $(DIST_DIR)/fungus.min.js | $(TMP_DIR)/docs
	@cp $(DIST_DIR)/fungus.min.js $@

$(TMP_DIR)/docs/fungus.min.js.map: $(DIST_DIR)/fungus.min.js | $(TMP_DIR)/docs
	@cp $(DIST_DIR)/fungus.min.js.map $@

$(TMP_DIR)/docs/index.html: $(TMP_DIR)/docs/fungus.min.js $(TMP_DIR)/docs/fungus.min.js.map $(TMP_DIR)/docs/main.css | $(TMP_DIR)/docs
	@node .bin/generate-docs | html-minifier $(HTMLMIN_FLAGS) > $@
	@echo "Documentation built to $(TMP_DIR)/docs."

docs: $(TMP_DIR)/docs/index.html

#
# Phonies and defaults.
#

.DEFAULT_GOAL = dist/fungus.min.js
.PHONY: lint test.node test.browser test.coveralls
