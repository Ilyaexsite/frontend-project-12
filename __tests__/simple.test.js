const { test, expect } = require('@playwright/test');

test('homepage has Hexlet Chat link', async ({ page }) => {
  // Переходим на главную
  await page.goto('/');
  
  // Ждем загрузки
  await page.waitForTimeout(1000);
  
  // Делаем скриншот для отладки
  await page.screenshot({ path: 'homepage.png' });
  
  // Ищем ссылку с текстом Hexlet Chat
  const link = page.locator('a', { hasText: 'Hexlet Chat' }).first();
  
  // Проверяем, что ссылка видна
  await expect(link).toBeVisible();
  
  // Проверяем текст
  const text = await link.textContent();
  console.log('Found text:', text);
  
  // Проверяем href
  const href = await link.getAttribute('href');
  console.log('Found href:', href);
});

test('login form has correct fields', async ({ page }) => {
  await page.goto('/');
  
  // Ищем поля формы
  const usernameLabel = page.locator('label', { hasText: 'Ваш ник' }).first();
  const passwordLabel = page.locator('label', { hasText: 'Пароль' }).first();
  const submitButton = page.locator('button', { hasText: 'Войти' }).first();
  const signupLink = page.locator('a', { hasText: 'Регистрация' }).first();
  
  await expect(usernameLabel).toBeVisible();
  await expect(passwordLabel).toBeVisible();
  await expect(submitButton).toBeVisible();
  await expect(signupLink).toBeVisible();
});
