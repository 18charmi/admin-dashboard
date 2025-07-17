import { test as base } from '@playwright/test';

export type Options = { defaultItem: string };

// Extend basic test by providing a "defaultItem" option and a "todoPage" fixture.
export const test = base.extend<Options>({
  
});
test.use({ storageState: 'playwright/.auth/user.json' });
