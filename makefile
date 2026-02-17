.PHONY: install build start test

install:
	@echo "✓ Install complete"

build:
	@echo "✓ Build complete (static HTML)"

start:
	node server.js

test:
	bash ./run-tests.sh