import { test as setup, expect } from '@playwright/test';
import SignupPage from '../pages/SignupPage.js';
import LoginPage from '../pages/LoginPage.js';
const testData = require('../utils/testData.js');
const authHelper = require('../helpers/authHelper.js');

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
        const signupPage=new SignupPage(page);
        const loginPage=new LoginPage(page);
        await signupPage.navigate();
        await loginPage.signinUsername(testData.Signin.username);
        await loginPage.signinPassword(testData.Signin.password);
        await loginPage.verifySigninSubmit();
        await loginPage.verifyDashboardNavigation();
        await page.context().storageState({
        path: authFile
        });
        console.log('Authentication state saved to:', authFile);
});