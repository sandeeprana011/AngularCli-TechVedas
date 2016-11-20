import {Component, OnInit} from "@angular/core";
import {HTTPService} from "../utility/HTTPService";
import {StorageService} from "../utility/StorageService";
import {Router, ActivatedRoute} from "@angular/router";
import {Admin} from "../databasestructure/Admin";
import {UrlFactory} from "../utility/UrlFactory";

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {

  admin: Admin = new Admin();

  retypePassword: string;

  private httpService: HTTPService;
  private storageService: StorageService;
  private router: Router;
  private route: ActivatedRoute;
  private admin_password: string;

  constructor(_httpService: HTTPService, _storageService: StorageService, _router: Router, _route: ActivatedRoute) {
    this.httpService = _httpService;
    this.storageService = _storageService;
    this.router = _router;
    this.route = _route;
  }

  ngOnInit() {

  }

  registerNewAdmin() {
    if (this.retypePassword === this.admin_password && this.retypePassword != "" && this.retypePassword != null) {

      // this.admin.admin_email = this.admin.admin_email;

      let bodyJson = JSON.stringify(this.admin);
      console.debug(bodyJson);

      this.httpService.requestPostObservableNew(UrlFactory.getUrlAdminSignUp(), bodyJson)
        .subscribe(
          data => this.onSuccessFully(data),
          error => this.httpService.errorOccured(error.status),
          () => console.debug("Done!")
        )
    } else {
      alert("Password don't match!")
    }


  }

  private onSuccessFully(data) {
    console.debug(data);
    this.router.navigate(['login']);
  }
}
