import { test, expect } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
import LoginPage from '../../pages/LoginPage.js';
const testData = require('../../utils/testData.js');
const authHelper = require('../../helpers/authHelper.js');

test.describe('Login Scenarios', () => {
    let signupPage;
    let loginPage;
    test.beforeEach(async ({ page }) => {
        signupPage=new SignupPage(page);
        loginPage=new LoginPage(page);
        await signupPage.navigate();
    });

    test('Verify successful login with valid credentials.', async({page}) => {
        await loginPage.signinUsername(testData.Signin.username);
        await loginPage.signinPassword(testData.Signin.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifyDashboardNavigation();
    });

    test('Verify failure with an invalid username.', async({page}) => {
        await loginPage.signinUsername(testData.SigninInvalid.username);
        await loginPage.signinPassword(testData.SigninInvalid.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifySigninUsernameFailure();
    });

    test('Verify failure with an invalid password.', async({page}) => {
        await loginPage.signinUsername(testData.SigninInvalidPassword.username);
        await loginPage.signinPassword(testData.SigninInvalidPassword.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifySigninPasswordFailure();
    });

    test('Verify required-field validation.', async({page}) => {
        await loginPage.verifySigninSubmit();
        await loginPage.verifySigninUsernameFailure();
        await loginPage.verifySigninPasswordFailure();
    });

    test('Verify live validation behavior while typing', async ({page}) => {
        await loginPage.verifySigninSubmit();
        await loginPage.signinUsernameInput.fill('');
        await expect(loginPage.signinUsernameFailure).toBeVisible();
        await loginPage.signinUsernameInput.fill('abc');
        await expect(loginPage.signinUsernameFailure).not.toBeVisible();
        await loginPage.signinPasswordInput.fill('');
        await expect(loginPage.signinPasswordFailure).toBeVisible();
        await loginPage.signinPasswordInput.fill('abc');
        await expect(loginPage.signinPasswordFailure).not.toBeVisible();
    });

    test('Verify the authentication token is created in browser localStorage', async({page}) => {
        await loginPage.signinUsername(testData.Signin.username);
        await loginPage.signinPassword(testData.Signin.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifyDashboardNavigation();
        const token = await page.evaluate(() => {
        return localStorage.getItem('employee_mgmt_token');
        });
        console.log('Authentication token exists:', !!token);
        expect(token).not.toBeNull();
        expect(token).not.toBe('');      
    });

    test('Verify the stored authentication token is not empty', async({page}) => {
        await loginPage.signinUsername(testData.Signin.username);
        await loginPage.signinPassword(testData.Signin.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifyDashboardNavigation();
        const token = await page.evaluate(() => {
        return localStorage.getItem('employee_mgmt_token');
        });
        console.log('Authentication Token:', token);
        expect(token).not.toBeNull();
        expect(token.trim()).not.toBe('');
    });

    test('Remove authentication state and verify protected pages are no longer accessible', async ({ page }) => {
        await loginPage.signinUsername(testData.Signin.username);
        await loginPage.signinPassword(testData.Signin.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifyDashboardNavigation();
        let token;
        await page.evaluate(() => {
        localStorage.removeItem('employee_mgmt_token');
        localStorage.removeItem('employee_mgmt_user');
        localStorage.removeItem('employee_mgmt_expires_at');
        });
        await page.reload();
        if (!token) {
        await signupPage.navigate();
        }
        console.log('URL after refresh:', page.url());
        await expect(page).toHaveURL(/signin/);
    });

    test('Verify logout removes authentication information', async ({ page }) => {
        await loginPage.signinUsername(testData.Signin.username);
        await loginPage.signinPassword(testData.Signin.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifyDashboardNavigation();
        const authBeforeLogout = await page.evaluate(() => ({
        token: localStorage.getItem('employee_mgmt_token'),
        user: localStorage.getItem('employee_mgmt_user'),
        expires: localStorage.getItem('employee_mgmt_expires_at')
        }));
        console.log('Authentication before logout:', authBeforeLogout);
        expect(authBeforeLogout.token).not.toBeNull();
        expect(authBeforeLogout.user).not.toBeNull();
        expect(authBeforeLogout.expires).not.toBeNull();
        await loginPage.verifyLogoutButtonClick();
        const authAfterLogout = await page.evaluate(() => ({
        token: localStorage.getItem('employee_mgmt_token'),
        user: localStorage.getItem('employee_mgmt_user'),
        expires: localStorage.getItem('employee_mgmt_expires_at')
        }));
        console.log('Authentication after logout:', authAfterLogout);
        expect(authAfterLogout.token).toBeNull();
        expect(authAfterLogout.user).toBeNull();
        expect(authAfterLogout.expires).toBeNull();
    });

    test('Verify logout redirects the user to the Sign-In page.', async({page}) => {
        await loginPage.signinUsername(testData.Signin.username);
        await loginPage.signinPassword(testData.Signin.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifyDashboardNavigation();
        await loginPage.verifyLogoutButtonClick();
        await loginPage.verifyLogoutAssertion();
    });
});
