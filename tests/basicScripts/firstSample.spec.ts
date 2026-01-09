import { test, expect } from 'playwright/test'

test.describe('Various Locators sample', () => {

    test.beforeEach('Launch App', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })
    test('First Sample', async ({ page }) => {

        await expect(page).toHaveTitle('Automation Testing Practice')
        await page.getByRole('link', { name: 'PlaywrightPractice' }).click()
        // const username = page.locator('#username')
        const username = page.getByLabel('Username:')
        await username.fill('TestUser')
        // console.log(await username.textContent())
        const txtValue = await username.inputValue()
        expect(username).toBeVisible()
        expect(txtValue).toEqual('TestUser')
        // username.innerText()
        await page.getByPlaceholder('Enter your full name').fill('Training')
        await page.getByText('START').click()

    })

    test('Locators using for loop', async ({ page }) => {

        const listItems = page.locator('div#PageList2 ul li')
        console.log('Getting text of all LIs using allText',
            await listItems.allTextContents())
        console.log('Getting text of all LIs using InnerText',
            await listItems.allInnerTexts())
        const numOfItems = await listItems.count()
        expect(listItems).toHaveCount(5)
        // //Method 1 - to get all text and select a particular value
        for (let i = 0; i < numOfItems; i++) {
            const itemTxt = await listItems.nth(i).textContent()
            console.log("Each Item's text", itemTxt)
            if (itemTxt?.includes("PlaywrightPractice")) {
                await listItems.nth(i).click()
                expect(page).toHaveTitle(/PlaywrightPractice/)
                await page.waitForTimeout(1000)
                break
            }
        }
    })

    test('Using filters', async ({ page }) => {
        //Method2 - to get all text
        const newLists = page.locator('div#PageList1 ul li')
        const texts = await newLists.evaluateAll(list =>
            list.map(element => element.textContent));
        console.log('All Text contents from Map: ', texts)
        //Method3  - Using navigation methods
        // await newLists.last().click()
        // await newLists.first().click()
        // await newLists.nth(2).click()
        // //Method4 - Using filter to select an element
        await newLists.filter({ hasText: 'Hidden Elements & AJAX' }).click()
    })
})