
import { test, expect } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
const testData = require('../../utils/testData.js');
const authHelper = require('../../helpers/authHelper.js');

test.describe('Signup Scenarios', () => {
    let signupPage;
    test.beforeEach(async ({ page }) => {
        signupPage=new SignupPage(page);
        await signupPage.navigate();
        await signupPage.pageRedirect();
    });

    test('Verify the Sign-Up page loads successfully', async ({page}) => {
        await expect(signupPage.usernameInput).toBeVisible();
        await expect(signupPage.passwordInput).toBeVisible();
        await expect(signupPage.rePasswordInput).toBeVisible();
        await expect(signupPage.createAccount).toBeVisible();
    });

    test('Verify all mandatory fields are visible.', async ({page}) => {
        await expect(signupPage.usernameInput).toBeVisible();
        await expect(signupPage.passwordInput).toBeVisible();
        await expect(signupPage.rePasswordInput).toBeVisible();
        await expect(signupPage.createAccount).toBeVisible();
    });


    test('Verify successful user registration with valid username and password.', async ({page}) => {
        const username = authHelper.generateUniqueUsername(testData.Signup.username);
        const password = testData.Signup.password;
        await signupPage.enterUsername(username);
        await signupPage.enterPassword(password);
        await signupPage.reEnterPassword(password);
        await signupPage.accountCreation();
        await signupPage.verifySuccess();
    });

    test('Verify required-field errors when mandatory values are empty.', async({page}) => { 
        await signupPage.accountCreation();
        await signupPage.verifyEmptyUsername();
        await signupPage.verifyEmptyPassword();
        await signupPage.verifyConfirmPassword();
    });

    test('Verify confirm-password mismatch validation', async({page}) => { 
        const username = testData.SignupInvalid.username;
        const password = testData.SignupInvalid.password;
        const rePassword = testData.SignupInvalid.confirmPassword;
        await signupPage.enterUsername(username);
        await signupPage.enterPassword(password);
        await signupPage.reEnterPassword(rePassword);
        await signupPage.verifyPasswordMismatch();
    });

    test('Verify duplicate username handling.', async({page}) => {
        const username = testData.DuplicateUsername.username;
        const password = testData.DuplicateUsername.password;
        const rePassword = testData.DuplicateUsername.confirmPassword;
        await signupPage.enterUsername(username);
        await signupPage.enterPassword(password);
        await signupPage.reEnterPassword(rePassword);
        await signupPage.accountCreation();
        await signupPage.verifyDuplicateUsername();
    });

    test('Verify validation messages disappear after values become valid.', async({page}) => { 
        await signupPage.accountCreation();
        await page.screenshot({path: 'screenshots/before-entry.png', fullPage: true});
        const username = testData.Signup.username + Date.now();
        const password = testData.Signup.password;
        await signupPage.enterUsername(username);
        await signupPage.enterPassword(password);
        await signupPage.reEnterPassword(password);
    });

    test('Verify navigation from Sign-Up to Sign-In.', async({page}) => { 
        const username = authHelper.generateUniqueUsername(testData.Signup.username);
        const password = testData.Signup.password;
        await signupPage.enterUsername(username);
        await signupPage.enterPassword(password);
        await signupPage.reEnterPassword(password);
        await signupPage.accountCreation();
        await signupPage.verifySuccess();
        await signupPage.enterUsername(username);
        await signupPage.enterPassword(password);
        await signupPage.verifySigninSubmitButton();
        await signupPage.verifyDashboardNavigation();
    });
});