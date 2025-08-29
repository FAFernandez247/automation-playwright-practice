import { test } from '../shared/base.ts';

const NAME = 'TestUser';
const EMAIL = 'test.user123@example.com';
const PASSWORD = 'password123';
const DAY = '1';
const MONTH = 'January';
const YEAR = '1990';
const FIRST_NAME = 'Test';
const LAST_NAME = 'User';
const COMPANY = 'Example Inc.';
const ADDRESS1 = '123 Main St';
const ADDRESS2 = 'Apt 4B';
const COUNTRY = 'United States';
const STATE = 'California';
const CITY = 'Los Angeles';
const ZIP_CODE = '90001';
const MOBILE_NUMBER = '09123456789';

test.describe('Registration Tests', () => {
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.navigateTo();
        await registerPage.verifyHomePage();
    });
    test('Register User', async ({registerPage}) => {
        await test.step('Click on "Signup/Login" button', async () => {
            await registerPage.navigateToSignUpPage();
        });
        await test.step('Verify "New User Signup!" is visible', async () => {
            await registerPage.verifyNewUserText();
        });
        await test.step('Enter name and email address', async () => {
            await registerPage.signUp(NAME, EMAIL);
        });
        await test.step('Verify "Enter Account Information" is visible', async () => {
            await registerPage.verifyEnterAccText();
        });
        await test.step('Fill details: Title, Password, Date of birth, Newsletter, Special offers', async () => {
            await registerPage.fillDetails(PASSWORD, DAY, MONTH, YEAR);
        });
        await test.step('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
            await registerPage.fillPersonalDetails(FIRST_NAME, LAST_NAME, COMPANY, ADDRESS1, ADDRESS2, COUNTRY, STATE, CITY, ZIP_CODE, MOBILE_NUMBER);
        });
        await test.step('Click "Create Account" button', async () => {
            await registerPage.clickCreateAccButton();
        });
        await test.step('Verify "ACCOUNT CREATED!" is visible', async () => {
            await registerPage.verifyAccCreatedText();
        });
        await test.step('Click "Continue" button', async () => {
            await registerPage.clickContinueButton();
        });
        await test.step('Verify "Logged in as" is visible', async () => {
            await registerPage.verifyLoggedInAsText(NAME);
        });
        await test.step('Click "Delete Account" button', async () => {
            await registerPage.clickDeleteAccount();
        });
        await test.step('Verify "ACCOUNT DELETED!" is visible', async () => {
            await registerPage.verifyAccDeletedText();
            await registerPage.clickContinueButton();
        });
    });
});