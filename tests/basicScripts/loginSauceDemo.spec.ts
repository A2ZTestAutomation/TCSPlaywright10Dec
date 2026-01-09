import { test, expect } from '@playwright/test'
import { users } from '../../testData/users.json'

test.skip('Valid Login Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(users.username);
    await page.locator('[data-test="password"]').fill(users.password);
    await page.locator('[data-test="login-button"]').click();
    expect(page.locator('[data-test="title"]')).toContainText('Products')
})

users.forEach((user, index) => {
    test.skip(`Valid Login - Iteration: ${index + 1}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        await page.locator('[data-test="username"]').fill(users[index].username);
        await page.locator('[data-test="password"]').fill(users[index].password);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toBeVisible();
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    })
})

test('Valid Login Test - using storagestage', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill("");
    await page.locator('[data-test="password"]').fill("");
    await page.locator('[data-test="login-button"]').click();
    expect(page.locator('[data-test="title"]')).toContainText('Products')
})