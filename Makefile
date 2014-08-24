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

HTMLMIN_OPTS = --collapse-whitespace \
	--minify-js \
	--remove-comments

TRACEUR_COMMON_OPTS = \
	--arrow-functions=true \
	--block-binding=true \
	--default-parameters=true \
	--numeric-literals=true \
	--rest-parameters=true \
	--filename \
	--source-maps

TRACEUR_DEV_OPTS = \
	--modules=commonjs \
	--filename \
	--source-maps

TRACEUR_DEV_OPTS = \
	--modules=commonjs \
	--filename \
	--source-maps

MOCHA_OPTS = \
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
	rm -r $(OUTPUT_DIR)

build: | $(OUTPUT_DIR)
	@$(TRACEUR) $(TRACEUR_COMMON_OPTS) $(TRACEUR_DEV_OPTS) --dir $(INPUT_DIR) $(OUTPUT_DIR)

test: | build
	@$(MOCHA) $(MOCHA_OPTS) $(TEST_DIR)/**/*.test.js

docs: | $(TMP_DIR)/docs
	$(SASS) --include-path=$(BOWER_DIR)/bootstrap-sass-official/assets/stylesheets \
		docs/scss/main.scss $(TMP_DIR)/docs/main.css \
		> /dev/null 2>&1
	$(NODE) .bin/generate-docs | $(HTMLMIN) $(HTMLMIN_OPTS) > $(TMP_DIR)/docs/index.html


.DEFAULT_GOAL = build
.PHONY: build docs test
