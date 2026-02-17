#!/bin/bash
set -e

echo "========================================="
echo "🧪 Setting up test environment..."
echo "========================================="

# Устанавливаем Playwright и браузеры
npx playwright install --with-deps chromium

echo "========================================="
echo "🚀 Starting test server..."
echo "========================================="

# Запускаем сервер в фоне
npm run start:test &
SERVER_PID=$!

# Ждем запуска сервера
sleep 5

# Проверяем, что сервер запустился
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo "❌ Server failed to start!"
    exit 1
fi

echo "✅ Server started with PID: $SERVER_PID"

# Проверяем, что сервер отвечает
echo "📡 Pinging server..."
curl --fail http://localhost:5001/ping || {
    echo "❌ Server is not responding!"
    exit 1
}

echo "========================================="
echo "🧪 Running Playwright tests..."
echo "========================================="

# Запускаем тесты
npx playwright test

# Сохраняем результат
TEST_EXIT_CODE=$?

# Убиваем сервер
kill $SERVER_PID

exit $TEST_EXIT_CODE