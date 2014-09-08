NODE = $(shell which node)
NPM = $(shell which npm)
COVERALLS = ./node_modules/.bin/coveralls
HTMLMIN = ./node_modules/.bin/html-minifier
JSHINT = ./node_modules/.bin/jshint
KARMA = ./node_modules/.bin/karma
MOCHA = ./node_modules/.bin/mocha
SASS = ./node_modules/.bin/node-sass
TRACEUR = ./node_modules/.bin/traceur
UGLIFYJS = ./node_modules/.bin/uglifyjs

DIST_DIR = ./dist
SRC_DIR = ./src
TEST_DIR = ./test
TMP_DIR = ./.tmp

HTMLMIN_FLAGS = --collapse-whitespace \
	--minify-js \
	--remove-comments

MOCHA_COMMON_FLAGS = \
	--ui bdd \
	--check-leaks \
	--require $(TEST_DIR)/config/node

MOCHA_COVERAGE_FLAGS = \
	--require blanket \
	$(MOCHA_COMMON_FLAGS)

TRACEUR_COMMON_FLAGS = \
	--arrow-functions=true \
	--block-binding=true \
	--default-parameters=true \
	--numeric-literals=true \
	--rest-parameters=true

TRACEUR_COMMONJS_FLAGS = \
	$(TRACEUR_COMMON_FLAGS) \
	--modules=commonjs \
	--filename \
	--source-maps

TRACEUR_BROWSER_FLAGS = \
	$(TRACEUR_COMMON_FLAGS) \
	--modules=amd \
	--filename \
	--source-maps

UGLIFYJS_FLAGS = \
	--reserved fungus \
	--mangle \
	--compress keep-fargs=true \
	--screw-ie8

#
# Support Tasks
#

node_modules:
	$(NPM) install

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
# Build Tasks
#

build.commonjs: force | $(DIST_DIR)
	@rm -rf $(DIST_DIR)/commonjs/*
	@$(TRACEUR) $(TRACEUR_COMMONJS_FLAGS) --dir $(SRC_DIR) $(DIST_DIR)/commonjs

build.amd: force | $(DIST_DIR)
	@rm -rf $(DIST_DIR)/amd/*
	@$(TRACEUR) $(TRACEUR_BROWSER_FLAGS) --dir $(SRC_DIR) $(DIST_DIR)/amd

$(DIST_DIR)/browser/fungus.js: build.amd | $(DIST_DIR)/browser
	@.bin/build-browser > $@

$(DIST_DIR)/browser/fungus.min.js: $(DIST_DIR)/browser/fungus.js | $(DIST_DIR)/browser
	@$(UGLIFYJS) $< $(UGLIFYJS_FLAGS) > $@ 2> /dev/null

build.script: $(DIST_DIR)/browser/fungus.min.js

#
# Testing Tasks
#

test: test.node test.browser

test.node: build.commonjs
	@$(MOCHA) $(MOCHA_COMMON_FLAGS) --reporter spec $(TEST_DIR)/**/*.test.js

test.browser: $(DIST_DIR)/browser/fungus.min.js
	@$(KARMA) start test/config/karma.conf.js

$(TMP_DIR)/coverage.lcov: build.commonjs | $(TMP_DIR)
	@$(MOCHA) $(MOCHA_COVERAGE_FLAGS) --reporter mocha-lcov-reporter $(TEST_DIR)/**/*.test.js > $@

test.coverage.coveralls: $(TMP_DIR)/coverage.lcov
	@$< | $(COVERALLS)
	@echo Coverage report sent to Coveralls.

$(TMP_DIR)/coverage.html: build.commonjs | $(TMP_DIR)
	@$(MOCHA) $(MOCHA_COVERAGE_FLAGS) --reporter html-cov $(TEST_DIR)/**/*.test.js > $@
	@echo Coverage report written to \`$@\`.

test.coverage.html: $(TMP_DIR)/coverage.html

lint:
	@$(JSHINT) --reporter=./node_modules/jshint-stylish/stylish $(SRC_DIR) $(TEST_DIR)

#
# Documentation Tasks
#

$(TMP_DIR)/docs/%.css: docs/scss/%.scss
	@$(SASS) --include-path=./node_modules/bootstrap-sass/assets/stylesheets $< -o $@ > /dev/null 2>&1

$(TMP_DIR)/docs/fungus.min.js: build.script | $(TMP_DIR)/docs
	@cp $(DIST_DIR)/browser/fungus.min.js $(TMP_DIR)/docs/fungus.min.js

$(TMP_DIR)/docs/index.html: build.script $(TMP_DIR)/docs/fungus.min.js $(TMP_DIR)/docs/main.css | $(TMP_DIR)/docs
	@$(NODE) .bin/generate-docs | $(HTMLMIN) $(HTMLMIN_FLAGS) > $@
	@echo Documentation written to \`$(TMP_DIR)/docs/\`.

docs: $(TMP_DIR)/docs/index.html

#
# Watch Tasks
#

watch:
	@.bin/watch

unwatch:
	@.bin/unwatch


.DEFAULT_GOAL = build.commonjs
.PHONY: docs force node_modules test.node unwatch watch lint
