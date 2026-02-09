.PHONY: build start install dev test

install:
	cd frontend && npm install
	npm install @hexlet/chat-server

build:
	cd frontend && npm run build

start:
	npx start-server -s ./frontend/dist

start-dev:
	npx start-server -p 5001

dev:
	npm run dev

test:
	curl http://localhost:5001/api/v1/channels

lint:
	cd frontend && npm run lint
	