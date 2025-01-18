import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly locatorEmailField: Locator;
  readonly locatorPasswordField: Locator;
  readonly locatorContinueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorEmailField = page.locator('#username');
    this.locatorPasswordField = page.locator('#password');
    this.locatorContinueButton = page.locator('.cb6a59b97');
  }

  async fillEmail(email: string) {
    await this.locatorEmailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.locatorPasswordField.fill(password);
  }

  async clickOnContinueButton() {
    await this.locatorContinueButton.click();
  }

  async verifyLoginFormIsVisible() {
    await expect(this.locatorEmailField).toBeVisible();
    await expect(this.locatorPasswordField).toBeVisible();
    await expect(this.locatorContinueButton).toBeVisible();
  }
}
