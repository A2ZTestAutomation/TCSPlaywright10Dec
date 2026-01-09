
import test, { expect } from "@playwright/test"
test('Mouse Actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.getByRole('button', { name: 'Copy Text' }).scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: 'Copy Text' }).dblclick()
    const copiedTxt = await page.locator('input#field2').inputValue()
    expect(copiedTxt).toContain('Hello World!')

    //MouseHover
    await page.getByRole('button', { name: 'Point Me' }).hover()
    await page.getByRole('link', { name: 'Laptops' }).click()

    //right click
    await page.locator('input#field2').click({ button: 'right' })
    await page.dragAndDrop('#draggable', '#droppable')

    //Mouse scroll
    await page.mouse.wheel(0, 2000)
    await page.screenshot({
        fullPage: true,
        path: './files/fullPageImg.png'
    })
    await page.waitForTimeout(4000)

})