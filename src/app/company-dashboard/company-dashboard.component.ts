import {Component, OnInit} from "@angular/core";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Company} from "../databasestructure/Company";
import {Const} from "../const";
import {Admin} from "../databasestructure/Admin";


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

  constructor(_httpService: HTTPService) {
    this.httpService = _httpService;
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
      this.adminsArray.push(new Admin(adme))
    }

    console.log("admin", admins.pop().surveys);

  }
}
