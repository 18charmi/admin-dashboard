import { test, expect } from '@playwright/test';
const APP_URL = String(process.env.NEXT_PUBLIC_SITE_URL);
test('Check for the login route', async ({ page }) => {
    await page.goto(APP_URL);
    await expect(page).toHaveURL(/\/login/);
});

test('Validate the page elements : title, form to be visible, submit button', async ({ page }) => {
    await page.goto(APP_URL);
    await expect(page.getByRole('heading')).toHaveText("Welcome Back")

    await page.getByRole('form').isVisible();
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible();
    await expect(page.locator('button[type=submit]')).toBeVisible();
    await expect(page.locator('button[type=submit]')).toHaveText("Login");
});
test('Validate the possible error message of forms', async ({ page }) => {
    await page.goto(APP_URL);
    await expect(page.getByRole('heading')).toHaveText("Welcome Back")

    await expect(page.locator('button[type=submit]')).toBeEnabled();
    await page.locator('button[type=submit]').click();
    await expect(page.getByTestId('username-container')).toContainText("Username is required");
    await expect(page.getByTestId('password-container')).toContainText("Password is required");

    await page.getByRole('textbox', { name: 'username' }).fill("emilys")
    await page.getByRole('textbox', { name: 'password' }).fill("emilyspass")
    await expect(page.getByTestId('username-container')).not.toContainText("Username is required");
    await expect(page.getByTestId('password-container')).not.toContainText("Password is required");
});

test('Getting user feedback messages on invalid credentials', async ({ page }) => {
    await page.goto(APP_URL);

    await page.getByRole('textbox', { name: 'username' }).fill("emilys")
    await page.getByRole('textbox', { name: 'password' }).fill("emilypass")
    await page.locator('button[type=submit]').click();
    await page.getByTestId('alert-container').isVisible();
    await expect(page.getByTestId('alert-container')).toHaveText('Invalid credentials');
    await expect(page.getByTestId('alert-container')).not.toBeVisible()
});

test('Login Success Action', async ({ page }) => {
    await page.goto(APP_URL);

    await page.getByRole('textbox', { name: 'username' }).fill("emilys")
    await page.getByRole('textbox', { name: 'password' }).fill("emilyspass")
    await page.locator('button[type=submit]').click();
    await page.getByTestId('alert-container').isVisible();
    await expect(page.getByTestId('alert-container')).toHaveText('Login Success');
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator("header")).toContainText("Welcome Admin")
    await expect(page.locator("header button")).toContainText("Log Out")
});