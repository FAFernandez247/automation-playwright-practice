import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
    // Locators
    public readonly homePage: Locator;
    public readonly signUpPage: Locator;
    public readonly newUserText: Locator;
    public readonly nameInput: Locator;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly signUpButton: Locator;
    public readonly enterAccText: Locator;
    public readonly titleMr: Locator;
    public readonly titleMrs: Locator;
    public readonly days: Locator;
    public readonly months: Locator;
    public readonly years: Locator;
    public readonly newsletter: Locator;
    public readonly offers: Locator;
    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly companyInput: Locator;
    public readonly address1Input: Locator;
    public readonly address2Input: Locator;
    public readonly countryInput: Locator;
    public readonly stateInput: Locator;
    public readonly cityInput: Locator;
    public readonly zipCodeInput: Locator;
    public readonly mobileNumberInput: Locator;
    public readonly createAccButton: Locator;
    public readonly accCreatedText: Locator;
    public readonly continueButton: Locator;
    public readonly loggedInAsText: Locator;
    public readonly deleteAccButton: Locator;
    public readonly accDeletedText: Locator;
    public readonly registerErrorText: Locator;

    constructor(public readonly page: Page) {
        this.homePage = page.locator('#slider');
        this.signUpPage = page.locator('a[href="/login"]');
        this.newUserText = page.getByText('New User Signup!');
        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.signUpButton = page.locator('[data-qa="signup-button"]');
        this.enterAccText = page.getByText('Enter Account Information');
        this.titleMr = page.locator('#id_gender1');
        this.titleMrs = page.locator('#id_gender2');
        this.days = page.locator('[data-qa="days"]');
        this.months = page.locator('[data-qa="months"]');
        this.years = page.locator('[data-qa="years"]');
        this.newsletter = page.locator('#newsletter');
        this.offers = page.locator('#optin');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.address1Input = page.locator('[data-qa="address"]');
        this.address2Input = page.locator('[data-qa="address2"]');
        this.countryInput = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipCodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
        this.createAccButton = page.locator('[data-qa="create-account"]');
        this.accCreatedText = page.getByText('Account Created!');
        this.continueButton = page.locator('[data-qa="continue-button"]');
        this.loggedInAsText = page.getByText('Logged in as');
        this.deleteAccButton = page.locator('a[href="/delete_account"]');
        this.accDeletedText = page.getByText('Account Deleted!');
        this.registerErrorText = page.getByText('Email Address already exist!');

    }

    async navigateTo() {
        await this.page.goto("https://www.automationexercise.com/");
        await this.page.waitForLoadState("domcontentloaded");
    }

    async verifyHomePage() {
        await expect(this.homePage).toBeVisible();
    }

    async navigateToSignUpPage() {
        await this.signUpPage.click();
    }

    async verifyNewUserText() {
        await expect(this.newUserText).toBeVisible();
        await expect(this.newUserText).toHaveText('New User Signup!');
    }

    /**
     * @param nameSignup - The username to sign in with
     * @param emailSignup - The email to sign in with
     * @param title - The title (Mr/Mrs) to select
     * @param passwordSignup - The password to sign in with
     * @param day - The day of birth to select
     * @param month - The month of birth to select
     * @param year - The year of birth to select
     * @param firstName - The first name to fill in personal details
     * @param lastName - The last name to fill in personal details
     * @param company - The company name to fill in personal details
     * @param address1 - The primary address to fill in personal details
     * @param address2 - The secondary address to fill in personal details
     * @param country - The country to select in personal details
     * @param state - The state to fill in personal details
     * @param city - The city to fill in personal details
     * @param zipCode - The zip code to fill in personal details
     * @param mobileNumber - The mobile number to fill in personal details
     */

    async signUp(nameSignup: string, emailSignup: string): Promise<void> {
        await this.nameInput.fill(nameSignup);
        await this.emailInput.fill(emailSignup);
        await this.signUpButton.click();
    }

    async verifyEnterAccText() {
        await expect(this.enterAccText).toBeVisible();
        await expect(this.enterAccText).toHaveText('Enter Account Information');
    }

    async fillDetails(title: string, passwordSignup: string, day: string, month: string, year: string): Promise<void> {
        if (title.toLowerCase() === "mr") {
        await this.titleMr.click();
        } else if (title.toLowerCase() === "mrs") {
            await this.titleMrs.click();
        } else {
            console.log(`Invalid title provided: ${title}`);
        }
        await this.passwordInput.fill(passwordSignup);
        await this.days.selectOption(day);
        await this.months.selectOption(month);
        await this.years.selectOption(year);
        await this.newsletter.check();
        await this.offers.check();
    }

    async fillPersonalDetails(firstName: string, lastName: string, company: string, address1: string, address2: string, country: string, state: string, city: string, zipCode: string, mobileNumber: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.address1Input.fill(address1);
        await this.address2Input.fill(address2);
        await this.countryInput.selectOption(country);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipCodeInput.fill(zipCode);
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async clickCreateAccButton() {
        await this.createAccButton.click();
    }

    async verifyAccCreatedText() {
        await expect(this.accCreatedText).toBeVisible();
        await expect(this.accCreatedText).toHaveText('Account Created!');
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async verifyLoggedInAsText(nameSignup: string): Promise<void> {
        await expect(this.loggedInAsText).toBeVisible();
        await expect(this.loggedInAsText).toHaveText(`Logged in as ${nameSignup}`);
    }

    async clickDeleteAccount() {
        await this.deleteAccButton.click();
    }

    async verifyAccDeletedText() {
        await expect(this.accDeletedText).toBeVisible();
        await expect(this.accDeletedText).toHaveText('Account Deleted!');
    }

    async verifyRegisterErrorText() {
        await expect(this.registerErrorText).toBeVisible();
        await expect(this.registerErrorText).toHaveText('Email Address already exist!');
    }
}
