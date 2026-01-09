import { test, expect } from '@playwright/test'
test.only('Handle JS Simple Alert', async ({ page }) => {
    await page.goto(" https://testautomationpractice.blogspot.com/")
    page.on("dialog", async (alertbox) => {
        const txt = alertbox.message()
        console.log("Display Text : " + txt)
        expect(alertbox.message()).toEqual('I am an alert box!')
        await alertbox.accept()

    })
    await page.locator("#alertBtn").click()

})
