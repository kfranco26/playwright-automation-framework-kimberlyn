import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { StudentFormUser } from '../../data/builders/StudentFormUserBuilder';

// Student Form page object
export class StudentFormPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly mobile: Locator;

  readonly submitBtn: Locator;

  // Autocomplete input
  readonly subjectsInput: Locator;

  constructor(page: Page) {
    super(page);

    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.email = page.getByPlaceholder('name@example.com');
    this.mobile = page.getByPlaceholder('Mobile Number');

    this.subjectsInput = page.locator('#subjectsInput');

    this.submitBtn = page.getByRole('button', { name: 'Submit' });
  }

  async goto(): Promise<void> {
    await this.navigateTo('/automation-practice-form');
  }

  async fillForm(user: StudentFormUser): Promise<void> {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.mobile.fill(user.mobile);

    await this.selectGender(user.gender);
    await this.selectSubjects(user.subjects);
    await this.selectHobbies(user.hobbies);
  }

  // Radio inputs are hidden; use label association
  async selectGender(gender: string): Promise<void> {
    await this.page
      .locator(`label[for="gender-radio-${this.getGenderIndex(gender)}"]`)
      .click();
  }

  // Select values from autocomplete dropdown
  async selectSubjects(subjects: string[]): Promise<void> {
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject);
      await this.page.getByText(subject, { exact: true }).click();
    }
  }

  // Select checkbox values via label text
  async selectHobbies(hobbies: string[]): Promise<void> {
    for (const hobby of hobbies) {
      await this.page.locator(`label:has-text("${hobby}")`).click();
    }
  }

  async submit(): Promise<void> {
    await this.submitBtn.click();
  }

  // Verify submission confirmation
  async expectSubmissionSuccess(): Promise<void> {
    await expect(
      this.page.getByText('Thanks for submitting the form')
    ).toBeVisible();
  }

  // Map gender to radio index
  private getGenderIndex(gender: string): number {
    const genders: Record<string, number> = {
      Male: 1,
      Female: 2,
      Other: 3,
    };

    return genders[gender];
  }
}