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

$(DIST_DIR):
	@mkdir -p $(DIST_DIR)

$(DIST_DIR)/browser:
	@mkdir -p $(DIST_DIR)/browser

$(TMP_DIR):
	@mkdir -p $(TMP_DIR)

$(TMP_DIR)/docs:
	@mkdir -p $(TMP_DIR)/docs

clean:
	@rm -rf $(TMP_DIR) $(DIST_DIR)

#
# Build Tasks
#

build.commonjs: | clean $(DIST_DIR)
	@$(TRACEUR) $(TRACEUR_COMMONJS_FLAGS) --dir $(SRC_DIR) $(DIST_DIR)/commonjs

build.amd: | clean $(DIST_DIR)
	@$(TRACEUR) $(TRACEUR_BROWSER_FLAGS) --dir $(SRC_DIR) $(DIST_DIR)/amd

build.script: build.amd $(DIST_DIR)/browser
	@.bin/build-browser > $(DIST_DIR)/browser/fungus.js
	@$(UGLIFYJS) $(DIST_DIR)/browser/fungus.js $(UGLIFYJS_FLAGS) > $(DIST_DIR)/browser/fungus.min.js 2> /dev/null

#
# Testing Tasks
#

test: | test.node test.browser

test.node: | build.commonjs
	@$(MOCHA) $(MOCHA_COMMON_FLAGS) --reporter spec $(TEST_DIR)/**/*.test.js

test.browser: | build.script
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
.PHONY: build.commonjs build.amd build.script test.node test.coverage.coveralls \
	test.coverage.html docs watch unwatch node_modules
