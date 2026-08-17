import { test } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
import DashboardPage from '../../pages/DashboardPage.js';
import EmployeeCreatePage from '../../pages/EmployeeCreatePage.js';
import EmployeeListPage from '../../pages/EmployeeListPage.js';
import EmployeeDetailsPage from '../../pages/EmployeeDetailsPage.js';
const employeeData = require('../../fixtures/employee.json');
const { getNextEmployeeCode } = require('../../utils/employeeData');


test.describe('Upload Functionality', () => {

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

    test('Use a valid fixture image stored inside the automation project.', async ({ page }) => {
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.uploadProfilePicture();
    });

    test('Verify the selected filename or upload state if the UI exposes it.', async ({ page }) => {
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.uploadProfilePicture();
    });

    test('Create the employee successfully, open Employee Details and verify the uploaded profile image is displayed.', async({page}) => {
        await dashboardPage.createEmployeeButtonClick();
        const employeeCode = getNextEmployeeCode();
        console.log('Employee Code:', employeeCode);
        await employeeCreatePage.verifyEmployeeCodeInput(employeeCode);
        await employeeCreatePage.verifyFirstNameValidation(employeeData.ValidEmployeeDetails.FirstName);
        await employeeCreatePage.verifyLastNameValidation(employeeData.ValidEmployeeDetails.LastName);
        await employeeCreatePage.verifyDepartmentValidation(employeeData.ValidEmployeeDetails.Department);
        await employeeCreatePage.verifyDesignationValidation(employeeData.ValidEmployeeDetails.Designation);
        await employeeCreatePage.verifyWorkEmailValidation(employeeData.ValidEmployeeDetails.WorkEmail);
        await employeeCreatePage.verifyJoiningDateValidation(employeeData.ValidEmployeeDetails.JoiningDate);
        await employeeCreatePage.verifyOfficeLocationValidation(employeeData.ValidEmployeeDetails.OfficeLocation);
        await employeeCreatePage.verifyAddressLine1Validation(employeeData.ValidEmployeeDetails.AddressLine1);
        await employeeCreatePage.verifyCityValidation(employeeData.ValidEmployeeDetails.City);
        await employeeCreatePage.verifyStateValidation(employeeData.ValidEmployeeDetails.State);
        await employeeCreatePage.verifyPostalCodeValidation(employeeData.ValidEmployeeDetails.PostalCode);
        await employeeCreatePage.verifyCountryValidation(employeeData.ValidEmployeeDetails.Country);
        await employeeCreatePage.uploadProfilePicture();
        await employeeCreatePage.verifyCreateAccountButtonValidation();
        await employeeListPage.verifyEmployeeDetailsPage();
        await employeeDetailsPage.verifyProfilePicture();
    });

    test('Include separate negative tests for unsupported file type and oversized upload', async({page}) => {
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidProfilePictureUpload();
        await employeeCreatePage.verifyInvalidProfilePictureAlertMessage();
        await dashboardPage.verifyDashboardClick();
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidLargerProfileImageUpload();
        await employeeCreatePage.verifyInvalidLargerPictureUpload();
    });
});