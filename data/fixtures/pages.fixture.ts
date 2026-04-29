import { test as base } from '@playwright/test';
import { WebTablesPage } from '../../pages/elements/WebTablesPage';
import { StudentFormPage } from '../../pages/forms/StudentFormPage';
import { SelectMenuPage } from '../../pages/widgets/SelectMenuPage';

// Define page fixtures
type Pages = {
  webTablesPage: WebTablesPage;
  studentFormPage: StudentFormPage;
  selectMenuPage: SelectMenuPage;
};

// Extend Playwright test with custom fixtures
export const test = base.extend<Pages>({
  // Initialize Web Tables page
  webTablesPage: async ({ page }, use) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto(); // Navigate before test
    await use(webTablesPage);
  },

  // Initialize Student Form page
  studentFormPage: async ({ page }, use) => {
    const studentFormPage = new StudentFormPage(page);
    await studentFormPage.goto(); // Navigate before test
    await use(studentFormPage);
  },

  // Initialize Select Menu page
  selectMenuPage: async ({ page }, use) => {
    const selectMenuPage = new SelectMenuPage(page);
    await selectMenuPage.goto(); // Navigate before test
    await use(selectMenuPage);
  },
});

// Export expect for consistency across tests
export { expect } from '@playwright/test';