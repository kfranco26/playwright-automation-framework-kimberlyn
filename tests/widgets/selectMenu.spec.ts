import { expect } from '@playwright/test';
import { test } from '../../data/fixtures/pages.fixture';
import { selectMenuScenarios } from '../../data/selectMenuTestData';

// Test suite for Select Menu widget
test.describe('Select Menu', () => {

  // Data-driven execution using multiple scenarios
  for (const scenario of selectMenuScenarios) {
    test(`completes select menu > ${scenario.name}`, async ({ selectMenuPage }) => {

      // Perform all selection actions
      await selectMenuPage.completeSelectMenu(scenario);

      // Validate selected value from React Select
      await expect(
        selectMenuPage.getSelectedText(scenario.selectValue)
      ).toBeVisible();

      // Validate selected title
      await expect(
        selectMenuPage.getSelectedText(scenario.selectOne)
      ).toBeVisible();

      // Validate selected option in traditional dropdown
      await expect(selectMenuPage.oldStyleColorDropdown).toHaveValue(
        await selectMenuPage.getOldStyleColorValue(scenario.oldStyleColor)
      );

      // Validate all selected multi-colors are present
      for (const color of scenario.colors) {
        await expect(
          selectMenuPage.getRemoveColorButton(color)
        ).toBeVisible();
      }

      // Validate selected values in native multi-select dropdown
      const selectedCars = await selectMenuPage.carsDropdown.evaluate(
      (element: HTMLSelectElement) =>
        Array.from(element.selectedOptions).map(option => option.value)
      );

      expect(selectedCars.sort()).toEqual([...scenario.cars].sort());
    });
  }
});