import { expect, Locator, Page } from '@playwright/test';

export class Navbar {
  readonly page: Page;
  readonly locatorHomeLink: Locator;
  readonly locatorMonitoringLink: Locator;
  readonly locatorDashboardLink: Locator;
  readonly locatorAboutLink: Locator;
  readonly locatorProfile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorHomeLink = page.locator('.css-m745jc');
    this.locatorMonitoringLink = page.locator('#tabs-\\:r0\\:--tab-0');
    this.locatorDashboardLink = page.locator('#tabs-\\:r0\\:--tab-1');
    this.locatorAboutLink = page.locator('#tabs-\\:r0\\:--tab-2');
    this.locatorProfile = page.locator('.css-mulq7i');
  }

  async verifyNavbar() {
    await expect(this.locatorHomeLink).toBeVisible();
    await expect(this.locatorMonitoringLink).toBeVisible();
    await expect(this.locatorDashboardLink).toBeVisible();
    await expect(this.locatorAboutLink).toBeVisible();
    await expect(this.locatorProfile).toBeVisible();
  }

  async clickOnProfileButton() {
    await this.locatorProfile.click();
  }
}
