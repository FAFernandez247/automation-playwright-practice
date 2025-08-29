import { test as base, expect, request } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';

// This file is used to set up the base test environment
// It will be used to create a custom test fixture that can be reused across tests
// For example, it can be used to create a login page fixture that can be reused across tests

type MyFixtures = {
    registerPage: RegisterPage;
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    // Can add more fixtures here as needed
});

export { expect } from '@playwright/test';