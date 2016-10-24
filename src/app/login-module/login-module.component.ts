import {Component, OnInit, NgZone} from "@angular/core";
import {Const} from "../const";
import {Config} from "../config";
import {HTTPService} from "../utility/HTTPService";
import {StorageService} from "../utility/StorageService";
import {UrlFactory} from "../utility/UrlFactory";
import {Router, ActivatedRoute} from "@angular/router";

export declare var jQuery: any;

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent implements OnInit {
  typeLogin: string;
  username: string;
  password: string;
  private httpService: HTTPService;
  private storageService: StorageService;
  private ngzone;
  private router: Router;
  private route;


  constructor(_httpservice: HTTPService, _storageService: StorageService, _ngzone: NgZone, _router: Router, _route: ActivatedRoute) {
    this.httpService = _httpservice;
    this.storageService = _storageService;
    this.ngzone = _ngzone;
    this.typeLogin = 'admin';
    this.router = _router;
    this.route = _route;
  }

  ngOnInit() {

    let username: string = this.storageService.readString(Const.USERNAME);
    let password: string = this.storageService.readString(Const.PASSWORD);
    let adminID: string = this.storageService.readString(Const.ADMIN_ID);
    let loginType: string = this.storageService.readString(Const.LOGIN_TYPE);

    if (username === null || username === "" || password === null || password === "" || adminID === null || adminID === "") {
      // jQuery('#needToLoginIn').openModal();
      this.hideBuilder();
      this.hideCompany();
      this.hideLogin();
      this.hideLogout();
    } else {
      console.debug(username + password + adminID);
      Config.USERNAME = username;
      Config.PASSWORD = password;
      Config.ID_FOR_ALL = adminID;
      Config.LOGIN_TYPE = loginType;

      console.debug("ngOnInit from Login module");

      this.hideBuilder();
      this.hideLogin();
      this.hideCompany();
      this.showLogout();

      if (loginType === Const.COMPANY) {
        this.clickOnCompany()
      } else {
        this.clickBuilder()
      }
    }

  }


  loginUserView() {
    // jQuery("#loginButton").prop('disabled', true);
    // jQ("loginButton").attr('disabled','disabled');
    console.debug(this.typeLogin);
    console.debug(this.username + this.password);
    if (this.typeLogin === 'company') {

      this.httpService.loginUser(UrlFactory.getLoginCompanyUserUrl(), this.username, this.password)
        .subscribe(
          data=>this.onSuccessfullyLoginCompany(data),
          error=>this.httpService.errorOccured(error.status),
          ()=>console.debug("Login attempted company")
        );

    } else if (this.typeLogin === 'admin') {

      this.httpService.loginUser(UrlFactory.getUrlLoginAdminUser(), this.username, this.password)
        .subscribe(
          data=>this.onSuccessfullyLoginAdmin(data),
          error=>this.httpService.errorOccured(error.status),
          ()=>console.debug("Login attempted admin")
        );

    }


  }

  private onSuccessfullyLoginAdmin(data) {
    Config.LOGIN_TYPE = 'admin';
    Config.ID_FOR_ALL = data[Const.ADMIN_ID];
    Config.USERNAME = this.username;
    Config.PASSWORD = this.password;

    this.storeToLocalStorage();

    this.clickBuilder();
    this.hideCompany();
    this.showBuilder();
  }


  private onSuccessfullyLoginCompany(data) {
    Config.LOGIN_TYPE = 'company';
    Config.ID_FOR_ALL = "not null";
    Config.USERNAME = this.username;
    Config.PASSWORD = this.password;

    this.storeToLocalStorage();

    // console.debug(data.toString() + "Data downloaded login");

    this.clickOnCompany();
    this.hideBuilder();
    this.showCompany();

  }

  private storeToLocalStorage() {
    this.storageService.writeString(Const.LOGIN_TYPE, Config.LOGIN_TYPE);
    this.storageService.writeString(Const.ADMIN_ID, Config.ID_FOR_ALL);
    this.storageService.writeString(Const.USERNAME, this.username);
    this.storageService.writeString(Const.PASSWORD, this.password);
    jQuery('#login').hide();
  }

  private clickOnCompany() {
    this.router.navigate(['company']);
  }


  private clickBuilder() {

    this.router.navigate(['builder']);


  }
}
