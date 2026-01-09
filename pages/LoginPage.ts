import { Page, Locator } from '@playwright/test'
export default class LoginPage {
    page: Page
    readonly uname: Locator
    readonly pwd: Locator
    readonly loginBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.uname = page.locator('[data-test="username"]')
        this.pwd = page.locator('[data-test="password"]')
        this.loginBtn = page.locator('[data-test="login-button"]')
    }

    async loginIntoApp(strUser: string, strPwd: string) {
        await this.uname.fill(strUser)
        await this.pwd.fill(strPwd)
        await this.loginBtn.click()
    }


}