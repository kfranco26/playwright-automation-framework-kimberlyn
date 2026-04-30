import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { StudentFormUser } from '../../data/builders/StudentFormUserBuilder';

// Page Object for Student Registration Form
export class StudentFormPage extends BasePage {
  // Basic input fields
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly mobile: Locator;

  // Subjects autocomplete input
  readonly subjectsInput: Locator;

  // Submit button
  readonly submitBtn: Locator;

  // Confirmation modal after submission
  readonly successModalTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators using accessible selectors
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.email = page.getByPlaceholder('name@example.com');
    this.mobile = page.getByPlaceholder('Mobile Number');

    this.subjectsInput = page.locator('#subjectsInput');

    this.submitBtn = page.getByRole('button', { name: 'Submit' });

    this.successModalTitle = page.getByText('Thanks for submitting the form');
  }

  // Navigate to Student Form page
  async goto(): Promise<void> {
    await this.navigateTo('/automation-practice-form');
  }

  // Fill entire form using provided user data
  async fillForm(user: StudentFormUser): Promise<void> {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.mobile.fill(user.mobile);

    await this.selectGender(user.gender);
    await this.selectSubjects(user.subjects);
    await this.selectHobbies(user.hobbies);
  }

  // Select gender via associated label (radio inputs are hidden)
  async selectGender(gender: string): Promise<void> {
    await this.page
      .locator(`label[for="gender-radio-${this.getGenderIndex(gender)}"]`)
      .click();
  }

  // Select multiple subjects using autocomplete dropdown
  async selectSubjects(subjects: string[]): Promise<void> {
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject);

      // Select matching option from suggestion list
      await this.page.getByText(subject, { exact: true }).click();
    }
  }

  // Select multiple hobbies via checkbox labels
  async selectHobbies(hobbies: string[]): Promise<void> {
    for (const hobby of hobbies) {
      await this.page.locator(`label:has-text("${hobby}")`).click();
    }
  }

  // Submit the form
  async submit(): Promise<void> {
    await this.submitBtn.click();
  }

  // Helper: map gender string to radio button index
  private getGenderIndex(gender: string): number {
    const genders: Record<string, number> = {
      Male: 1,
      Female: 2,
      Other: 3,
    };

    return genders[gender];
  }
}