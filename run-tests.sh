#!/bin/bash
set -e

echo "========================================="
echo "🧪 Running tests..."
echo "========================================="

# Проверяем наличие Playwright
if ! command -v npx playwright &> /dev/null; then
    echo "📦 Installing Playwright..."
    npm install -g @playwright/test
    npx playwright install chromium
fi

# Запускаем сервер
echo "🚀 Starting test server..."
npm run start:test &
SERVER_PID=$!

# Ждем запуска сервера
sleep 5

# Проверяем сервер
echo "📡 Checking server..."
curl --fail http://localhost:5001/ping || {
    echo "❌ Server not responding!"
    exit 1
}

echo "✅ Server is running"

# Запускаем тесты
echo "🧪 Running Playwright tests..."
npx playwright test

# Сохраняем результат
TEST_EXIT_CODE=$?

# Убиваем сервер
kill $SERVER_PID

exit $TEST_EXIT_CODE