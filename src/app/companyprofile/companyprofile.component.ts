import {Component, OnInit} from "@angular/core";
import {Company} from "../databasestructure/Company";
import {Router, ActivatedRoute} from "@angular/router";
import {StorageService} from "../utility/StorageService";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";
import {Config} from "../config";

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {

  private disabled: boolean = true;
  private companyProf: Company = new Company("", "", "", "", "", "", "", "", "");
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
    this.httpService.requestGetObservable(UrlFactory.getUrlProfileCompany())
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
    let jsoni = JSON.stringify(this.companyToDictionary(this.companyProf));

    this.httpService.requestPostObservableNew(UrlFactory.getUrlSaveCompanyProfile(), jsoni)
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

    let jsoni = "{\"company_password\":\"" + this.passwordRetype + "\"}"

    this.httpService.requestPostObservableNew(UrlFactory.getUrlSaveNewPassword(), jsoni)
      .subscribe(
        data=>this.onSuccessfullyLoginCompany(),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("done")
      )
  }


  private updateViews(dataDownloaded: any) {

    let data = JSON.parse(dataDownloaded);

    let name = data[Const.COMPANY_NAME];

    let email = data[Const.COMPANY_EMAIL];
    let phone = data[Const.COMPANY_PHONE];
    let website = data[Const.COMPANY_WEBSITE];
    let id = data[Const.COMPANY_ID];


    this.companyProf.company_name = name;
    this.companyProf.company_email = email;
    this.companyProf.company_phone = phone;
    this.companyProf.company_website = website;
    this.companyProf.company_id = id;

    // console.debug(this.companyProf);
  }

  private onSavingProfile(data: any) {
    // console.debug(data);
  }


  public companyToDictionary(company: Company) {

    let jsonObj: {[key: string]: Object} = {};

    jsonObj[Const.COMPANY_NAME] = company.company_name;
    jsonObj[Const.COMPANY_WEBSITE] = company.company_website;
    jsonObj[Const.COMPANY_PHONE] = company.company_phone;

    return jsonObj;
  }


  private onPasswordChanged(data: any) {
    console.debug(data);
  }

  private onSuccessfullyLoginCompany() {
    Config.PASSWORD = this.passwordRetype;
    this.storeToLocalStorage();
    this.storageService.writeString(Const.PASSWORD, this.passwordRetype);

  }

}
