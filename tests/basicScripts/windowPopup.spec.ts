import test, { expect } from "@playwright/test"


test('New Tab Window Test', async ({ page }) => {
    await page.goto('https://demoqa.com/browser-windows')
    const popupPromise = page.waitForEvent('popup')
    await page.locator('#tabButton').click()
    const popupObj = await popupPromise
    // expect(popupObj.url()).toContain('sample')
    expect(popupObj).toHaveURL('https://demoqa.com/sample')
    const pageHeading = popupObj.locator('#sampleHeading')
    await expect(pageHeading).toContainText('sample page')
    await popupObj.close()
    await page.waitForTimeout(3000)

})