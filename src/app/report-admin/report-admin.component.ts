import {Component, OnInit, Input} from "@angular/core";
// import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit {

  // @Input adminId: string;

  constructor() {
  }

  ngOnInit() {

  }

  public doughnutChartLabels: string[] = ['Male', 'Female', 'Not Defined', 'Didn\'t revelaed','laila','sngit','shell'];
  public doughnutChartData: number[] = [35, 35, 10, 42, 40, 42, 22];
  public doughnutChartType: string = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
