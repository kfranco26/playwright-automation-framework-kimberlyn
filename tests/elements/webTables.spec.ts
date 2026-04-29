import { test } from '../../data/fixtures/pages.fixture';
import { webTableScenarios } from '../../data/webTablesTestData';

// Web Tables test suite
test.describe('Web Tables', () => {
  for (const scenario of webTableScenarios) {
    test.describe(`Scenario: ${scenario.name}`, () => {

      test('adds and verifies a user', async ({ webTablesPage }) => {
        await webTablesPage.addUser(scenario.user);
      });

      test('updates a user', async ({ webTablesPage }) => {
        await webTablesPage.addUser(scenario.user);
        await webTablesPage.editUser(
          scenario.user.email,
          scenario.updatedUser
        );
      });

      test('deletes a user', async ({ webTablesPage }) => {
        await webTablesPage.addUser(scenario.user);
        await webTablesPage.deleteUser(scenario.user.email);
        await webTablesPage.expectNoRowsFound();
      });

    });
  }
});