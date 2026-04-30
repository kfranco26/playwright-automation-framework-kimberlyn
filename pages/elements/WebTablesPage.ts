import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { WebTableUser } from '../../data/webTablesTestData';

// Page Object for Web Tables page
export class WebTablesPage extends BasePage {
  // Action buttons
  readonly addButton: Locator;
  readonly submitButton: Locator;

  // Search input for filtering table rows
  readonly searchInput: Locator;

  // Form fields for user creation/edit
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;

  // Table and empty state
  readonly table: Locator;
  readonly noDataMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators using accessible selectors (best practice)
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

  // Navigate to Web Tables page
  async goto(): Promise<void> {
    await this.navigateTo('/webtables');
  }

  // Add a new user via modal form
  async addUser(user: WebTableUser): Promise<void> {
    await this.addButton.click();
    await this.fillForm(user);
    await this.submitButton.click();
  }

  // Filter table using search input
  async search(value: string): Promise<void> {
    await this.searchInput.fill(value);
  }

  // Edit an existing user identified by email
  async editUser(email: string, updatedUser: WebTableUser): Promise<void> {
    await this.search(email);

    // Locate row dynamically based on email
    await this.getRowByEmail(email).locator('[title="Edit"]').click();

    await this.fillForm(updatedUser);
    await this.submitButton.click();
  }

  // Delete user by email
  async deleteUser(email: string): Promise<void> {
    await this.search(email);

    // Click delete action inside matching row
    await this.getRowByEmail(email).locator('[title="Delete"]').click();
  }

  // Reusable locator for row lookup using dynamic text match
  getRowByEmail(email: string): Locator {
    return this.table.getByRole('row', {
      name: new RegExp(this.escapeRegExp(email), 'i'),
    });
  }

  // Returns all data rows (excluding header row)
  getDataRows(): Locator {
    return this.table
      .getByRole('row')
      .filter({ hasNotText: 'First Name' });
  }

  // Fill modal form fields
  private async fillForm(user: WebTableUser): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.ageInput.fill(user.age);
    await this.salaryInput.fill(user.salary);
    await this.departmentInput.fill(user.department);
  }

  // Escape special characters for RegExp safety
  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}