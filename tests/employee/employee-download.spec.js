import { test,expect } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
import DashboardPage from '../../pages/DashboardPage.js';
import EmployeeCreatePage from '../../pages/EmployeeCreatePage.js';
import EmployeeListPage from '../../pages/EmployeeListPage.js';
import EmployeeDetailsPage from '../../pages/EmployeeDetailsPage.js';
const employeeData = require('../../fixtures/employee.json');
const { getNextEmployeeCode } = require('../../utils/employeeData');


test.describe('Download Functionality', () => {

    let signupPage;
    let dashboardPage;
    let employeeCreatePage;
    let employeeListPage;
    let employeeDetailsPage;
    test.beforeEach(async ({ page }) => {
        signupPage=new SignupPage(page);
        dashboardPage = new DashboardPage(page);
        employeeCreatePage = new EmployeeCreatePage(page);
        employeeListPage=new EmployeeListPage(page);
        employeeDetailsPage = new EmployeeDetailsPage(page);
        await signupPage.navigate();
        
    });

    test('Employee CSV Download', async ({ page }) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        const result = await employeeListPage.downloadEmployeeListCsv();
        expect(result.fileName).toMatch(/\.csv$/i);
        console.log('Filename:', result.fileName);
        console.log('File path:', result.filePath);
    });

    test('Employee JSON Download', async ({ page }) => {
        await employeeListPage.verifyEmployeesListButtonClick();
        await employeeListPage.verifySearchEmployeeByCode(employeeData.SearchByEmployeeCode.employeeCode);
        await employeeListPage.verifyHorizontalScroll();
        await employeeListPage.verifyClickOnView(employeeData.employeeData.employeeCode);
        await employeeListPage.verifyEmployeeDetailsPage();
        const downloadResult =await employeeDetailsPage.downloadEmployeeJson();
        console.log('Filename:', downloadResult.fileName);
        console.log('File path:', downloadResult.filePath);
        const downloadedData = await employeeDetailsPage.verifyJsonDownload(downloadResult);
        await employeeDetailsPage.verifyDownloadedEmployeeData(downloadedData.employeeData, employeeData.employeeData);
    });
});