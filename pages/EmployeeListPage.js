import { expect } from '@playwright/test';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import EmployeeCreatePage from './EmployeeCreatePage';
import fs from 'fs';
import path from 'path';

class EmployeeListPage {

    constructor(page) {

        this.page=page;

        this.employeesListButton = page.getByRole('link', {name: 'Employee List', exact: true});

        this.employeeRecordsHeading = page.getByRole('heading', {name: 'Employee records', exact: true});

        this.tableHeaders = page.locator('.table-wrap table thead th');

        this.employeeRows = page.locator('.table-wrap table tbody tr');

        this.employeeSearch = page.getByRole('searchbox', {name: 'Search employees'});

        this.employeeSearchByName = page.getByPlaceholder('Search any employee field…');

        this.employeeSearchByCode = page.getByRole('searchbox', { name: 'Search employees' });

        this.employeeSearchByEmail = page.getByPlaceholder('Search any employee field…');

        this.searchByInvalidName = page.getByPlaceholder('Search any employee field…');

        this.invalidSearchResult = page.getByText('No employees found');

        this.tableWrap = page.locator('.table-wrap');

        this.employeeCount = page.locator('.table-wrap table tbody tr');

        this.clickOnView = page.getByRole('link', {name:'View'}).first();

        this.employeeDetailsCheck = page.getByText('Employee Information', {exact:true});

        this.downloadCsvButton = page.getByRole('button', { name: /download csv/i });
    }

    async verifyEmployeesListButtonClick()
    {
        await this.employeesListButton.click();
    }

    async verifyEmployeeListPageValidation()
    {
        await expect(this.employeeRecordsHeading).toBeVisible();
    }

    async verifyExpectedTableHeaders() 
    {
        const expectedHeaders = ['Profile','Employee Code','First Name','Last Name','Work Email'];
        
        await expect(this.tableHeaders).toContainText(expectedHeaders);
    }

    async verifyAtLeastOneEmployeeRowIsRendered() 
    {
        await expect(this.employeeRows.first()).toBeVisible();
    }

    async verifyEmployeeCreatedByAutomationAppears(employeeCode) 
    {
        const employeeRow = this.page.getByRole('row').filter({ hasText: employeeCode });

        await expect(employeeRow).toBeVisible();
    }

    async verifySearchEmployeeByName(firstname)
    {
        await this.employeeSearchByName.fill(firstname);
        await expect(this.employeeSearchByName).toBeEnabled();
    }

    async verifySearchEmployeeByCode(employeecode)
    {
        await this.employeeSearchByCode.fill(String(employeecode));
        await expect(this.employeeSearchByCode).toBeEnabled();
    }

    async verifySearchEmployeeByEmail(workemail)
    {
        await this.employeeSearchByEmail.fill(workemail);
        await expect(this.employeeSearchByEmail).toBeEnabled();
    }

    async verifySearchByInvalidName(firstname)
    {
        await this.searchByInvalidName.fill(firstname);
        await expect(this.invalidSearchResult).toBeVisible();
    }

    async verifyHorizontalScroll() 
    {
        await expect(this.employeeRecordsHeading).toBeVisible();
        await expect(this.tableWrap).toBeVisible({timeout: 10000});
        const initialScrollLeft = await this.tableWrap.evaluate(el => el.scrollLeft);
        const scrollWidth = await this.tableWrap.evaluate(el => el.scrollWidth);
        const clientWidth = await this.tableWrap.evaluate(el => el.clientWidth);
        console.log('Initial:', initialScrollLeft);
        console.log('Scroll Width:', scrollWidth);
        console.log('Client Width:', clientWidth);
        expect(scrollWidth).toBeGreaterThan(clientWidth);
        await this.tableWrap.evaluate(el => {el.scrollLeft = el.scrollWidth;});
        const finalScrollLeft = await this.tableWrap.evaluate(el => el.scrollLeft);
        console.log('Final:', finalScrollLeft);
        expect(finalScrollLeft).toBeGreaterThan(initialScrollLeft);
    }
    
    async verifyEmployeeCount(employeecode)
    {
        await this.employeeCount.first().waitFor();
        const count = await this.employeeCount.count();
        console.log('Employee count', count);
    }

    async verifyClickOnView(employeeCode) 
    {
        const employeeRow = this.page.getByRole('row').filter({has: this.page.getByRole('cell', {name: String(employeeCode), exact: true})});
        await expect(employeeRow).toBeVisible();
        const viewLink = employeeRow.getByRole('link', {name: 'View', exact: true});
        await expect(viewLink).toBeVisible();
        await viewLink.click();
    }

    async verifyEmployeeDetailsPage()
    {
        await expect(this.employeeDetailsCheck).toBeVisible();
    }

    async downloadEmployeeListCsv() 
    {
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadCsvButton.click();
        const download = await downloadPromise;
        expect(download).toBeTruthy();
        const fileName = download.suggestedFilename();
        expect(fileName).toMatch(/\.csv$/i);
        console.log('Downloaded filename:', fileName);
        const filePath = `downloads/${fileName}`;
        await download.saveAs(filePath);
        console.log('Saved CSV:', filePath);
        expect(fs.existsSync(filePath)).toBeTruthy();
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(0);
        console.log('File size:', stats.size, 'bytes');
        return {download,fileName,filePath};
    }
}



export default EmployeeListPage;