import { expect } from '@playwright/test';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
const path = require('path');

class EmployeeCreatePage {

    constructor(page) {

        this.page=page; 

        this.createEmployeeButton = page.getByRole('button', {name: 'Create Employee', exact: true});

        this.employeeCodeValidation = page.getByLabel('Employee Code');

        this.duplicateEmployeeCodeValidation = page.getByRole('alert');

        this.emptyEmployeeCodeValidation = page.getByText('Employee code is required.', {exact:true});

        this.verifyFirstName = page.getByText('First name must be at least 2 characters.');

        this.firstNameValidation = page.getByLabel('First Name');

        this.verifyLastName = page.getByText('Last name is required.');

        this.lastNameValidation = page.getByLabel('Last Name');

        this.verifyDepartment = page.getByText('Select a department.');

        this.DepartmentValidation = page.getByLabel('Department');

        this.verifyDesignation = page.getByPlaceholder('Software Engineer');

        this.designationValidation = page.getByLabel('Designation');

        this.verifyWorkEmail = page.getByPlaceholder('employee@company.com');

        this.workEmailValidation = page.getByLabel('Work Email');

        this.joiningDate = page.getByText('Joining date is required.');

        this.joiningDateValidation = page.getByLabel('Joining Date');

        this.officeLocationValidation = page.getByLabel('Office Location');

        this.officeLocation = page.getByText('Select an office location.');

        this.addressLine1 = page.getByPlaceholder('Street and building');

        this.addressLine1Validation = page.getByLabel('Address Line 1');

        this.city = page.getByText('City is required.');

        this.cityValidation = page.getByLabel('City');

        this.state = page.getByText('State is required.');

        this.stateValidation = page.getByLabel('State');

        this.postalCodeValidation = page.getByLabel('Postal Code');

        this.postalCode = page.getByText('Postal code is required.');

        this.country = page.getByText('Select a country.');

        this.countryValidation = page.getByLabel('Country');

        this.invalidWorkEmail = page.locator('//input[@id="workEmail"]');

        this.invalidWorkEmailAlert = page.getByText('Enter a valid work email.');

        this.invalidPhone = page.getByPlaceholder('+91 9876543210');

        this.invalidPhoneAlert = page.getByText('Enter a valid phone number.');

        this.invalidPortfolioURL = page.getByPlaceholder('https://example.com');

        this.invalidPortfolioURLAlert = page.getByText('Enter a complete URL including https://');

        this.invalidAgeInput = page.getByLabel('Age', {exact:true});

        this.invalidAgeAlert = page.getByText('Age must be 80 or less.');

        this.profilePictureUpload = page.locator('//input[@type="file"]');

        this.verifyprofilePictureAlert = page.getByText('Profile picture must be an image file.');

        this.verifyProfileLargerImageAlert = page.getByText('Profile picture must be 5 MB or smaller.');

        this.firstNameValidation = page.getByLabel('First Name');

        this.firstNameValidationAlert = page.getByText('First name must be at least 2 characters.');

        this.createEmployeeButtonValidation = page.getByRole('button', {name:'Create Employee', exact:true});

        this.employeeListPageRedirectValidation = page.getByText('Employee profile');

        this.profilePictureInput = page.getByLabel('Profile Picture');

        this.uploadedFileName = this.page.getByText('profile-image.jpg');

        this.phone = page.getByRole('textbox', { name: 'Phone', exact: true });
    }

    async createEmployeeButtonOnNewEmployeeFormPageClick()
    {
        await this.createEmployeeButton.click();
    }

    async verifyEmployeeCodeInput(code)
    {
        await this.employeeCodeValidation.fill(String(code));
        await expect(this.employeeCodeValidation).toBeVisible();
    }

    async verifyEmployeeCodeAlertMessage()
    {
        await expect(this.employeeCodeValidation).toBeVisible();
    }

    async verifyFirstNameValidation(firstname)
    {
        await this.firstNameValidation.fill(firstname);
        await expect(this.firstNameValidation).toBeVisible();
    }

    async verifyFirstNameAlertMessage()
    {
        await expect(this.verifyFirstName).toBeVisible();
    }

    async verifyLastNameValidation(lastname)
    {
        await this.lastNameValidation.fill(lastname);
        await expect(this.lastNameValidation).toBeVisible();
    }

    async verifyLastNameAlertMessage()
    {
        await expect(this.verifyLastName).toBeVisible();
    }

    async verifyDepartmentValidation(department)
    {
        await this.DepartmentValidation.selectOption({label: department});
        await expect(this.DepartmentValidation).toBeVisible();
    }

    async verifyDepartmentAlertMessage()
    {
        await expect(this.verifyDepartment).toBeVisible();
    }

    async verifyDesignationAlertMessage()
    {
        await expect(this.verifyDesignation).toBeVisible();
    }

    async verifyDesignationValidation(designation)
    {
        await this.designationValidation.fill(designation);
        await expect(this.designationValidation).toBeVisible();
    }

    async verifyWorkEmailAlertMessage()
    {
        await expect(this.verifyWorkEmail).toBeVisible();
    }

    async verifyWorkEmailValidation(workemail)
    {
        await this.workEmailValidation.fill(workemail);
        await expect(this.workEmailValidation).toBeVisible();
    }

