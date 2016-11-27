import {Component, OnInit} from "@angular/core";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {ChartData} from "../databasestructure/Chart";
import {Const} from "../const";
// import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";

declare let jsPDF;
declare let html2canvas;
export declare let jQuery: any;
@Component({
  selector: 'app-reportadminsurvey',
  templateUrl: './reportadminsurvey.component.html',
  styleUrls: ['./reportadminsurvey.component.css']
})
export class ReportadminsurveyComponent implements OnInit {


  // @Input adminId: string;
  private id;
  private route;
  private router: Router;
  private httpService: HTTPService;
  private listCharts: Array<ChartData> = [];
  private urlString = UrlFactory.getUrlToMapWithHeatMap(this.id);


  constructor(_route: ActivatedRoute, _router: Router, _httpService: HTTPService) {
    this.route = _route;
    this.router = _router;
    this.httpService = _httpService;
  }


  ngAfterContentInit() {
    this.route.params.forEach((params: Params) => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    console.debug("Survey id for report" + this.id);

    this.urlString = UrlFactory.getUrlToMapWithHeatMap(this.id);
  }


  // reloadWithNewId(id: number) {
  //   this.router.navigateByUrl('my/' + id + '/view');
  // }


  ngOnInit() {
    console.debug("ngOnInit");

    this.route.params.subscribe(params => {
      this.paramsChanged(params['id']);
    });
  }

  paramsChanged(id) {
    this.httpService.requestGetObservable(UrlFactory.getUrlAdminReportSurvey(id.toString()))
      .subscribe(
        data => this.updateViews(data),
        error => this.httpService.errorOccured(error.status),
        () => console.debug("Done")
      );

  }


  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  private updateViews(dalta: any) {

    this.listCharts = [];

    let data = JSON.parse(dalta);
    let questions = data['question'];


    for (var ques of questions) {


      let charte = new ChartData([], [], "", "", "");
      charte = charte.initWithObject(ques);
      charte.question_type = ques.question_type.toLocaleString();
      if (ques.question_type === Const.TYPE_STAR_RATING) {
        charte.chartType = "bar";
      } else if (ques.question_type === Const.TYPE_RADIO_QUESTION) {
        charte.chartType = "pie"
      }

      this.listCharts.push(charte);
    }
    // console.debug(this.listCharts);

  }

  public download() {

    var doc = new jsPDF();
    // doc.text(20, 20, 'Hello world!');
    // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    // doc.addPage();
    // doc.text(20, 20, 'Do you like that?');

    // var node = document.getElementById("#reportdownload");
    var parentNode = jQuery('#leveltwo');
    html2canvas(parentNode, {

      onrendered: function (canvas) {
        // for (var question of questions)
        var img = canvas.toDataURL();
        doc.addImage(img, 'JPEG', 0, 0);
        doc.paddingRight = 20;
        doc.save('Text.pdf');
      }
    });

    // Save the PDF
    // doc.save('Test.pdf');
  }
}
