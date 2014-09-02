NODE = $(shell which node)
NPM = $(shell which npm)
COVERALLS = ./node_modules/.bin/coveralls
HTMLMIN = ./node_modules/.bin/html-minifier
KARMA = ./node_modules/.bin/karma
MOCHA = ./node_modules/.bin/mocha
SASS = ./node_modules/.bin/node-sass
TRACEUR = ./node_modules/.bin/traceur
UGLIFYJS = ./node_modules/.bin/uglifyjs

BOWER_DIR = ./docs/vendor
DIST_DIR = ./dist
INPUT_DIR = ./lib
COMPILE_DIR = ./.tmp/compiled
TEST_DIR = ./test
TMP_DIR = ./.tmp

HTMLMIN_FLAGS = --collapse-whitespace \
	--minify-js \
	--remove-comments

TRACEUR_COMMON_FLAGS = \
	--arrow-functions=true \
	--block-binding=true \
	--default-parameters=true \
	--numeric-literals=true \
	--rest-parameters=true

TRACEUR_DEV_FLAGS = \
	--modules=commonjs \
	--filename \
	--source-maps

TRACEUR_BROWSER_FLAGS = --modules=amd

MOCHA_FLAGS = \
	--ui bdd \
	--check-leaks \
	--require $(TEST_DIR)/config/node

UGLIFYJS_FLAGS = \
	--reserved fungus \
	--mangle \
	--compress keep-fargs=true \
	--screw-ie8


node_modules:
	$(NPM) install

$(DIST_DIR):
	@mkdir -p $(DIST_DIR)

$(TMP_DIR):
	@mkdir -p $(TMP_DIR)

$(TMP_DIR)/docs:
	@mkdir -p $(TMP_DIR)/docs

$(COMPILE_DIR): $(TMP_DIR)
	@mkdir -p $(COMPILE_DIR)

clean: | $(COMPILE_DIR)
	rm -rf $(TMP_DIR) $(DIST_DIR)

build: | clean $(COMPILE_DIR)
	@$(TRACEUR) $(TRACEUR_COMMON_FLAGS) $(TRACEUR_DEV_FLAGS) --dir $(INPUT_DIR) $(COMPILE_DIR)/commonjs

build-browser: | clean $(COMPILE_DIR)
	@$(TRACEUR) $(TRACEUR_COMMON_FLAGS) $(TRACEUR_BROWSER_FLAGS) --dir $(INPUT_DIR) $(COMPILE_DIR)/amd

dist-browser: build-browser $(DIST_DIR)
	@.bin/build-browser > $(DIST_DIR)/browser.js
	@$(UGLIFYJS) $(DIST_DIR)/browser.js $(UGLIFYJS_FLAGS) > $(DIST_DIR)/browser.min.js 2> /dev/null

test: | build
	@$(MOCHA) $(MOCHA_FLAGS) --reporter spec $(TEST_DIR)/**/*.test.js

test.coverage.coveralls: | build
	@$(MOCHA) --require blanket --reporter mocha-lcov-reporter $(MOCHA_FLAGS) \
		$(TEST_DIR)/**/*.test.js | $(COVERALLS)

test.coverage.html: | build
	@$(MOCHA) --require blanket --reporter html-cov $(MOCHA_FLAGS) \
		$(TEST_DIR)/**/*.test.js > $(TMP_DIR)/coverage.html
	@echo Coverage report written to $(TMP_DIR)/coverage.html.

test-browser: | dist-browser
	@$(KARMA) start test/config/karma.conf.js

docs: | clean $(TMP_DIR)/docs
	$(SASS) --include-path=$(BOWER_DIR)/bootstrap-sass-official/assets/stylesheets \
		docs/scss/main.scss $(TMP_DIR)/docs/main.css > /dev/null 2>&1
	$(NODE) .bin/generate-docs | $(HTMLMIN) $(HTMLMIN_FLAGS) > $(TMP_DIR)/docs/index.html

watch:
	@.bin/watch

unwatch:
	@.bin/unwatch


.DEFAULT_GOAL = build
.PHONY: build build-browser dist-browser test test.coverage test.coverage.html docs watch unwatch
