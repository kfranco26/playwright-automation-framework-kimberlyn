import { Page } from '@playwright/test';

// Base page wrapper for shared navigation
export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }
}