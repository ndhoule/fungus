BROWSERIFY = ./node_modules/.bin/browserify
EXORCIST = ./node_modules/.bin/exorcist
KARMA = ./node_modules/.bin/karma
MOCHA = ./node_modules/.bin/mocha
SASS = ./node_modules/.bin/node-sass
UGLIFYJS = ./node_modules/.bin/uglifyjs

DIST_DIR = ./dist
SRC_DIR = ./src
TEST_DIR = ./test
TMP_DIR = ./.tmp

HTMLMIN_FLAGS = --collapse-whitespace \
	--minify-js \
	--remove-comments

MOCHA_COMMON_FLAGS = \
	--compilers js:6to5/register \
	--ui bdd \
	--check-leaks \
	--require $(TEST_DIR)/config/node

MOCHA_COVERAGE_FLAGS = \
	--require blanket \
	$(MOCHA_COMMON_FLAGS)

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

$(DIST_DIR)/fungus.js: $(wildcard node_modules/*/*.json src/*.js src/**/*.js) | $(DIST_DIR)
	@$(BROWSERIFY) src/index.js \
							--debug \
							--standalone fungus \
							--transform [ 6to5ify --sourceMapRelative src ] | \
							$(EXORCIST) $@.map > $@
	@echo "Built library to $@."

$(DIST_DIR)/fungus.min.js: $(DIST_DIR)/fungus.js
	@$(UGLIFYJS) $(DIST_DIR)/fungus.js \
						--mangle \
						--screw-ie8 \
						--compress keep-fargs=true \
						--reserved fungus \
						--in-source-map $(DIST_DIR)/fungus.js.map \
						--source-map $@.map > $@
	@echo "Built library to $@."

#
# Testing.
#

test: test.node test.browser

test.node:
	@$(MOCHA) $(MOCHA_COMMON_FLAGS) --reporter spec $(TEST_DIR)/**/*.test.js

test.browser: $(DIST_DIR)/fungus.js
	@$(KARMA) start test/config/karma.conf.js

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
	@echo "Built documentation to $(TMP_DIR)/docs."

docs: $(TMP_DIR)/docs/index.html

#
# Phonies and defaults.
#

.DEFAULT_GOAL = dist/fungus.js
.PHONY: docs test.node test.browser
