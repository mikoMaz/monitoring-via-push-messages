import { expect, Locator, Page } from '@playwright/test';

export class FilterBar {
  readonly page: Page;
  readonly locatorAllDevices: Locator;
  readonly locatorBridges: Locator;
  readonly locatorGateways: Locator;
  readonly locatorSensors: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorAllDevices = page.getByRole('tab', { name: 'All Devices' });
    this.locatorBridges = page.getByRole('tab', { name: 'Bridges' });
    this.locatorGateways = page.getByRole('tab', { name: 'Gateways' });
    this.locatorSensors = page.getByRole('tab', { name: 'Sensors' });
    // add rest of the tabs(filters) (3)
  }

  async verifyFilterBar() {
    await expect(this.locatorAllDevices).toBeVisible();
    await expect(this.locatorBridges).toBeVisible();
    await expect(this.locatorGateways).toBeVisible();
    await expect(this.locatorSensors).toBeVisible();
  }
}
