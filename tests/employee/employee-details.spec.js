import { test } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
import EmployeeListPage from '../../pages/EmployeeListPage.js';
import EmployeeDetailsPage from '../../pages/EmployeeDetailsPage.js';
const employeeTestData = require('../../fixtures/employee.json');
const { employeeData } = employeeTestData;


test.describe('Employee Details Page', () => {

    let signupPage;
    let employeeListPage;
    let employeeDetailsPage;
    test.beforeEach(async ({ page }) => {
        signupPage=new SignupPage(page);
        employeeListPage=new EmployeeListPage(page);
        employeeDetailsPage = new EmployeeDetailsPage(page);
        await signupPage.navigate();
        
    });

    test('Verify employee details match the employee object created by the test', async ({ page }) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifyEmployeeListPageValidation();
        await employeeListPage.verifySearchEmployeeByCode(employeeData.employeeCode);
        await employeeListPage.verifyHorizontalScroll();
        await employeeListPage.verifyClickOnView(employeeData.employeeCode);
        await employeeDetailsPage.verifyEmployeeDetails(employeeData);
    });
});