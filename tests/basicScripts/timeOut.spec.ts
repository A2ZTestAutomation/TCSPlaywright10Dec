

import test, { expect } from "@playwright/test"
test('Mouse Actions', async ({ page }) => {
    test.setTimeout(40000)
    await page.goto('http://uitestingplayground.com/ajax')
    await page.locator('#ajaxButton').click()
    const dispTxt = await page.locator('.bg-success').textContent()
    expect(dispTxt).toEqual('Data loaded with AJAX get request.')

    expect(page.locator('.bg-success'))
        .toHaveText('Data loaded with AJAX get request.',
            { timeout: 20000 })
})
