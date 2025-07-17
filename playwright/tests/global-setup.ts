import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const authFile = path.join(__dirname, '../.auth/user.json');
const APP_URL = String(process.env.NEXT_PUBLIC_SITE_URL);

import { chromium } from '@playwright/test';

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(`${APP_URL}/dashboard`);
    await page.getByRole('textbox', { name: 'username' }).fill("emilys")
    await page.getByRole('textbox', { name: 'password' }).fill("emilyspass")
    await page.locator('button[type=submit]').click();

    // Wait until the page user session is stored in the cookies.
    await expect(page).toHaveURL(/\/dashboard/);

    // End of authentication steps.
    await page.context().storageState({ path: authFile });

    await browser.close();
}

export default globalSetup;

