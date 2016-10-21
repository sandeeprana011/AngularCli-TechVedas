/**
 * Created by sandeeprana on 21/10/16.
 */

export class Company {
  company_email: string;
  company_id: string;
  company_name: string;
  company_password: string;
  company_phone: string;
  company_username: string;
  company_website: string;
  creation_time: string;
  updation_time: string;

  constructor(company_email: string,
              company_id: string,
              company_name: string,
              company_password: string,
              company_phone: string,
              company_username: string,
              company_website: string,
              creation_time: string,
              updation_time: string) {
    this.company_email = company_email;
    this.company_id = company_id;
    this.company_name = company_name;
    this.company_password = company_password;
    this.company_phone = company_phone;
    this.company_username = company_username;
    this.company_website = company_website;
    this.creation_time = creation_time;
    this.updation_time = updation_time;
  }

  initWithData(data: any) {
    this.company_email = data['company_email'];
    this.company_id = data['company_id'];
    this.company_name = data['company_name'];
    this.company_password = data['company_password'];
    this.company_phone = data['company_phone'];
    this.company_username = data['company_username'];
    this.company_website = data['company_website'];
    this.creation_time = data['creation_time'];
    this.updation_time = data['updation_time'];
  }
}
