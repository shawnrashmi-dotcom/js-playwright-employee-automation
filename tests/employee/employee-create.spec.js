import { test, expect } from '@playwright/test';
import SignupPage from '../../pages/SignupPage.js';
import LoginPage from '../../pages/LoginPage.js';
import DashboardPage from '../../pages/DashboardPage.js';
import EmployeeCreatePage from '../../pages/EmployeeCreatePage.js';
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
    test.beforeEach(async ({ page }) => {
        signupPage=new SignupPage(page);
        loginPage=new LoginPage(page);
        dashboardPage=new DashboardPage(page);
        employeeCreatePage=new EmployeeCreatePage(page);
        await signupPage.navigate();
    });

    test('Submit the form without required values and verify required-field messages.', async({page}) => {
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.createEmployeeButtonOnNewEmployeeFormPageClick();
        await employeeCreatePage.verifyEmployeeCodeAlertMessage();
        await employeeCreatePage.verifyFirstNameAlertMessage();
        await employeeCreatePage.verifyLastNameAlertMessage();
        await employeeCreatePage.verifyDepartmentAlertMessage();
        await employeeCreatePage.verifyDesignationAlertMessage();
        await employeeCreatePage.verifyWorkEmailAlertMessage();
        await employeeCreatePage.verifyJoiningDateAlertMessage();
        await employeeCreatePage.verifyOfficeLocationAlertMessage();
        await employeeCreatePage.verifyAddressLine1AlertMessage();
        await employeeCreatePage.verifyCityAlertMessage();
        await employeeCreatePage.verifyStateAlertMessage();
        await employeeCreatePage.verifyPostalCodeAlertMessage();
        await employeeCreatePage.verifyCountryAlertMessage();
    });

    test('Enter an invalid email and verify the visible validation message.', async({page}) => { 
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidWorkEmailInput(randomData.InvalidWorkEmail.WorkEmail);
        await employeeCreatePage.verifyInvalidWorkEmailAlertMessage();
    });

    test('Enter an invalid phone number and verify the visible validation message.', async({page}) => {
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidPhoneInput(randomData.InvalidPhone.Phone);
        await employeeCreatePage.verifyInvalidPhoneAlertMessage();
    });

    test('Enter an invalid URL and verify the visible validation message.', async({page}) => {
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidPortfolioURLInput(randomData.InvalidPortfolioURL.PortfolioURL);
        await employeeCreatePage.verifyInvalidPortfolioURLAlertMessage();
    });

    test('Enter numeric values outside their allowed ranges and verify the error.', async({page}) => { 
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidAgeInput(randomData.InvalidAge.Age);
        await employeeCreatePage.verifyInvalidAgeAlertMessage();
    });

    test('Leave required dropdowns unselected and verify validation.', async({page}) => { 
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.createEmployeeButtonOnNewEmployeeFormPageClick();
        await employeeCreatePage.verifyDepartmentAlertMessage();
        await employeeCreatePage.verifyOfficeLocationAlertMessage();
        await employeeCreatePage.verifyCountryAlertMessage();
    });

    test('Leave required address fields empty and verify validation.', async({page}) => { 
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.createEmployeeButtonOnNewEmployeeFormPageClick();
        await employeeCreatePage.verifyAddressLine1AlertMessage();
        await employeeCreatePage.verifyCityAlertMessage();
        await employeeCreatePage.verifyStateAlertMessage();
        await employeeCreatePage.verifyPostalCodeAlertMessage();
        await employeeCreatePage.verifyCountryAlertMessage();
    });

    test('Upload an unsupported file type and verify rejection.', async({page}) => { 
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidProfilePictureUpload();
        await employeeCreatePage.verifyInvalidProfilePictureAlertMessage();
    });

    test('Upload a profile image larger than the allowed size and verify rejection.', async({page}) => {
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidLargerProfileImageUpload();
        await employeeCreatePage.verifyInvalidLargerPictureUpload();
    });

    test('Correct invalid values and verify their errors disappear without a full page reload.', async({page}) => {
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyInvalidFirstName(randomData.InvalidFirstName.FirstName);
        await employeeCreatePage.verifyInvalidFirstNameAlertMessage();
        await employeeCreatePage.verifyValidFirstName(randomData.ValidFirstName.FirstName);
        await employeeCreatePage.verifyValidFirstNameAlertMessage();
    });

    test('Attempt to create an employee using a duplicate Employee Code and verify the displayed error', async({page}) => { 
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyEmployeeCodeInput(employeeData.InvalidEmployeeDetails.employeeCode);
        await employeeCreatePage.verifyFirstNameValidation(employeeData.InvalidEmployeeDetails.FirstName);
        await employeeCreatePage.verifyLastNameValidation(employeeData.InvalidEmployeeDetails.LastName);
        await employeeCreatePage.verifyDepartmentValidation(employeeData.InvalidEmployeeDetails.Department);
        await employeeCreatePage.verifyDesignationValidation(employeeData.InvalidEmployeeDetails.Designation);
        await employeeCreatePage.verifyWorkEmailValidation(employeeData.InvalidEmployeeDetails.WorkEmail);
        await employeeCreatePage.verifyJoiningDateValidation(employeeData.InvalidEmployeeDetails.JoiningDate);
        await employeeCreatePage.verifyOfficeLocationValidation(employeeData.InvalidEmployeeDetails.OfficeLocation);
        await employeeCreatePage.verifyAddressLine1Validation(employeeData.InvalidEmployeeDetails.AddressLine1);
        await employeeCreatePage.verifyCityValidation(employeeData.InvalidEmployeeDetails.City);
        await employeeCreatePage.verifyStateValidation(employeeData.InvalidEmployeeDetails.State);
        await employeeCreatePage.verifyPostalCodeValidation(employeeData.InvalidEmployeeDetails.PostalCode);
        await employeeCreatePage.verifyCountryValidation(employeeData.InvalidEmployeeDetails.Country);
        await employeeCreatePage.verifyCreateAccountButtonValidation();
        await employeeCreatePage.verifyDuplicateEmployeeCodeValidation();
    });

    test('Submit an invalid form and verify the application focuses or clearly highlights the first invalid field.', async({page}) => { 
        await dashboardPage.createEmployeeButtonClick();
        await employeeCreatePage.verifyEmployeeCodeInput(employeeData.InvalidFormEmployeeDetails.employeeCode);
        await employeeCreatePage.verifyFirstNameValidation(employeeData.InvalidFormEmployeeDetails.FirstName);
        await employeeCreatePage.verifyLastNameValidation(employeeData.InvalidFormEmployeeDetails.LastName);
        await employeeCreatePage.verifyDepartmentValidation(employeeData.InvalidFormEmployeeDetails.Department);
        await employeeCreatePage.verifyDesignationValidation(employeeData.InvalidFormEmployeeDetails.Designation);
        await employeeCreatePage.verifyWorkEmailValidation(employeeData.InvalidFormEmployeeDetails.WorkEmail);
        await employeeCreatePage.verifyJoiningDateValidation(employeeData.InvalidFormEmployeeDetails.JoiningDate);
        await employeeCreatePage.verifyOfficeLocationValidation(employeeData.InvalidFormEmployeeDetails.OfficeLocation);
        await employeeCreatePage.verifyAddressLine1Validation(employeeData.InvalidFormEmployeeDetails.AddressLine1);
        await employeeCreatePage.verifyCityValidation(employeeData.InvalidFormEmployeeDetails.City);
        await employeeCreatePage.verifyStateValidation(employeeData.InvalidFormEmployeeDetails.State);
        await employeeCreatePage.verifyPostalCodeValidation(employeeData.InvalidFormEmployeeDetails.PostalCode);
        await employeeCreatePage.verifyCountryValidation(employeeData.InvalidFormEmployeeDetails.Country);
        await employeeCreatePage.verifyCreateAccountButtonValidation();
        await employeeCreatePage.verifyEmptyEmployeeCodeValidation();
    });
});
