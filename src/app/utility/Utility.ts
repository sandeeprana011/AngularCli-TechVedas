import {Router, ActivatedRoute} from "@angular/router";
import {StorageService} from "./StorageService";
import {Const} from "../const";
import {Config} from "../config";
/**
 * Created by sandeeprana on 24/10/16.
 */


export class Utility {
  constructor(router: Router, route: ActivatedRoute, storageService: StorageService) {
    this.router = router;
    this.route = route;
    this.storageService = storageService;
  }

  router: Router;
  route: ActivatedRoute;
  storageService: StorageService;

  logoutFromApplication() {
    this.storageService.writeString(Const.LOGIN_TYPE, "");
    this.storageService.writeString(Const.ADMIN_ID, "");
    this.storageService.writeString(Const.USERNAME, "");
    this.storageService.writeString(Const.PASSWORD, "");
    Config.USERNAME = "";
    Config.PASSWORD = "";
    Config.ID_FOR_ALL = "";
    Config.LOGIN_TYPE = "";

    this.router.navigate(['login']);
  }

}
