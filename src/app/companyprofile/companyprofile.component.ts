import {Component, OnInit} from "@angular/core";
import {Company} from "../databasestructure/Company";
import {Router, ActivatedRoute} from "@angular/router";
import {StorageService} from "../utility/StorageService";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";

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
    // this.httpService.requestPostObservableNew(UrlFactory.getUrlSaveCompanyProfile(),)
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

    console.debug(this.companyProf);
  }
}
