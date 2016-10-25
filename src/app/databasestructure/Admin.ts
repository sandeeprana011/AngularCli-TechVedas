import {Const} from "../const";
import {Survey} from "./Survey";
/**
 * Created by sandeeprana on 22/10/16.
 */


export class Admin {
  static VERIFIED: string = "verified";
  static PENDING: string = "pending";

  company_id: string;
  admin_id: string;
  admin_name: string;
  admin_email: string;
  admin_address: string;
  admin_city: string;
  admin_phone: string;
  admin_country_code: string;
  admin_state: string;
  admin_country: string;
  admin_pincode: string;

  surveyListing: Array<Survey> = [];
  private verify_status: string;


  initWithParams(company_id,
                 admin_id,
                 admin_name,
                 admin_email,
                 admin_address,
                 admin_city,
                 admin_phone,
                 admin_country_code,
                 admin_state,
                 admin_country,
                 admin_pincode,
                 verify_status) {

    this.company_id = company_id;
    this.admin_id = admin_id;
    this.admin_name = admin_name;
    this.admin_email = admin_email;
    this.admin_address = admin_address;
    this.admin_city = admin_city;
    this.admin_phone = admin_phone;
    this.admin_country_code = admin_country_code;
    this.admin_state = admin_state;
    this.admin_country = admin_country;
    this.admin_pincode = admin_pincode;
    this.verify_status = verify_status;
  }


  constructor() {

  }

  initWithData(data: any) {
    this.company_id = data[Const.COMPANY_ID];
    this.admin_id = data[Const.ADMIN_ID];
    this.admin_name = data[Const.ADMIN_NAME];
    this.admin_email = data[Const.ADMIN_EMAIL];
    this.admin_address = data[Const.ADMIN_ADDRESS];
    this.admin_city = data[Const.ADMIN_CITY];
    this.admin_phone = data[Const.ADMIN_PHONE];
    this.admin_country_code = data[Const.ADMIN_COUNTRY_CODE];
    this.admin_state = data[Const.ADMIN_STATE];
    this.admin_country = data[Const.ADMIN_COUNTRY];
    this.admin_pincode = data[Const.ADMIN_PINCODE];
    this.surveyListing = data[Const.SURVEYS];
    this.verify_status = data[Const.VERIFICATION_STATUS];

    return this;
  }
}
