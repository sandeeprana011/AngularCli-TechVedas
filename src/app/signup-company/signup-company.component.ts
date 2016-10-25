import {Component, OnInit} from "@angular/core";
import {HTTPService} from "../utility/HTTPService";
import {StorageService} from "../utility/StorageService";
import {Router, ActivatedRoute} from "@angular/router";
import {UrlFactory} from "../utility/UrlFactory";
import {Company} from "../databasestructure/Company";

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.css']
})
export class SignupCompanyComponent implements OnInit {

  company: Company=new Company("","","","","","","","","");
  retypePassword: string;

  private httpService: HTTPService;
  private storageService: StorageService;
  private router: Router;
  private route: ActivatedRoute;

  constructor(_httpService: HTTPService, _storageService: StorageService, _router: Router, _route: ActivatedRoute) {
    this.httpService = _httpService;
    this.storageService = _storageService;
    this.router = _router;
    this.route = _route;
  }

  ngOnInit() {

  }

  registerNewCompany() {
    if (this.retypePassword === this.company.company_password && this.retypePassword != "" && this.retypePassword != null) {

      this.company.company_username = this.company.company_email;

      let bodyJson = JSON.stringify(this.company);
      console.debug(bodyJson);

      this.httpService.requestPostObservableNew(UrlFactory.getUrlSignUp(), bodyJson)
        .subscribe(
          data=>this.onSuccessFully(data),
          error=>this.httpService.errorOccured(error.status),
          ()=>console.debug("Done!")
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
