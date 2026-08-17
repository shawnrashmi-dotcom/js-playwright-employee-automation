import { test, expect } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
import EmployeeListPage from '../../pages/EmployeeListPage.js';
const employeeData = require('../../fixtures/employee.json');


test.describe('Employee List Page', () => {
    let signupPage;
    let employeeListPage;
    test.beforeEach(async ({ page }) => {
        signupPage=new SignupPage(page);
        employeeListPage=new EmployeeListPage(page);
        await signupPage.navigate();  
    });

    test('Verify the Employee List page loads and employee table is visible', async({page}) => { 
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifyEmployeeListPageValidation();
    });

    test('Verify expected table headers are displayed', async ({ page }) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifyExpectedTableHeaders();
    });

    test('Verify at least one employee row can be rendered when data exists', async ({ page }) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifyAtLeastOneEmployeeRowIsRendered();
    });

    test('Verify the employee created by automation appears in the list.', async({page}) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifyEmployeeCreatedByAutomationAppears('1009');
    });

    test('Search using Employee Name.', async({page}) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifySearchEmployeeByName(employeeData.SearchByName.FirstName);
    });

    test('Search using Employee Code.', async({page}) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifySearchEmployeeByCode(employeeData.SearchByEmployeeCode.employeeCode);
    });

    test('Search using Email', async({page}) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifySearchEmployeeByCode(employeeData.SearchByEmail.WorkEmail);
    });

    test('Verify a nonexistent search produces the expected empty-state behavior', async({page}) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifySearchByInvalidName(employeeData.SearchByInvalidName.FirstName);
    });

    test('Verify horizontally scrollable columns where applicable', async ({ page }) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifyHorizontalScroll();
    });

    test('Verify employee count where available.', async ({ page }) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifyEmployeeCount();
    });

    test('Open a selected employee from the table.', async({page}) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifySearchEmployeeByCode(employeeData.SearchByEmployeeCode.employeeCode);
        await employeeListPage.verifyHorizontalScroll();
        await employeeListPage.verifyClickOnView(employeeData.employeeData.employeeCode);
        await employeeListPage.verifyEmployeeDetailsPage();
    });
});