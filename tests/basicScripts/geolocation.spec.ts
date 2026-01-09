import { test, expect } from '@playwright/test'
test.use(
    {
        locale: 'en-US',
        // geolocation: { longitude: 27.664827, latitude: -81.515755 }, // Antarctica
        geolocation: {
            longitude: -84.391502,
            latitude: 33.748550,
            accuracy: 80
        }, //Florida
        permissions: ['geolocation']
    })
test('Geolocation test', async ({ page }) => {
    await page.goto('https://oldnavy.gap.com/stores')
    await page.waitForTimeout(5000)

})