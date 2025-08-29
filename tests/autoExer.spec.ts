import { test } from '../shared/base.ts';

const TITLE = 'Mrs';
const NAME = 'TestUser';
const EMAIL = 'test.user123@example.com';
const PASSWORD = 'Test@1234';
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
const PRODUCT_ID = 1;

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
            await registerPage.fillDetails(TITLE, PASSWORD, DAY, MONTH, YEAR);
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
    test('Register User with existing email', async ({ registerPage }) => {
        await test.step('Click on "Signup/Login" button', async () => {
            await registerPage.navigateToSignUpPage();
        });
        await test.step('Verify "New User Signup!" is visible', async () => {
            await registerPage.verifyNewUserText();
        });
        await test.step('Enter name and already registered email address', async () => {
            await registerPage.signUp('JohnDoe', EMAIL);
        });
        await test.step('Verify error "Email Address already exist!" is visible', async () => {
            await registerPage.verifyRegisterErrorText();
        });
    });
});

test.describe('Login Tests', () => {
    test.beforeEach(async ({ registerPage, loginPage }) => {
        await registerPage.navigateTo();
        await registerPage.verifyHomePage();
        await registerPage.navigateToSignUpPage();
        await registerPage.signUp(NAME, EMAIL);
        await registerPage.fillDetails(TITLE, PASSWORD, DAY, MONTH, YEAR);
        await registerPage.fillPersonalDetails(FIRST_NAME, LAST_NAME, COMPANY, ADDRESS1, ADDRESS2, COUNTRY, STATE, CITY, ZIP_CODE, MOBILE_NUMBER);
        await registerPage.clickCreateAccButton();
        await registerPage.verifyAccCreatedText();
        await registerPage.clickContinueButton();
        await registerPage.verifyLoggedInAsText(NAME);
        await loginPage.clickLogoutButton();
    });
    test('Login User with correct email and password', async ({ registerPage, loginPage }) => {
        await test.step('Navigate to url', async () => {
            await registerPage.navigateTo();
        });
        await test.step('Verify that home page is visible successfully', async () => {
            await registerPage.verifyHomePage();
        });
        await test.step('Click on "Signup/Login" button', async () => {
            await loginPage.navigateToLogin();
        });
        await test.step('Verify "Login to your account" is visible', async () => {
            await loginPage.verifyLoginToYourAccText();
        });
        await test.step('Enter correct email address and password', async () => {
            await loginPage.login(EMAIL, PASSWORD);
        });
        await test.step('Verify that "Logged in as username" is visible', async () => {
            await loginPage.verifyLoggedInAsTextLogin(NAME);
        });
        await test.step('Click on "Delete Account" button', async () => {
            await registerPage.clickDeleteAccount();
        });
        await test.step('Verify "ACCOUNT DELETED!" is visible', async () => {
            await registerPage.verifyAccDeletedText();
            await registerPage.clickContinueButton();
        });
    });

    test('Login User with incorrect email and password', async ({ registerPage, loginPage }) => {
        await test.step('Navigate to url', async () => {
            await registerPage.navigateTo();
        });
        await test.step('Verify that home page is visible successfully', async () => {
            await registerPage.verifyHomePage();
        });
        await test.step('Click on "Signup/Login" button', async () => {
            await loginPage.navigateToLogin();
        });
        await test.step('Verify "Login to your account" is visible', async () => {
            await loginPage.verifyLoginToYourAccText();
        });
        await test.step('Enter incorrect email address and password', async () => {
            await loginPage.login('wrong@example.com', 'wrongpassword');
        });
        await test.step('Verify error "Your email or password is incorrect!" is visible', async () => {
            await loginPage.verifyLoginErrorText();
        });
    });
    test('Logout User', async ({ registerPage, loginPage }) => {
        await test.step('Navigate to url', async () => {
            await registerPage.navigateTo();
        });
        await test.step('Verify that home page is visible successfully', async () => {
            await registerPage.verifyHomePage();
        });
        await test.step('Click on "Signup/Login" button', async () => {
            await loginPage.navigateToLogin();
        });
        await test.step('Verify "Login to your account" is visible', async () => {
            await loginPage.verifyLoginToYourAccText();
        });
        await test.step('Enter correct email address and password', async () => {
            await loginPage.login(EMAIL, PASSWORD);
        });
        await test.step('Verify that "Logged in as username" is visible', async () => {
            await loginPage.verifyLoggedInAsTextLogin(NAME);
        });
        await test.step('Click "Logout" button', async () => {
            await loginPage.clickLogoutButton();
        });
        await test.step('Verify that user is navigated to login page ', async () => {
            await loginPage.verifyLoginPage();
        });
    });
});

test.describe('Product Tests', () => {
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.navigateTo();
        await registerPage.verifyHomePage();
    });
    test('Verify All Products and product detail page', async ({ productPage }) => {
        await productPage.clickProductsButton();
        await productPage.verifyProductsPage();
        await productPage.verifyProductListVisible();
        await productPage.clickProductById(PRODUCT_ID);
        await productPage.verifyProductDetailsPage(PRODUCT_ID);
        await productPage.verifyProductDetailsContent();
    });
});