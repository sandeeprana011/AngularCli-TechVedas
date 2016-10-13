import {Question} from "./Question";
/**
 * Created by sandeeprana on 11/09/16.
 */


export class Surveyor {

  constructor(surveyor_id: string,
              admin_id: string,
              surveyor_fullname: string,
              surveyor_phone: string,
              surveyor_country_code: string,
              surveyor_email: string,
              surveyor_password: string,
              surveyor_city: string,
              surveyor_address: string,
              surveyor_state: string,
              surveyor_country: string,
              surveyor_pinzip: string,
              creation_time: string,
              updation_time: string) {

    this.surveyor_id = surveyor_id;
    this.admin_id = admin_id;
    this.surveyor_fullname = surveyor_fullname;
    this.surveyor_phone = surveyor_phone;
    this.surveyor_country_code = surveyor_country_code;
    this.surveyor_email = surveyor_email;
    this.surveyor_password = surveyor_password;
    this.surveyor_city = surveyor_city;
    this.surveyor_address = surveyor_address;
    this.surveyor_state = surveyor_state;
    this.surveyor_country = surveyor_country;
    this.surveyor_pinzip = surveyor_pinzip;
    this.creation_time = creation_time;
    this.updation_time = updation_time;
  }


  public surveyor_id: string;
  public admin_id: string;
  public surveyor_fullname: string;
  public surveyor_phone: string;
  public surveyor_country_code: string;
  public surveyor_email: string;
  public surveyor_password: string;
  public surveyor_city: string;
  public surveyor_address: string;
  public surveyor_state: string;
  public surveyor_country: string;
  public surveyor_pinzip: string;
  public creation_time: string;
  public updation_time: string;
}
