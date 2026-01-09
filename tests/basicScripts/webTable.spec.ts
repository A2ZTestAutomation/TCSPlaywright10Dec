import { test, expect } from '@playwright/test'

test('Web Table test', { tag: ['@SmokeTest'] }, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables')
    const allRows = await page.locator('#table1 tbody tr').all()
    expect(allRows).toHaveLength(4)
    console.log('Total Rows ....', allRows.length)
    allRows.forEach(async (rows) => {
        const colsCount = await rows.locator('td').count()
        console.log('Column Count...', colsCount)
        expect(colsCount).toBeLessThan(7)
        expect(colsCount).toEqual(6)
    })

    //To get text from a particular row
    const table = page.locator('#table1 tbody')
    const rowTxt = await table.locator('tr').nth(2)
        .locator(':scope').allTextContents()
    rowTxt.forEach((txt) => {
        console.log(txt)
    })

    //To get the details for an emp
    const rowData = table.getByRole('row', { name: 'Frank' })
    console.log('rowData', await rowData.textContent())
})