import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('div').filter({ hasText: /^跟朋友邊玩遊戲邊養成理想身材 ，跟咬一口貝果一樣輕鬆立即體驗$/ }).getByRole('button').click();
  await page.locator('input[name="mail"]').click();
  await page.locator('input[name="mail"]').fill('testingSupa1@gmail.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('testingSupa1');
  await page.getByRole('button', { name: '登入', exact: true }).click();
  await page.getByRole('link', { name: '創建試煉' }).click();
  await page.getByRole('link', { name: '跑步機30分鐘' }).click();
  await page.getByRole('textbox', { name: '夏天到了還沒瘦？' }).click();
  await page.getByRole('textbox', { name: '夏天到了還沒瘦？' }).fill('一起去跑步');
  await page.getByRole('textbox', { name: '夏天到了還沒瘦？' }).press('Enter');
  await page.getByRole('textbox', { name: '夏天到了還沒瘦？' }).fill('一起去跑步');
  await page.getByRole('button', { name: '請選擇日期' }).click();
  await page.getByRole('button', { name: 'Saturday, August 30th,' }).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').dblclick();
  await page.getByRole('button', { name: '創建試煉' }).click();
  await page.getByRole('link', { name: '我的試煉' }).click();
  await page.locator('.fixed.inset-0').click();
  await page.getByRole('heading', { name: '我的試煉' }).click();
  await page.getByText('運動已加入一起去跑步跑步機30').click();
  await expect(page.getByText('一起去跑步')).toBeVisible();
});