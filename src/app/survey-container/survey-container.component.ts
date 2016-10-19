import {OnInit, Component, NgZone} from "@angular/core";
import {Config} from "../config";
import {Question} from "../databasestructure/Question";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";
import {Survey} from "../databasestructure/Survey";
import {ObjectToRequestBodyParser} from "../QuestionToRequestBodyParser";
import {StorageService} from "../utility/StorageService";
import {Input} from "@angular/core/src/metadata/directives";
// import {jQuery} from "../app/app.component";
export declare var jQuery: any;

@Component({
  selector: 'surveycontainer',
  templateUrl: './survey-container.component.html',
  styleUrls: ['./survey-container.component.css'],
  providers: [HTTPService]
})

export class SurveyContainerComponent implements OnInit {


  @Input() surveys: Array<Survey>;
  @Input() adminId: string;

  mySurvey: Survey = new Survey("", "", "", "", "", "", "", "", "", 0);
  // textarea: string = "textarea";

  public questions: Array<Question>;


  private httpService: HTTPService;
  private indexSurveySeleted;
  private storageService: StorageService;
  private ngzone;


  constructor(_httpService: HTTPService, _storageService: StorageService, _ngZone: NgZone) {
    this.httpService = _httpService;
    this.storageService = _storageService;
    this.storageService.write("fuck", "somedata");
    this.ngzone = _ngZone;
    // console.debug(this.storageService.read("fuck"));
  }

  //
  public q = {surveysList: this.surveys, quest: [], surveyId: "", adminId: this.adminId, username: "", password: ""};

  ngOnInit() {

    let username: string = this.storageService.readString(Const.USERNAME);


    let password: string = this.storageService.readString(Const.PASSWORD);
    let adminID: string = this.storageService.readString(Const.ADMIN_ID);

    if (username === null || username === "" || password === null || password === "" || adminID === null || adminID === "") {
      jQuery('#needToLoginIn').openModal();
    } else {
      console.debug(username + password + adminID);
      Config.USERNAME = username;
      Config.PASSWORD = password;
      Config.ADMIN_ID = adminID;
    }

    // console.debug(username+"Some other key check");
    this.httpService.listAllSurveys(UrlFactory.getUrlListAllSurverys())
      .subscribe(
        data=>this.updateSurveysList(data),
        error=>console.debug(error),
        ()=>console.debug("Done")
      );


    this.q.surveysList = this.surveys;

    // this.q.quest = this.q.surveysList[0].questions;
    // console.debug(this.surveys);
  }

  surveyItemClicked(ndx) {
    this.indexSurveySeleted = ndx;
    let surveyId: string = this.q.surveysList[ndx].survey_id;
    let url: string = UrlFactory.getUrlQuestionsListInASurvey(surveyId);
    this.httpService.listAllQuestions(url)
      .subscribe(
        data=>this.updateQuestionsList(data, ndx),
        error=>console.debug(error),
        ()=>console.debug("Done")
      );


    // this.q.quest.splice(0, this.q.quest.length);
    // for (var question of this.q.surveysList[ndx].questions) {
    //     this.q.quest.push(question);
    // }

    // console.debug(this.q.quest);
  }

  createNewSurvey() {
    // console.debug(this.q.surveysList)
    // console.debug(this.mySurvey)

    let parserJsonDict: ObjectToRequestBodyParser = new ObjectToRequestBodyParser();
    let jsonObject = parserJsonDict.surveyToDictionary(this.mySurvey);

    // console.debug(jsonObject)

    this.httpService.createNewSurveyNetwork(UrlFactory.createNewSurveyUrl(), JSON.stringify(jsonObject))
      .subscribe(
        data=>this.updateSurveysListAfterCreatingNewSurvey(data),
        error=>console.debug(error),
        ()=>console.debug("Done")
      )

  }

  deleteSurveyView() {
    // this.q.surveyId
    this.httpService.deleteSurvey(UrlFactory.getUrlDeleteSurvey(this.q.surveyId))
      .subscribe(
        data=>this.surveyDeleted(data),
        error=>console.debug(error),
        ()=>console.debug("survey delete request called")
      )

  }

  publishSurveyView() {
    this.httpService.publishSurvey(UrlFactory.getUrlPublishSurvey(this.q.surveyId))
      .subscribe(
        data=>this.surveyPublished(data),
        error=>console.debug(error),
        () => console.debug("Published thread executed")
      )
  }

  private updateSurveysList(data) {
    // console.debug(data);
    // let surveys=[];
    this.q.surveysList = data['surveys'];
    this.surveyItemClicked(0);
    // console.debug(this.q.surveysList[0]);

  }

  private updateQuestionsList(data, ndx: any) {
    this.q.surveysList[ndx].questions = data['questions'];
    this.q.surveyId = this.q.surveysList[ndx].survey_id;
    this.q.adminId = this.q.surveysList[ndx].admin_id;

    this.q.quest.splice(0, this.q.quest.length);

    for (var question of data['questions']) {
      this.q.quest.push(question);
    }
    console.debug(data);


  }

  private updateSurveysListAfterCreatingNewSurvey(data) {


    if (data['status'] === 200) {
      console.debug(data)
      this.mySurvey.survey_id = data[Const.SURVEY][Const.SURVEY_ID]
      this.mySurvey.admin_id = data[Const.SURVEY][Const.ADMIN_ID]

      this.q.surveysList.push(Object.create(this.mySurvey))
    } else {
      alert("Error: Cann't create Survey")
    }
  }

  private surveyDeleted(data) {
    if (data['status'] === 200) {
      if (this.q.surveysList.length > 1) {
        this.q.surveysList.splice(this.indexSurveySeleted, 1);
        this.surveyItemClicked(0)
      } else {

      }

      console.debug(data)

    } else {
      alert("Error: Cann't create Survey")
    }
  }

  private surveyPublished(data) {
    if (data['status'] === 200) {
      alert("Survey Published!")
      console.debug(data)

    } else {
      alert("Error: Cann't create Survey")

    }
  }

  loginUserView() {
    jQuery("#loginButton").prop('disabled', true);
    // $("loginButton").attr('disabled','disabled');
    console.debug(this.q.username + this.q.password);
    this.httpService.loginUser(UrlFactory.getUrlLoginAdminUser(), this.q.username, this.q.password)
      .subscribe(
        data=>this.onSuccessfullyLogin(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("Login attempted")
      );

  }

  private onSuccessfullyLogin(data) {
    Config.ADMIN_ID = data[Const.ADMIN_ID];
    Config.USERNAME = this.q.username;
    Config.PASSWORD = this.q.password;

    this.storageService.writeString(Const.ADMIN_ID, Config.ADMIN_ID)
    this.storageService.writeString(Const.USERNAME, this.q.username)
    this.storageService.writeString(Const.PASSWORD, this.q.password)

    console.debug(data + "Data downloaded login")

    this.ngzone.runOutsideAngular(() => {
      location.reload();
    });
  }
}

