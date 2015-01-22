NODE = $(shell which node)
NPM = $(shell which npm)
COVERALLS = ./node_modules/.bin/coveralls
HTMLMIN = ./node_modules/.bin/html-minifier
JSHINT = ./node_modules/.bin/jshint
KARMA = ./node_modules/.bin/karma
MOCHA = ./node_modules/.bin/mocha
SASS = ./node_modules/.bin/node-sass
BROWSERIFY = ./node_modules/.bin/browserify
UGLIFYJS = ./node_modules/.bin/uglifyjs
EXORCIST = ./node_modules/.bin/exorcist

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
# Build Targets.
#

$(DIST_DIR)/fungus.js: force | $(DIST_DIR)
	@$(BROWSERIFY) -d -s fungus -t [ 6to5ify --sourceMapRelative src ] src/index.js | $(EXORCIST) $(DIST_DIR)/fungus.js.map > $@
	@echo "Built library to $@."

$(DIST_DIR)/fungus.min.js: force | $(DIST_DIR)/fungus.js
	@$(UGLIFYJS) --mangle \
							 --screw-ie8 \
							 --compress keep-fargs=true \
							 --reserved fungus \
							 --in-source-map $(DIST_DIR)/fungus.js.map \
							 --source-map $(DIST_DIR)/fungus.min.js.map \
							 $(DIST_DIR)/fungus.js > $@
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

$(TMP_DIR)/docs/fungus.min.js: build.script | $(TMP_DIR)/docs
	@cp $(DIST_DIR)/browser/fungus.min.js $(TMP_DIR)/docs/fungus.min.js

$(TMP_DIR)/docs/index.html: build.script $(TMP_DIR)/docs/fungus.min.js $(TMP_DIR)/docs/main.css | $(TMP_DIR)/docs
	@$(NODE) .bin/generate-docs | $(HTMLMIN) $(HTMLMIN_FLAGS) > $@
	@echo Documentation written to \`$(TMP_DIR)/docs/\`.

docs: $(TMP_DIR)/docs/index.html

#
# Watch
#

# TODO: watchify


.DEFAULT_GOAL = dist/fungus.js
.PHONY: docs force node_modules test.node unwatch watch lint