    async verifyJoiningDateValidation(joiningdate)
    {
        const [day, month, year] = joiningdate.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        await this.joiningDateValidation.fill(formattedDate);
        await expect(this.joiningDateValidation).toBeVisible();
    }

    async verifyJoiningDateAlertMessage()
    {
        await expect(this.joiningDate).toBeVisible();
    }

    async verifyOfficeLocationValidation(officelocation)
    {
        await this.officeLocationValidation.selectOption({label:officelocation});
        await expect(this.officeLocationValidation).toBeVisible();
    }
    async verifyOfficeLocationAlertMessage()
    {
        await expect(this.officeLocation).toBeVisible();
    }

    async verifyAddressLine1Validation(addressline1)
    {
        await this.addressLine1Validation.fill(addressline1);
        await expect(this.addressLine1Validation).toBeVisible();
    }

    async verifyAddressLine1AlertMessage()
    {
        await expect(this.addressLine1).toBeVisible();
    }

    async verifyCityValidation(city) 
    {
        await this.cityValidation.fill(city);
        await expect(this.cityValidation).toBeVisible();
    }
    
    async verifyCityAlertMessage()
    {
        await expect(this.city).toBeVisible();
    }

    async verifyStateValidation(state)
    {
        await this.stateValidation.fill(state);
        await expect(this.stateValidation).toBeVisible();
    }

    async verifyStateAlertMessage()
    {
        await expect(this.state).toBeVisible();
    }

    async verifyPostalCodeValidation(postalcode)
    {
        await this.postalCodeValidation.fill(postalcode);
        await expect(this.postalCodeValidation).toBeVisible();
    }

    async verifyPostalCodeAlertMessage()
    {
        await expect(this.postalCode).toBeVisible();
    }

    async verifyCountryValidation(country)
    {
        await this.countryValidation.selectOption({label:country});
        await expect(this.countryValidation).toBeVisible();
    }

    async verifyCountryAlertMessage()
    {
        await expect(this.country).toBeVisible();
    }

    async verifyInvalidWorkEmailInput(workemail)
    {
        await this.invalidWorkEmail.fill(workemail);
    }

    async verifyInvalidWorkEmailAlertMessage()
    {
        await expect(this.invalidWorkEmailAlert).toBeVisible();
    }

    async verifyPhone(phone)
    {
        await this.phone.fill(String(phone));
    }
    
    async verifyInvalidPhoneInput(phone)
    {
        await this.invalidPhone.fill(phone);
    }

    async verifyInvalidPhoneAlertMessage()
    {
        await expect(this.invalidPhoneAlert).toBeVisible();
    }

    async verifyInvalidPortfolioURLInput(url) 
    {
        await this.invalidPortfolioURL.fill(url);
    }

    async verifyInvalidPortfolioURLAlertMessage()
    {
        await expect(this.invalidPortfolioURLAlert).toBeVisible();
    }

    async verifyInvalidAgeInput(age)
    {
        await this.invalidAgeInput.fill(age);
    }

    async verifyInvalidAgeAlertMessage()
    {
        await expect(this.invalidAgeAlert).toBeVisible();
    }

    async verifyInvalidProfilePictureUpload()
    {
        const filePath = 'C:\\Users\\shawn\\OneDrive\\Desktop\\Sample.txt';
        await this.profilePictureUpload.scrollIntoViewIfNeeded();
        await this.profilePictureUpload.setInputFiles(filePath);
    }

    async verifyInvalidProfilePictureAlertMessage()
    {
        await expect(this.verifyprofilePictureAlert).toBeVisible();
    }

    async verifyInvalidLargerProfileImageUpload()
    {
        const filePath = 'C:\\Users\\shawn\\OneDrive\\Desktop\\IMG_20221008_111850.jpg';
        await this.profilePictureUpload.scrollIntoViewIfNeeded();
        await this.profilePictureUpload.setInputFiles(filePath);
    }

    async verifyInvalidLargerPictureUpload()
    {
        await expect(this.verifyProfileLargerImageAlert).toBeVisible();
    }

    async verifyInvalidFirstName(firstname)
    {
        await this.firstNameValidation.fill(firstname);
    }

    async verifyValidFirstName(firstname)
    {
        await this.firstNameValidation.fill(firstname);
    }

    async verifyInvalidFirstNameAlertMessage()
    {
        await expect(this.firstNameValidationAlert).toBeVisible();
    }

    async verifyValidFirstNameAlertMessage()
    {
        await expect(this.firstNameValidationAlert).toBeHidden();
    }

    async verifyCreateAccountButtonValidation()
    {
        await this.createEmployeeButtonValidation.click();
    }

    async verifyDuplicateEmployeeCodeValidation()
    {
        await expect(this.duplicateEmployeeCodeValidation).toBeVisible();
    }

    async verifyEmptyEmployeeCodeValidation()
    {
        await expect(this.emptyEmployeeCodeValidation).toBeVisible();
    }

    async verifyEmployeeListPageRedirectValidation()
    {
        await expect(this.page).toHaveURL(/\/employees\/[a-f0-9]+$/);
    }

    async uploadProfilePicture() 
    {
        const imagePath = path.join(process.cwd(), 'fixtures', 'profile-image.jpg');

        await this.profilePictureInput.scrollIntoViewIfNeeded();

        await this.profilePictureInput.setInputFiles(imagePath);

        await expect(this.uploadedFileName).toBeVisible();
    }
}

export default EmployeeCreatePage;