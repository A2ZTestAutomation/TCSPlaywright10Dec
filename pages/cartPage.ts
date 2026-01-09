import { Page, Locator } from '@playwright/test'
export default class CartPage {
    readonly page: Page
    readonly cartList: Locator
    readonly chkOutBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.cartList = this.page.locator('[data-test="inventory-item"]').first()
        this.chkOutBtn = this.page.getByRole('button', { name: 'Checkout' })
    }

    async isCartListDisp(): Promise<Locator> {
        return this.cartList
    }
    async checkOutItems() {
        await this.chkOutBtn.click()
    }

}