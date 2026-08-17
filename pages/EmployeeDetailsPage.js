import { expect } from '@playwright/test';

export class EmployeeDetailsPage {

    constructor(page) {

        this.page = page;

        this.employeeInformation = page.getByRole('heading', {name: 'Employee Information', exact: true});

        this.employeeCode = page.getByText('Employee Code', { exact: true }).locator('..').locator('dd');

        this.firstName = page.getByText('First Name', { exact: true }).locator('..').locator('dd');

        this.lastName = page.getByText('Last Name', { exact: true }).locator('..').locator('dd');

        this.department = page.getByText('Department', { exact: true }).locator('..').locator('dd');

        this.designation = page.getByText('Designation', { exact: true }).locator('..').locator('dd');

        this.personalInformation = page.getByRole('heading', {name: 'Personal Information', exact: true});

        this.age = page.getByText('Age', { exact: true }).locator('..').locator('dd');

        this.dateOfBirth = page.getByText('Date Of Birth', { exact: true }).locator('..').locator('dd');

        this.gender = page.getByText('Gender', { exact: true }).locator('..').locator('dd');

        this.workEmail = page.getByText('Work Email', { exact: true }).locator('..').locator('dd');

        this.phone = page.getByText('Phone', { exact: true }).locator('..').locator('dd');

        this.employmentInformation = page.getByRole('heading', {name: 'Employment & Schedule', exact: true});

        this.joiningDate = page.getByText('Joining Date', { exact: true }).locator('..').locator('dd');

        this.officeLocation = page.getByText('Office Location', { exact: true }).locator('..').locator('dd');

        this.associationsPreferences = page.getByRole('heading', {name: 'Associations & Preferences', exact: true});

        this.skills = page.getByText('Skills', { exact: true }).locator('..').locator('dd');

        this.languages = page.getByText('Languages', { exact: true }).locator('..').locator('dd');

        this.benefits = page.getByText('Benefits', { exact: true }).locator('..').locator('dd');

        this.addressInformation = page.getByRole('heading', {name: 'Address', exact: true});

        this.addressLine1 = page.getByText('Address Line1', { exact: true }).locator('..').locator('dd');

        this.addressLine2 = page.getByText('Address Line2', { exact: true }).locator('..').locator('dd');

        this.city = page.getByText('City', { exact: true }).locator('..').locator('dd');

        this.state = page.getByText('State', { exact: true }).locator('..').locator('dd');

        this.postalCode = page.getByText('Postal Code', { exact: true }).locator('..').locator('dd');

        this.country = page.getByText('Country', { exact: true }).locator('..').locator('dd');

        this.profilePicture = page.locator('img');

        this.downloadJsonButton = page.getByRole('button', { name: /download json/i});

        this.logoutButton = page.locator('.icon-btn');

        this.loginRedirect = page.getByText('Secure sign in');
        
    }

