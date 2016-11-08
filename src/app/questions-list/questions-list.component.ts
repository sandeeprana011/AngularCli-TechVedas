import {Component, OnInit} from "@angular/core";
import {Question} from "../databasestructure/Question";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Params, Router, ActivatedRoute} from "@angular/router";
import {Survey} from "../databasestructure/Survey";


export declare var jQuery: any;
@Component({

  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
  selector: 'questionslist',
  providers: [HTTPService]
})

export class QuestionsListComponent implements OnInit {


  id;
  adminId: string = "";
  // @Input() questionsArray: Array<Question> = [];


  private httpService: HTTPService;
  private survey: Survey = new Survey("", "", "", "", "", "", "", "", "", false);
  private route: ActivatedRoute;
  private router: Router;
  private questionsArray: Array<Question> = [];


  constructor(_route: ActivatedRoute, _router: Router, _httpService: HTTPService) {
    this.route = _route;
    this.router = _router;
    this.httpService = _httpService;
  }

  //
  public q = {questionsList: []};

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramsChanged(params['id']);
    });


    this.questionsArray = [];
    // console.debug(this.q);


  }

  public createNewQuestionAndAdd(questionType) {
    if (questionType === null || questionType === "") {
      questionType = "text";
    }
    // let quest: Question = new Question("questionid", "questiontext", questionType, this.surveyId, this.adminId, "0", "0", "crettime", "updatetime");
    let question: Question = new Question(null, "", questionType, this.survey.survey_id, this.adminId, "0", "0", "", "");


    question.question_options_array = [];
    this.questionsArray.push(question);

    // console.debug(question);
  }

  private downloadQuestions() {
    let url: string = UrlFactory.getUrlQuestionsListInASurvey(this.survey.survey_id);
    this.httpService.listAllQuestions(url)
      .subscribe(
        data=>this.updateQuestionsList(data),
        error=>console.debug(error),
        ()=>console.debug("Done")
      );
  }


  private updateQuestionsList(data: any) {

    this.questionsArray.splice(0, this.questionsArray.length);
    for (var question of data['questions']) {
      this.questionsArray.push(question);
    }

    jQuery('.collapsible').collapsible({
        accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        onOpen: function (el) {
          alert('Open');
        }, // Callback for Collapsible open
        onClose: function (el) {
          alert('Closed');
        } // Callback for Collapsible close
      }
    );


  }


  ngAfterContentInit() {
    this.route.params.forEach((params: Params) => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    console.debug("Survey id for questionslist" + this.id);

    // this.urlString = UrlFactory.getUrlToMapWithHeatMap(this.id);
  }


  paramsChanged(id) {
    this.httpService.requestGetObservable(UrlFactory.getUrlSurveyDetails(id.toString()))
      .subscribe(
        data=>this.updateViews(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("Done")
      );

  }

  private updateViews(data: any) {
    this.survey = JSON.parse(data);
    this.adminId = this.survey.admin_id;
    this.downloadQuestions();

    if (this.survey.is_published) {
      jQuery('#idQuestionsList').find('*').attr('disabled', true);
    } else {
      jQuery('#idQuestionsList').find('*').attr('disabled', false);
    }
  }
}

