import {Component, OnInit, NgZone} from "@angular/core";
import {Const} from "../const";
import {Config} from "../config";
import {HTTPService} from "../utility/HTTPService";
import {StorageService} from "../utility/StorageService";

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

  constructor(_httpservice: HTTPService, _storageService: StorageService, _ngzone: NgZone) {
    this.httpService = _httpservice;
    this.storageService = _storageService;
    this.ngzone = _ngzone;
    this.typeLogin = 'admin';
  }

  ngOnInit() {
  }


  loginUserView() {
    // jQuery("#loginButton").prop('disabled', true);
    // jQ("loginButton").attr('disabled','disabled');
    console.debug(this.typeLogin);
    console.debug(this.username + this.password);

    // this.httpService.loginUser(UrlFactory.getUrlLoginAdminUser(), this.username, this.password)
    //   .subscribe(
    //     data=>this.onSuccessfullyLogin(data),
    //     error=>this.httpService.errorOccured(error.status),
    //     ()=>console.debug("Login attempted")
    //   );

  }

  private onSuccessfullyLogin(data) {
    Config.ADMIN_ID = data[Const.ADMIN_ID];
    Config.USERNAME = this.username;
    Config.PASSWORD = this.password;

    this.storageService.writeString(Const.ADMIN_ID, Config.ADMIN_ID)
    this.storageService.writeString(Const.USERNAME, this.username)
    this.storageService.writeString(Const.PASSWORD, this.password)

    console.debug(data + "Data downloaded login")

    this.ngzone.runOutsideAngular(() => {
      location.reload();
    });
  }

}
