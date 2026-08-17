import { expect } from '@playwright/test';

class SignupPage {

    constructor(page) { 

        this.page=page; 

        this.redirectionURL=page.locator('//a[contains(text(), "Create an account")]');

        this.usernameInput = page.getByRole('textbox', {name: 'Username*', exact: true});

        this.emptyUsername = page.getByText('Username must be at least 3 characters.');

        this.duplicateUsername = page.getByRole('alert');

        this.passwordInput = page.getByRole('textbox', {name: 'Password*', exact: true});

        this.emptyPassword = page.getByText('Password must be at least 6 characters.');

        this.rePasswordInput = page.getByRole('textbox', {name: 'Confirm password*', exact: true});

        this.emptyConfirmPassword = page.getByText('Please confirm your password.');

        this.passwordMismatch = page.getByText('Passwords do not match.');

        this.createAccount = page.locator('button[type="submit"]');

        this.signinSubmitButton = page.getByRole('button', {type: 'submit*'});

    }

    async navigate()
    {
        await this.page.goto('/');
    }

    async pageRedirect()
    {
        await this.redirectionURL.click();
    }

    async enterUsername(username)
    {
        await this.usernameInput.fill(username);
    }

    async verifyEmptyUsername()
    {
        await expect(this.emptyUsername).toHaveText('Username must be at least 3 characters.');
    }

    async enterPassword(password)
    {
        await this.passwordInput.fill(password);
    }

    async verifyEmptyPassword()
    {
        await expect(this.emptyPassword).toHaveText('Password must be at least 6 characters.');
    }

     async reEnterPassword(password)
    {
        await this.rePasswordInput.fill(password);
    }

    async verifyConfirmPassword()
    {
        await expect(this.emptyConfirmPassword).toHaveText('Please confirm your password.');
    }

    async accountCreation()
    {
        await this.createAccount.click();
        await expect(this.createAccount).not.toHaveText(/Creating account/i, { timeout: 25000 });
    }

    async verifySuccess()
    {
        await expect(this.page).toHaveURL(/signin/);
    }

    async verifyError()
    {
        await expect(this.page).toHaveURL(/signup/);
    }

    async verifyPasswordMismatch()
    {
        await expect(this.passwordMismatch).toHaveText('Passwords do not match.');
    }

    async verifyDuplicateUsername()
    {
        await expect(this.duplicateUsername).toHaveText('Username already exists.');
    }

    async verifySigninSubmitButton()
    {
        await this.signinSubmitButton.click();
        await expect(this.signinSubmitButton).not.toHaveText(/Signing in/i, { timeout: 25000 });
    }

    async verifyDashboardNavigation()
    {
        await expect(this.page).toHaveURL(/dashboard/);
    }
}


export default SignupPage;