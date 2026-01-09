import { test, expect } from '@playwright/test'
import { items } from '../../testData/items.json'
test.describe('User Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.demoblaze.com/')
    })
    test('Valid Login Test', async ({ page }) => {
        // await page.waitForTimeout(5000)
        await expect(page.getByRole('link', { name: 'Welcome' })).toBeVisible()
    })
    items.forEach((item, index) => {
        test(`Add Item - Iteration: ${index + 1}`, async ({ page }) => {
            await page.getByRole('link', { name: 'Home (current)' }).click();
            await page.getByRole('link', { name: items[index].name }).click()
            page.on('dialog', async productAlert => {
                await productAlert.accept()
            })
            await page.getByRole('link', { name: 'Add to cart' }).click()
        })
    })
    test('View Cart', async ({ page }) => {
        // await page.waitForTimeout(5000)
        await page.getByRole('link', { name: 'Cart' }).click()
        await page.waitForTimeout(5000)
    })




})