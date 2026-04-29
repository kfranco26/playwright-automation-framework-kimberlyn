import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { WebTableUser } from '../../data/webTablesTestData';

// Web Tables page object
export class WebTablesPage extends BasePage {
  readonly addButton: Locator;
  readonly submitButton: Locator;
  readonly searchInput: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;

  readonly table: Locator;
  readonly noDataMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.searchInput = page.getByPlaceholder('Type to search');

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('name@example.com');
    this.ageInput = page.getByPlaceholder('Age');
    this.salaryInput = page.getByPlaceholder('Salary');
    this.departmentInput = page.getByPlaceholder('Department');

    this.table = page.getByRole('table');
    this.noDataMessage = page.getByText('No rows found');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/webtables');
  }

  async addUser(user: WebTableUser): Promise<void> {
    await this.addButton.click();
    await this.fillForm(user);
    await this.submitButton.click();

    await this.expectUserVisible(user);
  }

  async search(value: string): Promise<void> {
    await this.searchInput.fill(value);
    await expect(this.searchInput).toHaveValue(value);
  }

  async editUser(email: string, updatedUser: WebTableUser): Promise<void> {
    await this.search(email);

    const row = this.getRowByEmail(email);
    await expect(row).toBeVisible();

    await row.locator('[title="Edit"]').click();

    await this.fillForm(updatedUser);
    await this.submitButton.click();

    await this.expectUserVisible(updatedUser);
  }

  async deleteUser(email: string): Promise<void> {
    await this.search(email);

    const row = this.getRowByEmail(email);
    await expect(row).toBeVisible();

    await row.locator('[title="Delete"]').click();
  }

  async expectUserVisible(user: WebTableUser): Promise<void> {
    await this.search(user.email);

    const row = this.getRowByEmail(user.email);

    await expect(row).toBeVisible({ timeout: 10000 });
    await expect(row).toContainText(user.firstName);
    await expect(row).toContainText(user.lastName);
    await expect(row).toContainText(user.email);
    await expect(row).toContainText(user.age);
    await expect(row).toContainText(user.salary);
    await expect(row).toContainText(user.department);
  }

  async expectNoRowsFound(): Promise<void> {
    const dataRows = this.table
      .getByRole('row')
      .filter({ hasNotText: 'First Name' });

    await expect(dataRows).toHaveCount(0);
  }

  private getRowByEmail(email: string): Locator {
    return this.table.getByRole('row', {
      name: new RegExp(this.escapeRegExp(email), 'i'),
    });
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private async fillForm(user: WebTableUser): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.ageInput.fill(user.age);
    await this.salaryInput.fill(user.salary);
    await this.departmentInput.fill(user.department);
  }
}