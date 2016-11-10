import {Component, OnInit} from "@angular/core";

export declare var jQuery: any;


@Component({
  selector: 'app-website-container',
  templateUrl: './website-container.component.html',
  styleUrls: ['./website-container.component.css']
})
export class WebsiteContainerComponent implements OnInit {

  // lineChart
  public lineChartData: Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: string = 'line';


  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    // this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  /***
   *
   * @type {(string|string|string)[]}
   */
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';


  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 80], label: 'Series B'}
  ];
  public radarChartType: string = 'radar';


  constructor() {
  }

  ngOnInit() {
    jQuery('.carousel.carousel-slider').carousel({full_width: true, time_constant: 500});
    // setInterval(() => this.next(), 6000);


    jQuery(document).ready(function () {
      jQuery('.scrollspy').scrollSpy({scrollOffset: 60});
    });


  }

  private next() {
    jQuery('.carousel').carousel('next');
  }
}
