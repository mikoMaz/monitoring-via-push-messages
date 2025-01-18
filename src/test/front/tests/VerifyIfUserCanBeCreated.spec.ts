import { test } from '@playwright/test';
import { UserSuperAdmin, UserToAdd } from '../utils/environment-config';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import { Navbar } from '../page-objects/components/Navbar';
import { FilterBar } from '../page-objects/components/FilterBar';
import { Sidebar } from '../page-objects/components/SideBar';
import { AdminPanel } from '../page-objects/AdminPanel';

test.describe('Create new user', () => {
  let userSuperAdmin: UserSuperAdmin;
  let userToAdd: UserToAdd;
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let filterBar: FilterBar;
  let sidebar: Sidebar;
  let adminPanel: AdminPanel;

  test.beforeEach(async ({ page }) => {
    userSuperAdmin = new UserSuperAdmin();
    userToAdd = new UserToAdd();
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    filterBar = new FilterBar(page);
    sidebar = new Sidebar(page);
    adminPanel = new AdminPanel(page);
  });

  test('Verify if user can be created from Super Admin account', async () => {
    await test.step('[1] Open ErrWarn home page', async () => {
      await homePage.visit();
      await homePage.verifyLoginButtonIsVisible();
    });

    await test.step('[2] Click on login button', async () => {
      await homePage.clickOnLoginButton();
      await loginPage.verifyLoginFormIsVisible();
    });

    await test.step('[3] Fill email and password', async () => {
      await loginPage.fillEmail(userSuperAdmin.email);
      await loginPage.fillPassword(userSuperAdmin.password);
    });

    await test.step('[4] Click on continue button to log in', async () => {
      await loginPage.clickOnContinueButton();
      await navbar.verifyNavbar();
      await filterBar.verifyFilterBar();
      // await homePage.verifyHomePage();
      // await homePage.verifyUserInfoOnProfile(userSuperAdmin.email, userSuperAdmin.company)
    });

    await test.step('[5] Click on profile button', async () => {
      await navbar.clickOnProfileButton();
      await sidebar.verifySidebar();
      await sidebar.verifyAdminPanelButtonVisibility();
    });

    await test.step('[6] Click on "Admin panel" button', async () => {
      await sidebar.clickOnAdminPanelButton();
    });

    await test.step('[7] Select company to add user to', async () => {
      await adminPanel.selectCompanyToAddUser('1');
    });

    await test.step('[8] Add user', async () => {
      await adminPanel.fillNewUserForm(userToAdd.name, userToAdd.surname, userToAdd.email);
      await adminPanel.clickSubmitInAddNewUserForm();
    });

    await test.step('[9] Check if user was added to company', async () => {
      await adminPanel.selectCompanyFromChangeRoleMenu('1');
      await adminPanel.verifyIfUserIsInTheCompany(userToAdd.name + ' ' + userToAdd.surname);
    });

    await test.step('[10] Click on profile button', async () => {
      await navbar.clickOnProfileButton();
      await sidebar.verifySidebar();
      await sidebar.verifyAdminPanelButtonVisibility();
    });

    await test.step('[10] Click on logout button', async () => {
      await sidebar.clickOnLogoutButton();
      await homePage.verifyLoginButtonIsVisible();
    });
  });
});
