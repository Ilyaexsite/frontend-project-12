.PHONY: install build start

install:
	cd frontend && npm install

build:
	cd frontend && npm run build

start:
	node server.js