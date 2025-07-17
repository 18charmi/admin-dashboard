import { expect } from '@playwright/test';
import { test } from '../utils/testWithPermission';
const APP_URL = String(process.env.NEXT_PUBLIC_SITE_URL);

test.describe(() => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Test not authorized page, redirect to login', async ({ page }) => {
        await page.goto(`${APP_URL}/dashboard`);
        await expect(page).toHaveURL(/\/login/);
    });
});

test('Dashboard will be accessible only after login', async ({ page }) => {
    await page.goto(`${APP_URL}/dashboard`);
    await expect(page).toHaveURL(/\/dashboard/);
});
