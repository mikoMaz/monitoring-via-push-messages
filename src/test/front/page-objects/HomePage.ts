import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly locatorLoginButton: Locator;
  readonly locatorProfileInfo: Locator;
  readonly locatorUserEmail: Locator;
  readonly locatorCompany: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorLoginButton = page.locator('.chakra-button.css-l3lebr');
    this.locatorProfileInfo = page.locator('.css-pksyiw');
    this.locatorUserEmail = page.locator('.css-18uizl4');
    this.locatorCompany = page.locator('.css-pldp3m');
  }

  async visit() {
    await this.page.goto('/');
  }

  async clickOnLoginButton() {
    await this.locatorLoginButton.click();
  }

  async verifyLoginButtonIsVisible() {
    await expect(this.locatorLoginButton).toBeVisible();
  }

  async verifyHomePage() {
    await expect(this.locatorProfileInfo).toBeVisible();
    await expect(this.locatorUserEmail).toBeVisible();
    await expect(this.locatorCompany).toBeVisible();
  }

  async verifyUserInfoOnProfile(userEmail: string, companyName: string) {
    await expect(this.locatorUserEmail).toHaveText(userEmail);
    await expect(this.locatorCompany).toHaveText(companyName);
  }
}
