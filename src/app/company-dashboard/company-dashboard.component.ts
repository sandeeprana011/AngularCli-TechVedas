import {Component, OnInit} from "@angular/core";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Company} from "../databasestructure/Company";
import {Const} from "../const";
import {Admin} from "../databasestructure/Admin";
import {ActivatedRoute, Router} from "@angular/router";
import {Utility} from "../utility/Utility";
import {StorageService} from "../utility/StorageService";
import {Survey} from "../databasestructure/Survey";


export declare var jQuery: any;

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})

export class CompanyDashboardComponent implements OnInit {
  private httpService: HTTPService;
  private company: Company = new Company("n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a");
  private adminsArray: Array<Admin> = [];
  private router;
  private route;
  private utility: Utility;
  private storageService: StorageService;

  heading: string;
  description: string;


  constructor(_httpService: HTTPService, _router: Router, _route: ActivatedRoute, _storageService: StorageService) {
    this.httpService = _httpService;
    this.router = _router;
    this.route = _route;
    this.storageService = _storageService;
    this.utility = new Utility(this.router, this.route, this.storageService);
  }


  ngOnInit() {
    jQuery(document).ready(function () {
      jQuery('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    });

    this.initializeDashboard()
  }

  initializeDashboard() {
    this.httpService.initCompanyDashBoard(UrlFactory.getUrlInitCompany())
      .subscribe(
        data=>this.updateAllViews(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("Done")
      );

  }


  private updateAllViews(data: any) {

    var dataJson = JSON.parse(data);
    this.company.initWithData(dataJson[Const.COMPANY]);
    let admins = [];
    admins = dataJson["admins"];
    for (let adme of admins) {
      this.adminsArray.push(new Admin().initWithData(adme))
    }

    console.log("admin", admins.pop().surveys);

  }

  reportRoute(surveya: Survey) {
    this.router.navigate(['report', surveya.survey_id], {relativeTo: this.route});
    this.heading = surveya.survey_name;
    this.description = surveya.survey_description;
  }

  logout() {
    this.utility.logoutFromApplication();
  }


}
