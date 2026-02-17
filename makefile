.PHONY: install build start test

install:
	@echo "Install complete"

build:
	@echo "Build complete"

start:
	node server.js

test:
	npm test