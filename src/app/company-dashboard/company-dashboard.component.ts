import {Component, OnInit} from "@angular/core";


export declare var jQuery: any;

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    jQuery(document).ready(function () {
      jQuery('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    });

  }


}
