NODE = $(shell which node)
NPM = $(shell which npm)
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
	--require test/config/node \
	--compilers js:mocha-traceur \
	--reporter spec \
	--ui bdd \
	--check-leaks

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

build: | $(COMPILE_DIR)
	@$(TRACEUR) $(TRACEUR_COMMON_FLAGS) $(TRACEUR_DEV_FLAGS) --dir $(INPUT_DIR) $(COMPILE_DIR)/commonjs

build-browser: | $(COMPILE_DIR)
	@$(TRACEUR) $(TRACEUR_COMMON_FLAGS) $(TRACEUR_BROWSER_FLAGS) --dir $(INPUT_DIR) $(COMPILE_DIR)/amd

dist-browser: $(DIST_DIR) build-browser
	@.bin/build-browser > $(DIST_DIR)/browser.js
	@$(UGLIFYJS) $(DIST_DIR)/browser.js $(UGLIFYJS_FLAGS) > $(DIST_DIR)/browser.min.js 2> /dev/null

test: | build
	@$(MOCHA) $(MOCHA_FLAGS) $(TEST_DIR)/**/*.test.js

test-browser: | dist-browser
	@$(KARMA) start test/config/karma.conf.js

docs: | $(TMP_DIR)/docs
	$(SASS) --include-path=$(BOWER_DIR)/bootstrap-sass-official/assets/stylesheets \
		docs/scss/main.scss $(TMP_DIR)/docs/main.css \
		> /dev/null 2>&1
	$(NODE) .bin/generate-docs | $(HTMLMIN) $(HTMLMIN_FLAGS) > $(TMP_DIR)/docs/index.html

watch:
	@.bin/watch

unwatch:
	@.bin/unwatch


.DEFAULT_GOAL = build
.PHONY: build docs test watch unwatch
