import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    // Locators
    public readonly toLoginPage: Locator;
    public readonly loginToYourAccText: Locator;
    public readonly emailInputLogin: Locator;
    public readonly passwordInputLogin: Locator;
    public readonly loginButton: Locator;
    public readonly loggedInAsTextLogin: Locator;
    public readonly logoutButton: Locator;

    constructor(public readonly page: Page) {
        this.toLoginPage = page.locator('a[href="/login"]');
        this.loginToYourAccText = page.getByText('Login to your account');
        this.emailInputLogin = page.locator('[data-qa="login-email"]');
        this.passwordInputLogin = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.loggedInAsTextLogin = page.getByText('Logged in as');
        this.logoutButton = page.locator('a[href="/logout"]');
    }

    async navigateToLogin() {
        await this.toLoginPage.click();
    }

    async verifyLoginToYourAccText() {
        await expect(this.loginToYourAccText).toBeVisible();
    }

    /**
     * @param emailLogin - The email to sign in with
     * @param passwordLogin - The password to sign in with
     */

    async login(emailLogin: string, passwordLogin: string) {
        await this.emailInputLogin.fill(emailLogin);
        await this.passwordInputLogin.fill(passwordLogin);
        await this.loginButton.click();
    }

    async verifyLoggedInAsTextLogin(nameSignup: string): Promise<void> {
        await expect(this.loggedInAsTextLogin).toBeVisible();
        await expect(this.loggedInAsTextLogin).toHaveText(`Logged in as ${nameSignup}`);
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }
}
