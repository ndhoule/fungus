NODE_BIN = $(shell which node)
NPM_BIN = $(shell which npm)
TRACEUR_BIN = ./node_modules/.bin/traceur
MOCHA_BIN = ./node_modules/.bin/mocha

INPUT_DIR = ./lib
OUTPUT_DIR = ./dist

TEST_DIR = ./test

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
	$(NPM_BIN) install

$(OUTPUT_DIR):
	@mkdir -p $(OUTPUT_DIR)

clean: | $(OUTPUT_DIR)
	rm -r $(OUTPUT_DIR)

build: | $(OUTPUT_DIR)
	@$(TRACEUR_BIN) $(TRACEUR_COMMON_OPTS) $(TRACEUR_DEV_OPTS) --dir $(INPUT_DIR) $(OUTPUT_DIR)

test: | build
	@$(MOCHA_BIN) $(MOCHA_OPTS) $(TEST_DIR)/**/*.test.js


.DEFAULT_GOAL = build
.PHONY: build test
