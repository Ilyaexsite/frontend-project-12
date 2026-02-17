const { test, expect } = require('@playwright/test');

test('homepage has Hexlet Chat', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a', { hasText: 'Hexlet Chat' })).toBeVisible();
});

test('homepage has login form', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1', { hasText: 'Вход' })).toBeVisible();
  await expect(page.locator('label', { hasText: 'Ваш ник' })).toBeVisible();
  await expect(page.locator('label', { hasText: 'Пароль' })).toBeVisible();
  await expect(page.locator('button', { hasText: 'Войти' })).toBeVisible();
});

test('signup page works', async ({ page }) => {
  await page.goto('/signup');
  await expect(page.locator('h1', { hasText: 'Регистрация' })).toBeVisible();
});
