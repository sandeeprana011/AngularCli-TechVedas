export class UserOfThisApp {
  constructor(id: string, fullname: string, email: string, password: string) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
  }

  id: string;
  fullname: string;
  email: string;
  password: string;

}
