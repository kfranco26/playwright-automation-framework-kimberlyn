import { expect, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import type { SelectMenuScenario } from '../../data/builders/SelectMenuBuilder';

// Select Menu page object
export class SelectMenuPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateTo('/select-menu');
  }

  async completeSelectMenu(data: SelectMenuScenario): Promise<void> {
    await this.selectValue(data.selectValue);
    await this.selectOne(data.selectOne);
    await this.selectOldStyleColor(data.oldStyleColor);
    await this.selectMultiColors(data.colors);
    await this.selectCars(data.cars);
  }

  // Select option from React Select dropdown
  async selectValue(value: string): Promise<void> {
    await this.page.locator('#react-select-2-input').fill(value);
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }

  // Select title from React Select dropdown
  async selectOne(title: string): Promise<void> {
    await this.page.locator('#react-select-3-input').fill(title);
    await this.page.getByRole('option', { name: title, exact: true }).click();
  }

  async selectOldStyleColor(color: string): Promise<void> {
    await this.page.locator('#oldSelectMenu').selectOption({ label: color });
  }

  // Select multiple values from React Select dropdown
  async selectMultiColors(colors: string[]): Promise<void> {
    for (const color of colors) {
      await this.page.locator('#react-select-4-input').fill(color);

      await this.page
        .locator('[id^="react-select-4-option"]')
        .filter({ hasText: color })
        .first()
        .click();
    }
  }

  async selectCars(cars: string[]): Promise<void> {
    await this.page.locator('#cars').selectOption(cars);
  }

  async expectSelected(data: SelectMenuScenario): Promise<void> {
    await expect(this.page.getByText(data.selectValue, { exact: true })).toBeVisible();
    await expect(this.page.getByText(data.selectOne, { exact: true })).toBeVisible();

    await expect(this.page.locator('#oldSelectMenu')).toHaveValue(
      await this.getOldStyleColorValue(data.oldStyleColor)
    );

    // Selected React multi-values expose a remove button
    for (const color of data.colors) {
      await expect(
        this.page.getByRole('button', { name: `Remove ${color}` })
      ).toBeVisible();
    }

    await expect(this.page.locator('#cars')).toHaveValues(data.cars);
  }

  private async getOldStyleColorValue(color: string): Promise<string> {
    return (
      (await this.page
        .locator('#oldSelectMenu option', { hasText: color })
        .getAttribute('value')) ?? ''
    );
  }
}