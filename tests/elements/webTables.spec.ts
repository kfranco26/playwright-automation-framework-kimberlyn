import { expect } from '@playwright/test';
import { test } from '../../data/fixtures/pages.fixture';
import { webTableScenarios, WebTableUser } from '../../data/webTablesTestData';

// Test suite for Web Tables functionality
test.describe('Web Tables', () => {
  // Data-driven execution using multiple scenarios
  for (const scenario of webTableScenarios) {
    test.describe(`Scenario: ${scenario.name}`, () => {

      // Test: Create and verify new user
      test('adds and verifies a user', async ({ webTablesPage }) => {
        await webTablesPage.addUser(scenario.user);

        // Assertion handled in spec (best practice)
        await expectUserVisible(webTablesPage, scenario.user);
      });

      // Test: Update existing user and verify changes
      test('updates a user', async ({ webTablesPage }) => {
        await webTablesPage.addUser(scenario.user);
        await expectUserVisible(webTablesPage, scenario.user);

        await webTablesPage.editUser(
          scenario.user.email,
          scenario.updatedUser
        );

        await expectUserVisible(webTablesPage, scenario.updatedUser);
      });

      // Test: Delete user and verify removal
      test('deletes a user', async ({ webTablesPage }) => {
        await webTablesPage.addUser(scenario.user);
        await expectUserVisible(webTablesPage, scenario.user);

        await webTablesPage.deleteUser(scenario.user.email);

        // Verify table has no matching records
        await webTablesPage.search(scenario.user.email);
        await expect(webTablesPage.getDataRows()).toHaveCount(0);
      });
    });
  }
});

// Helper assertion function to validate table row content
async function expectUserVisible(
  webTablesPage: any,
  user: WebTableUser
): Promise<void> {

  // Apply search filter
  await webTablesPage.search(user.email);

  // Validate search input reflects filter value
  await expect(webTablesPage.searchInput).toHaveValue(user.email);

  const row = webTablesPage.getRowByEmail(user.email);

  // Verify row visibility and content
  await expect(row).toBeVisible({ timeout: 10000 });
  await expect(row).toContainText(user.firstName);
  await expect(row).toContainText(user.lastName);
  await expect(row).toContainText(user.email);
  await expect(row).toContainText(user.age);
  await expect(row).toContainText(user.salary);
  await expect(row).toContainText(user.department);
}