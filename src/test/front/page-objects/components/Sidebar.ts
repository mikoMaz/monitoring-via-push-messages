import { expect, Locator, Page } from '@playwright/test';

export class Sidebar {
  readonly page: Page;
  readonly locatorSidebar: Locator;
  readonly locatorClearLocalStorageButton: Locator;
  readonly locatorLogoutButton: Locator;
  readonly locatorAdminPanelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorSidebar = page.locator('#chakra-modal--body-\\:r2\\:');
    this.locatorClearLocalStorageButton = page.locator('.css-g5p1gb');
    this.locatorLogoutButton = page.locator('.css-19dxhg7');
    this.locatorAdminPanelButton = page.locator('.css-oni4cz');
  }

  async clickOnAdminPanelButton() {
    await this.locatorAdminPanelButton.click();
  }

  async clickOnLogoutButton() {
    await this.locatorLogoutButton.click();
  }

  async verifySidebar() {
    await expect(this.locatorSidebar).toBeVisible();
    await expect(this.locatorClearLocalStorageButton).toBeVisible();
    await expect(this.locatorClearLocalStorageButton).toHaveText('Clear Local Storage');
    await expect(this.locatorLogoutButton).toBeVisible();
  }

  async verifyAdminPanelButtonVisibility() {
    await expect(this.locatorAdminPanelButton).toBeVisible();
    await expect(this.locatorAdminPanelButton).toHaveText('Admin panel');
  }
}
