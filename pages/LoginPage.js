import { expect } from '@playwright/test';
import SignupPage from './SignupPage';

class LoginPage  { 

    constructor(page) {

        this.page=page; 

        this.signinUsernameInput = page.getByRole('textbox', {name: 'Username*', exact: true});

        this.signinPasswordInput = page.getByRole('textbox', {name: 'Password*', exact: true});

        this.signinSubmit = page.getByRole('button', {type: 'submit*'});

        this.signinUsernameFailure = page.getByText('Username is required.');

        this.signinPasswordFailure = page.getByText('Password is required.');

        this.logoutButton = page.getByRole('button', { name: /logout/i });

    }

    async signinUsername(username)
    {
        await this.signinUsernameInput.fill(username);
    }

    async signinPassword(password)
    {
        await this.signinPasswordInput.fill(password);
    }

    async verifySigninSubmit()
    {
        await this.signinSubmit.click();
        await expect(this.signinSubmit).not.toHaveText(/Signing in/i, { timeout: 25000 });
    }

    async verifyDashboardNavigation()
    {
        await expect(this.page).toHaveURL(/dashboard/);
    }

    async verifySigninUsernameFailure()
    {
        await expect(this.signinUsernameFailure).not.toBeEmpty();
    }

    async verifySigninPasswordFailure()
    {
        await expect(this.signinPasswordFailure).not.toBeEmpty();
    }

    async verifyLogoutButtonClick()
    {
        await this.logoutButton.click();
    }

    async verifyLogoutAssertion()
    {
        await expect(this.page).toHaveURL(/signin/);
    }
}

export default LoginPage;