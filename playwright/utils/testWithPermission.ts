import { test as base } from '@playwright/test';

// defining the usage of default user sesion by extending test function
export const test = base.extend({
    storageState: 'playwright/.auth/user.json'
});

