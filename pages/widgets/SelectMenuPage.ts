import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import type { SelectMenuScenario } from '../../data/builders/SelectMenuBuilder';

// Page Object for Select Menu (Widgets)
export class SelectMenuPage extends BasePage {
  // React-based select inputs
  readonly selectValueInput: Locator;
  readonly selectOneInput: Locator;

  // Standard HTML select dropdown
  readonly oldStyleColorDropdown: Locator;

  // Multi-select (React)
  readonly multiColorInput: Locator;
  readonly multiColorOptions: Locator;

  // Multi-select (native HTML)
  readonly carsDropdown: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators for different dropdown types
    this.selectValueInput = page.locator('#react-select-2-input');
    this.selectOneInput = page.locator('#react-select-3-input');
    this.oldStyleColorDropdown = page.locator('#oldSelectMenu');
    this.multiColorInput = page.locator('#react-select-4-input');
    this.multiColorOptions = page.locator('[id^="react-select-4-option"]');
    this.carsDropdown = page.locator('#cars');
  }

  // Navigate to Select Menu page
  async goto(): Promise<void> {
    await this.navigateTo('/select-menu');
  }

  // Execute full selection flow using provided test data
  async completeSelectMenu(data: SelectMenuScenario): Promise<void> {
    await this.selectValue(data.selectValue);
    await this.selectOne(data.selectOne);
    await this.selectOldStyleColor(data.oldStyleColor);
    await this.selectMultiColors(data.colors);
    await this.selectCars(data.cars);
  }

  // Select value from React Select (dynamic dropdown)
  async selectValue(value: string): Promise<void> {
    await this.selectValueInput.fill(value);

    // Select matching option from dropdown list
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }

  // Select title from another React Select
  async selectOne(title: string): Promise<void> {
    await this.selectOneInput.fill(title);

    await this.page.getByRole('option', { name: title, exact: true }).click();
  }

  // Select from traditional HTML dropdown
  async selectOldStyleColor(color: string): Promise<void> {
    await this.oldStyleColorDropdown.selectOption({ label: color });
  }

  // Select multiple values from React multi-select
  async selectMultiColors(colors: string[]): Promise<void> {
    for (const color of colors) {
      await this.multiColorInput.fill(color);

      // Filter dynamic options and select first match
      await this.multiColorOptions
        .filter({ hasText: color })
        .first()
        .click();
    }
  }

  // Select multiple values from native multi-select dropdown
  async selectCars(cars: string[]): Promise<void> {
    await this.carsDropdown.selectOption(cars);
  }

  // Reusable locator for selected text validation
  getSelectedText(value: string): Locator {
    return this.page.getByText(value, { exact: true });
  }

  // Locator for "remove" button of selected multi-values
  getRemoveColorButton(color: string): Locator {
    return this.page.getByRole('button', { name: `Remove ${color}` });
  }

  // Helper: get actual value attribute of selected option (for validation)
  async getOldStyleColorValue(color: string): Promise<string> {
    return (
      (await this.page
        .locator('#oldSelectMenu option', { hasText: color })
        .getAttribute('value')) ?? ''
    );
  }
}