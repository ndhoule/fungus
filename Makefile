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
COMPILE_DIR = ./.tmp/compiled
DIST_DIR = ./dist
INPUT_DIR = ./lib
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

$(DIST_DIR):
	@mkdir -p $(DIST_DIR)

$(TMP_DIR):
	@mkdir -p $(TMP_DIR)

$(TMP_DIR)/docs:
	@mkdir -p $(TMP_DIR)/docs

$(COMPILE_DIR): $(TMP_DIR)
	@mkdir -p $(COMPILE_DIR)

clean: | $(COMPILE_DIR)
	@rm -rf $(TMP_DIR) $(DIST_DIR)

#
# Build Tasks
#

build.commonjs: | clean $(COMPILE_DIR)
	@$(TRACEUR) $(TRACEUR_COMMONJS_FLAGS) --dir $(INPUT_DIR) $(COMPILE_DIR)/commonjs

build.browser: | clean $(COMPILE_DIR)
	@$(TRACEUR) $(TRACEUR_BROWSER_FLAGS) --dir $(INPUT_DIR) $(COMPILE_DIR)/amd

build.browser.dist: build.browser $(DIST_DIR)
	@.bin/build-browser > $(DIST_DIR)/browser.js
	@$(UGLIFYJS) $(DIST_DIR)/browser.js $(UGLIFYJS_FLAGS) > $(DIST_DIR)/browser.min.js 2> /dev/null

#
# Testing Tasks
#

test: | test.commonjs test.browser

test.commonjs: | build.commonjs
	@$(MOCHA) $(MOCHA_COMMON_FLAGS) --reporter spec $(TEST_DIR)/**/*.test.js

test.browser: | build.browser.dist
	@$(KARMA) start test/config/karma.conf.js

test.coverage.coveralls: | build.commonjs
	@$(MOCHA) $(MOCHA_COVERAGE_FLAGS) --reporter mocha-lcov-reporter $(TEST_DIR)/**/*.test.js | $(COVERALLS)
	@echo Coverage report sent to Coveralls.

test.coverage.html: | build.commonjs
	@$(MOCHA) $(MOCHA_COVERAGE_FLAGS) --reporter html-cov $(TEST_DIR)/**/*.test.js > $(TMP_DIR)/coverage.html
	@echo Coverage report written to \`$(TMP_DIR)/coverage.html\`.

#
# Documentation Tasks
#

docs: | clean $(TMP_DIR)/docs
	@$(SASS) --include-path=$(BOWER_DIR)/bootstrap-sass-official/assets/stylesheets \
		docs/scss/main.scss $(TMP_DIR)/docs/main.css > /dev/null 2>&1
	@$(NODE) .bin/generate-docs | $(HTMLMIN) $(HTMLMIN_FLAGS) > $(TMP_DIR)/docs/index.html
	@echo Documentation written to \`$(TMP_DIR)/docs/\`.

#
# Watch Tasks
#

watch:
	@.bin/watch

unwatch:
	@.bin/unwatch


.DEFAULT_GOAL = build.commonjs
.PHONY: build.commonjs build.browser build.browser.dist test.commonjs test.coverage.coveralls \
	test.coverage.html docs watch unwatch
