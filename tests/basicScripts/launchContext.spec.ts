import { test, chromium } from "@playwright/test"

// test.use({ viewport: { width: 1000, height: 900 } })
test('Open Mulitple contexts', async () => {
    const browser = await chromium.launch({
        headless: false
    })
    const contextOne = await browser.newContext()
    // contextOne.waitForEvent('page')
    const pageOne = await contextOne.newPage()
    pageOne.setViewportSize({ width: 1000, height: 900 })
    await pageOne.goto('https://playwright.dev/')
    await pageOne.waitForTimeout(4000)
    // contextOne.close()

    const contextTwo = await browser.newContext()
    const pageTwo = await contextTwo.newPage()
    pageTwo.setViewportSize({ width: 800, height: 600 })
    // await pageTwo.goto('https://the-internet.herokuapp.com/upload')
    await pageTwo.goto('https://www.selenium.dev/')
    await pageTwo.waitForTimeout(4000)
    contextTwo.close()
})