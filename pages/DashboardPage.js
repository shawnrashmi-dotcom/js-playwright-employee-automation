import { expect } from '@playwright/test';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

class DashboardPage {

    constructor(page) 
    {
        this.page=page; 

        this.createEmployeeButton = page.getByRole('main').getByRole('link', { name: 'Create Employee', exact: true });

        this.verifyNewEmployeePage = page.getByText('Create a new employee');

        this.dashboardClick = page.getByRole('link', {name:'Dashboard'});

        this.dashboardClickAlertMessage = page.getByText('Good to see you.');
    }

    async verifyDashboardClick()
    {
        await this.dashboardClick.click();
        await expect(this.dashboardClickAlertMessage).toBeVisible();
    }

    async createEmployeeButtonClick()
    {
        await this.createEmployeeButton.click();
    }

    async verifyNewEmployeeFormPage()
    {
        await expect(this.verifyNewEmployeePage).toBeVisible();
    }
}

export default DashboardPage;