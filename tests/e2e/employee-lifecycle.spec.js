import { test, expect } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
import LoginPage from '../../pages/LoginPage.js';
import DashboardPage from '../../pages/DashboardPage.js';
import EmployeeCreatePage from '../../pages/EmployeeCreatePage.js';
import EmployeeListPage from '../../pages/EmployeeListPage.js';
import EmployeeDetailsPage from '../../pages/EmployeeDetailsPage.js';
const testData = require('../../utils/testData.js');
const authHelper = require('../../helpers/authHelper.js');
const randomData = require('../../utils/randomData.js');
const employeeData = require('../../fixtures/employee.json');
const { getNextEmployeeCode } = require('../../utils/employeeData');

test.describe('New Employee Form Page', () => {
    let signupPage;
    let loginPage;
    let dashboardPage;
    let employeeCreatePage;
    let employeeListPage;
    let employeeDetailsPage;
    test.beforeEach(async ({ page }) => {
        signupPage=new SignupPage(page);
        loginPage=new LoginPage(page);
        dashboardPage=new DashboardPage(page);
        employeeCreatePage=new EmployeeCreatePage(page);
        employeeListPage=new EmployeeListPage(page);
        employeeDetailsPage = new EmployeeDetailsPage(page);
        await signupPage.navigate();
    });

test('E2E Positive Employee Creation Flow', async({page}) => { 
        await dashboardPage.createEmployeeButtonClick();
        const nextEmployeeCode = getNextEmployeeCode();
        console.log('Next Employee Code:', nextEmployeeCode);
        await employeeCreatePage.verifyEmployeeCodeInput(employeeData.ValidEmployeeDetails.employeeCode);
        await employeeCreatePage.verifyFirstNameValidation(employeeData.ValidEmployeeDetails.FirstName);
        await employeeCreatePage.verifyLastNameValidation(employeeData.ValidEmployeeDetails.LastName);
        await employeeCreatePage.verifyDepartmentValidation(employeeData.ValidEmployeeDetails.Department);
        await employeeCreatePage.verifyDesignationValidation(employeeData.ValidEmployeeDetails.Designation);
        await employeeCreatePage.verifyWorkEmailValidation(employeeData.ValidEmployeeDetails.WorkEmail);
        await employeeCreatePage.verifyPhone(employeeData.ValidEmployeeDetails.PhoneNumber);
        await employeeCreatePage.verifyJoiningDateValidation(employeeData.ValidEmployeeDetails.JoiningDate);
        await employeeCreatePage.verifyOfficeLocationValidation(employeeData.ValidEmployeeDetails.OfficeLocation);
        await employeeCreatePage.verifyAddressLine1Validation(employeeData.ValidEmployeeDetails.AddressLine1);
        await employeeCreatePage.verifyCityValidation(employeeData.ValidEmployeeDetails.City);
        await employeeCreatePage.verifyStateValidation(employeeData.ValidEmployeeDetails.State);
        await employeeCreatePage.verifyPostalCodeValidation(employeeData.ValidEmployeeDetails.PostalCode);
        await employeeCreatePage.verifyCountryValidation(employeeData.ValidEmployeeDetails.Country);
        await employeeCreatePage.uploadProfilePicture(employeeData.employeeData.profilePicture);
        await employeeCreatePage.verifyCreateAccountButtonValidation();
        await employeeListPage.verifyEmployeeDetailsPage();
        const actualEmployeeCode = await employeeDetailsPage.getEmployeeCode();
        console.log('Actual Employee Code:', actualEmployeeCode);
        const downloadResult = await employeeDetailsPage.downloadEmployeeJson();
        const jsonResult = await employeeDetailsPage.verifyJsonDownload(downloadResult);
        const expectedEmployee = {
            employeeCode: actualEmployeeCode,
            firstName: employeeData.ValidEmployeeDetails.FirstName,
            lastName: employeeData.ValidEmployeeDetails.LastName,
            department: employeeData.ValidEmployeeDetails.Department,
            designation: employeeData.ValidEmployeeDetails.Designation
        };
        expect(jsonResult.fileName).toBe(`${actualEmployeeCode}.json`);
        await employeeDetailsPage.verifyDownloadedEmployeeData(jsonResult.employeeData, expectedEmployee);
        await employeeDetailsPage.verifyLogoutButtonClick();
    });
});