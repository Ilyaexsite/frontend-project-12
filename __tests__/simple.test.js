const { test, expect } = require('@playwright/test');

test('homepage has correct elements', async ({ page }) => {
  // Переходим на главную
  await page.goto('/');
  
  // Проверяем заголовок
  await expect(page.locator('a', { hasText: 'Hexlet Chat' })).toBeVisible();
  
  // Проверяем, что это страница входа
  await expect(page.locator('h1', { hasText: 'Вход' })).toBeVisible();
  await expect(page.locator('label', { hasText: 'Ваш ник' })).toBeVisible();
  await expect(page.locator('label', { hasText: 'Пароль' })).toBeVisible();
  await expect(page.locator('button', { hasText: 'Войти' })).toBeVisible();
});

test('signup page has correct elements', async ({ page }) => {
  // Переходим на страницу регистрации
  await page.goto('/signup');
  
  // Проверяем элементы
  await expect(page.locator('a', { hasText: 'Hexlet Chat' })).toBeVisible();
  await expect(page.locator('h1', { hasText: 'Регистрация' })).toBeVisible();
  await expect(page.locator('label', { hasText: 'Ваш ник' })).toBeVisible();
  await expect(page.locator('label', { hasText: 'Пароль' })).toBeVisible();
  await expect(page.locator('label', { hasText: 'Подтвердите пароль' })).toBeVisible();
  await expect(page.locator('button', { hasText: 'Зарегистрироваться' })).toBeVisible();
});