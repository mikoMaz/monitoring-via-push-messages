const homePage = 'https://errwarn.projektstudencki.pl/';

export async function getHomePage() {
  return homePage;
}

export class UserSuperAdmin {
  readonly email: string;
  readonly password: string;
  readonly company: string;

  constructor() {
    this.email = 'test_@test.pl';
    this.password = 'Aa1!2345';
    this.company = 'test-company';
  }
}

export class UserToAdd {
  readonly name: string;
  readonly surname: string;
  readonly email: string;

  constructor() {
    this.name = 'JanTEST';
    this.surname = 'KowalskiTEST';
    this.email = 'jan@example.com';
  }
}
