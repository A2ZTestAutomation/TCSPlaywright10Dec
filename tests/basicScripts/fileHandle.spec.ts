import test, { expect } from "@playwright/test"
test.describe('File upload and download Test', () => {
    // test.beforeAll(async () => {


    // })
    // test.afterAll(async () => {

    // })
    const filepath = './files/fullPageImg.png'
    test('File Upload Test', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        // const fileChooserPromise = page.waitForEvent('filechooser')
        // await page.locator('#file-upload').click()
        // const filechooser = await fileChooserPromise
        // await filechooser.setFiles(filepath)
        // await page.waitForTimeout(2000)
        // await page.locator('#file-submit').click()
        // await page.waitForTimeout(5000)

        //Method 2
        await page.locator('#file-upload').setInputFiles(filepath)
        await page.waitForTimeout(2000)
        await page.locator('#file-submit').click()
        await page.waitForTimeout(5000)


    })

    test('File download Test', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download')
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            await page.getByRole('link', { name: 'some-file.txt' }).click()
        ])
        await download.saveAs('./downloadFiles/textFile.txt')
    })

})
