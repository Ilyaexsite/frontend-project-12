.PHONY: install build start test setup

install:
	@echo "✓ Install complete"

setup:
	bash ./setup.sh

build:
	@echo "✓ Build complete (static HTML)"

start:
	node server.js

test:
	bash ./run-tests.sh