    async verifyEmployeeDetails(employeeData) {

        await expect(this.employeeInformation).toBeVisible();

        await expect(this.employeeCode).toHaveText(String(employeeData.employeeCode));

        const employeeName = employeeData.employeeName || `${employeeData.firstName || ''} ${employeeData.lastName || ''}`.trim();

        if (employeeData.firstName) 
        {
            await expect(this.firstName).toHaveText(employeeData.firstName);
        }

        if (employeeData.lastName) 
        {
            await expect(this.lastName).toHaveText(employeeData.lastName);
        }

        if (employeeData.department) 
        {
            await expect(this.department).toHaveText(employeeData.department);
        }

        if (employeeData.designation) 
        {
            await expect(this.designation).toHaveText(employeeData.designation);
        }

        await expect(this.personalInformation).toBeVisible();

        if (employeeData.age !== undefined) 
        {
            await expect(this.age).toHaveText(String(employeeData.age));
        }

        if (employeeData.gender) 
        {
            await expect(this.gender).toHaveText(employeeData.gender);
        }

        if (employeeData.dateOfBirth) 
        {
            await expect(this.dateOfBirth).toHaveText(String(employeeData.dateOfBirth));
        }

        if (employeeData.email) 
        {
            await expect(this.workEmail).toHaveText(employeeData.email);
        }

        if (employeeData.phoneNumber) 
        {
            await expect(this.phone).toHaveText(String(employeeData.phoneNumber));
        }

        await expect(this.employmentInformation).toBeVisible();

        if (employeeData.joiningDate) 
        {
            await expect(this.joiningDate).toHaveText(String(employeeData.joiningDate));
        }

        if (employeeData.officeLocation) 
        {
            await expect(this.officeLocation).toHaveText(employeeData.officeLocation);
        }

        if (employeeData.skills) 
        {
            const skills = Array.isArray(employeeData.skills) ? employeeData.skills : [employeeData.skills];

            for (const skill of skills) 
            {
                await expect(this.skills).toContainText(String(skill));
            }
        }

        if (employeeData.preferences) 
        {
            const preferences = Array.isArray(employeeData.preferences) ? employeeData.preferences : [employeeData.preferences];

            for (const preference of preferences) 
            {
                await expect(this.associationsPreferences).toContainText(String(preference));
            }
        }

        await expect(this.addressInformation).toBeVisible();

        if (employeeData.addressLine1) 
        {
            await expect(this.addressLine1).toHaveText(employeeData.addressLine1);
        }

        if (employeeData.addressLine2) 
        {
            await expect(this.addressLine2).toHaveText(employeeData.addressLine2);
        }

        if (employeeData.city) 
        {
            await expect(this.city).toHaveText(employeeData.city);
        }

        if (employeeData.state) 
        {
            await expect(this.state).toHaveText(employeeData.state);
        }

        if (employeeData.pincode) 
        {
            await expect(this.postalCode).toHaveText(String(employeeData.pincode));
        }

        if (employeeData.country) 
        {
            await expect(this.country).toHaveText(employeeData.country);
        }

        if (employeeData.profilePicture) 
        {
            await expect(this.profilePicture.first()).toBeVisible();
        }

    }

        async verifyProfilePicture()
        {
            await expect(this.profilePicture.first()).toBeVisible();
        }

        async downloadEmployeeJson() 
        {
            const downloadPromise = this.page.waitForEvent('download');
            await this.downloadJsonButton.click();
            const download = await downloadPromise;
            expect(download).toBeTruthy();
            const fileName = download.suggestedFilename();
            expect(fileName).toMatch(/\.json$/i);
            const filePath = `downloads/${fileName}`;
            await download.saveAs(filePath);
            console.log('Downloaded file:', filePath);
            return {download,fileName,filePath};
        }


        async verifyJsonDownload(downloadResult) 
        {
            const { download, fileName, filePath } = downloadResult;
            expect(download).toBeTruthy();
            expect(fileName).toMatch(/\.json$/i);
            console.log('Downloaded filename:', fileName);
            console.log('Downloaded file path:', filePath);
            const jsonContent = await download.createReadStream();
            let data = '';
            for await (const chunk of jsonContent) 
            {
            data += chunk.toString();
            }
            const employeeData = JSON.parse(data);
            return {fileName,filePath,employeeData};
        }

        async verifyDownloadedEmployeeData(employeeData, expectedEmployee) 
        {
            expect(String(employeeData.employeeCode)).toBe(String(expectedEmployee.employeeCode));
            expect(employeeData.firstName).toBe(expectedEmployee.firstName);
            expect(employeeData.lastName).toBe(expectedEmployee.lastName);
            console.log('Downloaded employee JSON:', employeeData);
        }
        async verifyLogoutButtonClick()
        {
            await this.logoutButton.click();
            await expect(this.loginRedirect).toBeVisible();
        }

        async getEmployeeCode() 
        {
            return (await this.employeeCode.textContent()).trim();
        }

}

export default EmployeeDetailsPage;