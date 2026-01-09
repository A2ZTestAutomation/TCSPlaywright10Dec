import { test, expect } from '@playwright/test'
// test.describe.configure({
//     mode: 'serial'
// })
test.describe('Checkbox, Radio and Dropdown sample', () => {
    // test.describe.configure({ retries: 2 });
    test.beforeEach('Launch App', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
        //While using baseURL
        // await page.goto('/')
    })

    test('CheckBox Test', async ({ page }) => {
        await page.getByRole('checkbox', { name: 'Sunday' }).check()
        await page.getByRole('checkbox', { name: 'Monday' }).check()
        const dayThree = page.getByRole('checkbox', { name: 'Tuesday' })
        await expect(dayThree).not.toBeChecked()
        await dayThree.check()
        // page.pause()
        await expect(dayThree).toBeChecked()
        // await expect(dayThree).not.toBeChecked()
        await dayThree.uncheck()
    })

    test('RadioButton Test', async ({ page }) => {
        await page.getByLabel('Male', { exact: true }).check()
    })
    test('Dropdown Test', async ({ page }) => {
        // test.slow()
        const dropdown = page.locator('#country')
        await dropdown.scrollIntoViewIfNeeded()
        await dropdown.selectOption({
            // value: 'usa'
            index: 4
        }).then((dropdownValue) => {
            expect(dropdownValue).toEqual(['france'])
        })
        //Multiple options
        await page.locator('#animals').scrollIntoViewIfNeeded()
        await page.selectOption('#animals',
            [
                { label: 'Cat' },
                { value: 'elephant' },
                { index: 8 }
            ])
        // await page.waitForTimeout(5000)
    })
})
