import {Component, OnInit, NgZone} from "@angular/core";
import {Config} from "../config";
import {Const} from "../const";
import {StorageService} from "../utility/StorageService";
import {Utility} from "../utility/Utility";
import {Router, ActivatedRoute} from "@angular/router";

export declare var jQuery: any;
@Component({
  selector: 'app-routercomp',
  templateUrl: './routercomp.component.html',
  styleUrls: ['./routercomp.component.css']
})
export class RoutercompComponent implements OnInit {
  private storageService: StorageService;
  private ngZone: NgZone;
  private route: ActivatedRoute;
  private router: Router;

  constructor(_storageService: StorageService, _ngZone: NgZone, _router: Router, _route: ActivatedRoute) {
    this.storageService = _storageService;
    this.ngZone = _ngZone;
    this.router = _router;
    this.route = _route;
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
