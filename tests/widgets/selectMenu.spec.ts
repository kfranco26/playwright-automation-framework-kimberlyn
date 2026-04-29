import { test } from '../../data/fixtures/pages.fixture';
import { selectMenuScenarios } from '../../data/selectMenuTestData';

// Select Menu test suite
test.describe('Select Menu', () => {
  for (const scenario of selectMenuScenarios) {
    test(`completes select menu > ${scenario.name}`, async ({ selectMenuPage }) => {
      await selectMenuPage.completeSelectMenu(scenario);
      await selectMenuPage.expectSelected(scenario);
    });
  }
});