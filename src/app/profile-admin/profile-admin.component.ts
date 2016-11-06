import {Component, OnInit} from "@angular/core";
import {StorageService} from "../utility/StorageService";
import {ActivatedRoute, Router} from "@angular/router";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";
import {Config} from "../config";
import {Admin} from "../databasestructure/Admin";

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  private disabled: boolean = true;
  private adminProf: Admin = new Admin();
  private storageService: StorageService;
  private route: ActivatedRoute;
  private router: Router;
  private httpService: HTTPService;
  private passwordRetype: string = "";
  private passworder: string = "";

  constructor(_router: Router, _route: ActivatedRoute, _storageService: StorageService, _httpService: HTTPService) {
    this.router = _router;
    this.route = _route;
    this.storageService = _storageService;
    this.httpService = _httpService;
  }

  ngOnInit() {
    this.httpService.requestGetObservable(UrlFactory.getUrlProfileAdmin())
      .subscribe(
        data=>this.updateViews(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("Done!")
      )
  }

  editable() {
    this.disabled = false;
  }

  saveProfile() {
    let jsoni = JSON.stringify(this.companyToDictionary(this.adminProf));

    this.httpService.requestPostObservableNew(UrlFactory.getUrlSaveAdminProfile(), jsoni)
      .subscribe(
        data=>this.onSavingProfile(data),
        error=>this.httpService.errorOccured(error.status),

        ()=>console.debug("done")
      )
  }

  saveNewPassword() {
    if (this.passworder != this.passwordRetype) {
      alert("Password don't match!");
      return;
    }

    let jsoni = "{\"admin_password\":\"" + this.passwordRetype + "\"}"

    this.httpService.requestPostObservableNew(UrlFactory.getUrlSaveNewPasswordAdmin(), jsoni)
      .subscribe(
        data=>this.onSuccessfullyLoginAdmin(),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("done")
      )
  }


  private updateViews(dataDownloaded: any) {

    let data = JSON.parse(dataDownloaded);

    this.adminProf = data;

    // let name = data[Const.COMPANY_NAME];
    //
    // let email = data[Const.COMPANY_EMAIL];
    // let phone = data[Const.COMPANY_PHONE];
    // let website = data[Const.COMPANY_WEBSITE];
    // let id = data[Const.COMPANY_ID];
    //
    //
    // this.adminProf.company_name = name;
    // this.adminProf.company_email = email;
    // this.adminProf.company_phone = phone;
    // this.adminProf.company_website = website;
    // this.adminProf.company_id = id;

    // console.debug(this.adminProf);
  }

  private onSavingProfile(data: any) {
    // console.debug(data);
  }


  public companyToDictionary(company: Admin) {

    let jsonObj: {[key: string]: Object} = {};

    jsonObj[Const.ADMIN_NAME] = company.admin_name;
    jsonObj[Const.ADMIN_EMAIL] = company.admin_email;
    jsonObj[Const.ADMIN_ADDRESS] = company.admin_address;
    jsonObj[Const.ADMIN_CITY] = company.admin_city;
    jsonObj[Const.ADMIN_COUNTRY] = company.admin_country;
    jsonObj[Const.ADMIN_COUNTRY_CODE] = company.admin_country_code;
    jsonObj[Const.ADMIN_PHONE] = company.admin_phone;
    jsonObj[Const.ADMIN_PINCODE] = company.admin_pincode;
    jsonObj[Const.ADMIN_STATE] = company.admin_state;

    return jsonObj;
  }


  private onPasswordChanged(data: any) {
    console.debug(data);
  }

  private onSuccessfullyLoginAdmin() {
    Config.PASSWORD = this.passwordRetype;
    // this.storeToLocalStorage();
    this.storageService.writeString(Const.PASSWORD, this.passwordRetype);
  }

}
