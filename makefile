.PHONY: install build start test

install:
	npm install
	cd frontend && npm install

build:
	cd frontend && npm run build

start:
	node server.js

test:
	npm test