import { expect, Locator, Page } from '@playwright/test';

export class FilterBar {
  readonly page: Page;
  readonly locatorAllDevices: Locator;
  readonly locatorBridges: Locator;
  readonly locatorGateways: Locator;
  readonly locatorSensors: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorAllDevices = page.locator('#tabs-\\:r3\\:--tab-0');
    this.locatorBridges = page.locator('#tabs-\\:r3\\:--tab-1');
    this.locatorGateways = page.locator('#tabs-\\:r3\\:--tab-2');
    this.locatorSensors = page.locator('#tabs-\\:r3\\:--tab-3');
    // add rest of the tabs(filters) (3)
  }

  async verifyFilterBar() {
    await expect(this.locatorAllDevices).toBeVisible();
    await expect(this.locatorBridges).toBeVisible();
    await expect(this.locatorGateways).toBeVisible();
    await expect(this.locatorSensors).toBeVisible();
  }
}
