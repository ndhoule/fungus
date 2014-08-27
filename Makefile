NODE = $(shell which node)
NPM = $(shell which npm)
TRACEUR = ./node_modules/.bin/traceur
MOCHA = ./node_modules/.bin/mocha
SASS = ./node_modules/.bin/node-sass
HTMLMIN = ./node_modules/.bin/html-minifier

BOWER_DIR = ./docs/vendor
INPUT_DIR = ./lib
OUTPUT_DIR = ./dist
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
	--rest-parameters=true \
	--filename \
	--source-maps

TRACEUR_DEV_FLAGS = \
	--modules=commonjs \
	--filename \
	--source-maps

MOCHA_FLAGS = \
	--require test/config \
	--compilers js:mocha-traceur \
	--reporter spec \
	--ui bdd \
	--check-leaks


node_modules:
	$(NPM) install

$(TMP_DIR):
	@mkdir -p $(TMP_DIR)

$(TMP_DIR)/docs:
	@mkdir -p $(TMP_DIR)/docs

$(OUTPUT_DIR):
	@mkdir -p $(OUTPUT_DIR)

clean: | $(OUTPUT_DIR)
	rm -rf $(OUTPUT_DIR) $(TMP_DIR)

build: | $(OUTPUT_DIR)
	@$(TRACEUR) $(TRACEUR_COMMON_FLAGS) $(TRACEUR_DEV_FLAGS) --dir $(INPUT_DIR) $(OUTPUT_DIR)

test: | build
	@$(MOCHA) $(MOCHA_FLAGS) $(TEST_DIR)/**/*.test.js

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
