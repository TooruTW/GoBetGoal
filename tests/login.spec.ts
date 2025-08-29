import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5175/');
  await page.getByRole('button', { name: '登入 / 註冊' }).click();
  await page.locator('input[name="mail"]').click();
  await page.locator('input[name="mail"]').fill('testing');
  await page.locator('input[name="mail"]').press('Shift+CapsLock');
  await page.locator('input[name="mail"]').fill('testingSupa1@gmail.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('testing');
  await page.locator('input[name="password"]').press('Shift+CapsLock');
  await page.locator('input[name="password"]').fill('testingSupa1');
  await page.getByRole('button', { name: '登入', exact: true }).click();
await expect(page.getByTestId('user')).toBeVisible();

});