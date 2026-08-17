import { test, expect } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
import LoginPage from '../../pages/LoginPage.js';
import DashboardPage from '../../pages/DashboardPage.js';
const testData = require('../../utils/testData.js');
const authHelper = require('../../helpers/authHelper.js');

test.describe('Dashboard Page', () => {
    let signupPage;
    let loginPage;
    let dashboardPage;
    test.beforeEach(async ({ page }) => {
        signupPage=new SignupPage(page);
        loginPage=new LoginPage(page);
        dashboardPage=new DashboardPage(page);
        await signupPage.navigate();
    });

    test('Verify successfull navigation from dashboard page to new employee form page', async({page}) => {
        await dashboardPage.createEmployeeButtonClick();
        await dashboardPage.verifyNewEmployeeFormPage();
    });
});