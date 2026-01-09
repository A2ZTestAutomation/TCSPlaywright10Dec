import { Page, Locator } from '@playwright/test'
export default class ProductListPage {
    page: Page
    readonly productHeader: Locator
    readonly item1: Locator
    readonly item2: Locator
    readonly backToList: Locator
    readonly addToCart: Locator
    readonly cartLink: Locator

    constructor(page: Page) {
        this.productHeader = page.locator('[data-test="title"]')
        this.item1 = page.locator('[data-test="item-4-title-link"]')
        this.item2 = page.locator('[data-test="item-0-title-link"]')
        this.addToCart = page.getByRole('button', { name: 'Add to cart' })
        this.cartLink = page.locator('[data-test="shopping-cart-link"]')
        this.backToList = page.locator('#back-to-products')
    }
    async addItemsToCart() {
        await this.item1.click()
        await this.addToCart.click()
        await this.backToList.click()
        await this.item2.click()
        await this.addToCart.click()
        await this.backToList.click()
    }

    async navigateToCartPage() {
        await this.cartLink.click()
    }

    async isListPageDisplayed(): Promise<Locator> {
        return this.productHeader
    }

}

