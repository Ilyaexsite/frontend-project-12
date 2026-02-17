#!/bin/bash
set -e

echo "========================================="
echo "🔍 DEBUG TEST SCRIPT"
echo "========================================="

# Запускаем сервер
echo "🚀 Starting server..."
npm run start:test &
SERVER_PID=$!

# Ждем запуска
sleep 3

# Проверяем сервер
echo "📡 Checking server..."
curl -v http://localhost:5001/ || echo "❌ Server not responding"
curl -v http://localhost:5001/ping || echo "❌ Ping failed"

# Проверяем HTML
echo "📄 Fetching homepage..."
curl http://localhost:5001/ | grep -i "hexlet chat" || echo "❌ Hexlet Chat not found in HTML"

echo "========================================="
echo "🧪 Running debug test..."
echo "========================================="

# Запускаем тесты с отладкой
DEBUG=pw:api npx playwright test __tests__/simple.test.js --debug

# Убиваем сервер
kill $SERVER_PID