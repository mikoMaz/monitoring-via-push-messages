import { expect, Locator, Page } from '@playwright/test';

export class AdminPanel {
  readonly page: Page;

  readonly locatorSelectCompanyFromRoleMenu: Locator;
  readonly locatorUsers: Locator;

  readonly locatorSelectCompanyToAddUsers: Locator;
  readonly locatorAddNewUserForm: Locator;
  readonly locatorAddNewUserName: Locator;
  readonly locatorAddNewUserSurname: Locator;
  readonly locatorAddNewUserEmail: Locator;
  readonly locatorAddNewUserSubmitButton: Locator;
  readonly locatorAddNewUserSuccessAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.locatorSelectCompanyFromRoleMenu = page.locator('.css-19c2j3d').nth(0);
    this.locatorUsers = page.locator('.css-xumdn4');

    this.locatorSelectCompanyToAddUsers = page.locator('.css-19c2j3d').nth(2);
    this.locatorAddNewUserForm = page.locator('.css-r54r42');
    this.locatorAddNewUserName = page.locator('input[placeholder="Name"]');
    this.locatorAddNewUserSurname = page.locator('input[placeholder="Surname"]');
    this.locatorAddNewUserEmail = page.locator('input[placeholder="Email"]');
    this.locatorAddNewUserSubmitButton = page.getByRole('button', { name: 'Submit' }).nth(3);
    this.locatorAddNewUserSuccessAlert = page.getByRole('alert').locator('[data-status="success"]').nth(1);
  }

  /* change roles menu */

  async selectCompanyFromChangeRoleMenu(companyOnTheList: string) {
    await this.locatorSelectCompanyFromRoleMenu.selectOption(companyOnTheList);
  }

  async verifyIfUserIsInTheCompany(fullName: string) {
    await expect(this.locatorUsers.filter({ hasText: fullName })).toBeVisible();
  }

  /* add user to company menu */

  async selectCompanyToAddUser(companyOnTheList: string) {
    await this.locatorSelectCompanyToAddUsers.selectOption(companyOnTheList);
    await expect(this.locatorAddNewUserForm).toBeVisible();
  }

  async fillNewUserForm(name: string, surname: string, email: string) {
    await this.locatorAddNewUserName.fill(name);
    await this.locatorAddNewUserSurname.fill(surname);
    await this.locatorAddNewUserEmail.fill(email);
  }

  async clickSubmitInAddNewUserForm() {
    await this.locatorAddNewUserSubmitButton.click();
    await expect(this.locatorAddNewUserSuccessAlert).toBeVisible();
  }
}
