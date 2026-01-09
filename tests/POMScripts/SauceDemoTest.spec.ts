import { test, expect } from '@playwright/test'
import LoginPage from '../../pages/LoginPage'
import ProductListPage from '../../pages/ProductListPage'
import CartPage from '../../pages/cartPage'

test.describe('SauceDemo End-to-end Test', async () => {
    let loginPage: LoginPage
    let listPage: ProductListPage
    let cartPage: CartPage
    test.beforeEach('Setting context', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        loginPage = new LoginPage(page)
        listPage = new ProductListPage(page)
        cartPage = new CartPage(page)
        await loginPage.loginIntoApp('standard_user', 'secret_sauce')
        await page.waitForTimeout(5000)
        expect(await listPage.isListPageDisplayed()).toBeVisible()
    })

    test('Add Items to Cart', async ({ page }) => {
        await listPage.addItemsToCart()
        await listPage.navigateToCartPage()
        expect(await cartPage.isCartListDisp()).toBeVisible()
    })


}) 