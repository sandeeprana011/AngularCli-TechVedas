import {OnInit} from "@angular/core";
import {Question} from "../databasestructure/Question";
import {Option} from "../databasestructure/Option";
import {Const} from "../const";
import {Survey} from "../databasestructure/Survey";
import {HTTPService} from "../utility/HTTPService";
import {Component} from "@angular/core/src/metadata/directives";
import {StorageService} from "../utility/StorageService";
import {Utility} from "../utility/Utility";
import {Router, ActivatedRoute} from "@angular/router";

export declare var jQuery: any;

@Component({
  selector: 'admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.css'],
  providers: [HTTPService, StorageService]
})

export class AdminAppComponent implements OnInit {

  private httpService: HTTPService;

  public adminId: string;
  public surveysArray: Array<Survey> = [];
  public questionsArray: Array<Question> = [];
  public questionsArray2: Array<Question> = [];
  // public question_text: string = "Some textk";
  public questionRadio: Question = new Question(null, "What is your name So far?Radio", Const.TYPE_RADIO_QUESTION, "1", "1", "0", "0", "15 Aug 2016", "16 Aug 2016");
  public questionCheckBox: Question = new Question(null, "What is your name So far?CheckBox", Const.TYPE_CHECKBOX_QUESTION, "1", "1", "0", "0", "15 Aug 2016", "16 Aug 2016");
  public questionText: Question = new Question(null, "What is your name So far?Text", Const.TYPE_TEXT_QUESTION, "1", "1", "0", "0", "15 Aug 2016", "16 Aug 2016");
  public questionTakingPicture: Question = new Question(null, "What is your name So far?Picture", Const.TYPE_TAKEPICTURE_QUESTION, "1", "1", "0", "0", "15 Aug 2016", "16 Aug 2016");
  private storageService: StorageService;
  private route: ActivatedRoute;
  private router: Router;
  // public questionText: Question = new Question(null, "What is your name So far?Text", Const.TYPE_TEXT_QUESTION, "1", "1", "0", "0", "15 Aug 2016", "16 Aug 2016");


  constructor(_httpService: HTTPService, _router: Router, _route: ActivatedRoute, _storageService: StorageService) {
    this.httpService = _httpService;
    this.router = _router;
    this.route = _route;
    this.storageService = _storageService;
  }


  ngOnInit() {

    // this.httpService.listAllSurveys(UrlFactory.getUrlListAllSurverys())
    //     .subscribe(
    //         data=>this.updateSurveysList(data),
    //         error=>console.log(error.json()),
    //         ()=>console.debug("Done")
    //     );

    jQuery(document).ready(function () {
      jQuery('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    });


    var optionBrahma = new Option("1", "25", "Brahma", "12/123/12", "2/12/12");
    var optionVishnu = new Option("2", "25", "Vishnu", "12/123/12", "2/12/12");
    var optionMahesh = new Option("3", "25", "Mahesh", "12/123/12", "2/12/12");
    let someArra = [optionBrahma, optionVishnu, optionMahesh];

    this.questionRadio.question_options_array = Object.create(someArra);
    this.questionCheckBox.question_options_array = Object.create(someArra);

    this.questionsArray.push(this.questionRadio);
    this.questionsArray.push(this.questionCheckBox);

    this.questionsArray2.push(this.questionText);
    this.questionsArray2.push(this.questionTakingPicture);

    let survey = new Survey("1", "1", "Survey Name",
      "Survey description is something weird", "start_time",
      "end_time", "1", "creation_time", "updat_time", 0);

    let survey2 = new Survey("2", "2", "Survey Second",
      "Second Survey description is something weird", "start_time",
      "end_time", "1", "creation_time", "updat_time", 0);

    survey.questions = Object.create(this.questionsArray);
    survey2.questions = Object.create(this.questionsArray2);

    this.surveysArray.push(Object.create(survey));
    this.surveysArray.push(Object.create(survey2));
    this.adminId = "1";


  }


  logout() {
    let utility = new Utility(this.router, this.route, this.storageService);
    utility.logoutFromApplication();
  }

  // private updateSurveysList(data) {
  //     console.debug(data);
  // }
}

