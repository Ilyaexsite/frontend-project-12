#!/bin/bash
set -e

echo "========================================="
echo "🔧 Setting up Playwright..."
echo "========================================="

# Устанавливаем Playwright глобально
npm install -g @playwright/test

# Устанавливаем браузеры
npx --yes playwright install --with-deps chromium

echo "✅ Playwright setup complete"