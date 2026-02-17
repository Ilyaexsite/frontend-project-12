const { test, expect } = require('@playwright/test');

test.describe('Basic page tests', () => {
  
  test('homepage has correct elements', async ({ page }) => {
    console.log('🌐 Testing homepage...');
    await page.goto('/');
    
    // Делаем скриншот для отладки
    await page.screenshot({ path: 'homepage.png' });
    
    // Проверяем ссылку Hexlet Chat
    const link = page.locator('a', { hasText: 'Hexlet Chat' });
    await expect(link).toBeVisible();
    console.log('✅ Hexlet Chat link found');
    
    // Проверяем заголовок
    const heading = page.locator('h1', { hasText: 'Вход' });
    await expect(heading).toBeVisible();
    console.log('✅ Login heading found');
    
    // Проверяем поля формы
    await expect(page.locator('label', { hasText: 'Ваш ник' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Пароль' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Войти' })).toBeVisible();
    console.log('✅ Login form elements found');
  });

  test('signup page has correct elements', async ({ page }) => {
    console.log('🌐 Testing signup page...');
    await page.goto('/signup');
    
    await page.screenshot({ path: 'signup.png' });
    
    await expect(page.locator('a', { hasText: 'Hexlet Chat' })).toBeVisible();
    await expect(page.locator('h1', { hasText: 'Регистрация' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Ваш ник' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Пароль' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Подтвердите пароль' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Зарегистрироваться' })).toBeVisible();
    await expect(page.locator('a', { hasText: 'Вход' })).toBeVisible();
    console.log('✅ All signup page elements found');
  });

});