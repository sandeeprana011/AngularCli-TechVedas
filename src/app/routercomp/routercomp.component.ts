import {Component, OnInit, NgZone} from "@angular/core";
import {Config} from "../config";
import {Const} from "../const";
import {StorageService} from "../utility/StorageService";

export declare var jQuery: any;
@Component({
  selector: 'app-routercomp',
  templateUrl: './routercomp.component.html',
  styleUrls: ['./routercomp.component.css']
})
export class RoutercompComponent implements OnInit {
  private storageService: StorageService;
  private ngZone: NgZone;

  constructor(_storageService: StorageService, _ngZone: NgZone) {
    this.storageService = _storageService;
    this.ngZone = _ngZone;
  }

  ngOnInit() {
  }

  // logout() {
  //   this.setParamForLogout();
  //
  //   this.ngZone.runOutsideAngular(() => {
  //     location.reload();
  //   });
  // }

  private setParamForLogout() {
    Config.LOGIN_TYPE = '';
    Config.ID_FOR_ALL = "";
    Config.USERNAME = "";
    Config.PASSWORD = "";

    this.storeToLocalStorage()

    // console.debug(data + "Data downloaded login")

    // jQuery("#login").get(0).click();

  }

  private storeToLocalStorage() {
    this.storageService.writeString(Const.LOGIN_TYPE, "")
    this.storageService.writeString(Const.ADMIN_ID, "")
    this.storageService.writeString(Const.USERNAME, "")
    this.storageService.writeString(Const.PASSWORD, "")

  }

}
