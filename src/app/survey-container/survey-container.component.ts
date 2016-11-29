import {OnInit, Component, NgZone} from "@angular/core";
import {Config} from "../config";
import {Question} from "../databasestructure/Question";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";
import {Survey} from "../databasestructure/Survey";
import {ObjectToRequestBodyParser} from "../QuestionToRequestBodyParser";
import {StorageService} from "../utility/StorageService";
import {Utility} from "../utility/Utility";
import {Router, ActivatedRoute} from "@angular/router";
import {CompleterData, CompleterService, CompleterItem} from "ng2-completer";
import {Surveyor} from "../databasestructure/Surveyor";

export declare var jQuery: any;

@Component({
  selector: 'surveycontainer',
  templateUrl: './survey-container.component.html',
  styleUrls: ['./survey-container.component.css'],
  providers: [HTTPService]
})

export class SurveyContainerComponent implements OnInit {


  private shouldHideDataRelatedToSurvey: boolean = false;
  //Ng Auto Completer
  private searchStr: string;
  private dataService: CompleterData;
  private searchData = [];
  private surveyorsList: Array<Survey> = [];

  selectedSurveyor(selected: CompleterItem) {
    // console.debug(this.searchStr);
    if (selected) {
      console.debug(selected.originalObject.surveyor_email);
      this.httpService.addSurveyorToSurvey(UrlFactory.getUrlAddMoreSurveyor(this.selectedSurvey.survey_id), selected.originalObject.surveyor_email)
        .subscribe(
          data => this.onUpdateOnAddedSurveyor(data),
          error => this.httpService.errorOccured(error.status),
          () => console.debug("Done!")
        )

    }
    // console.debug(this.searchStr);
  }


  private surveys: Array<Survey> = [];
  private adminId: string;

  heading: string;
  description: string;

  mySurvey: Survey = new Survey("", "", "", "", "", "", "", "", "", 0);
  // textarea: string = "textarea";

  public questions: Array<Question>;


  private httpService: HTTPService;
  private indexSurveySeleted;
  private storageService: StorageService;
  private ngzone;
  private selectedSurvey: Survey = new Survey("", "", "", "", "", "", "", "", "", 0);
  private utility: Utility;
  private router: Router;
  private route: ActivatedRoute;

  public q = {
    surveysList: this.surveys,
    quest: [],
    surveyId: "",
    adminId: this.adminId,
    username: "",
    password: "",
    reportUrl: ""
  };

  constructor(_httpService: HTTPService, _storageService: StorageService, _ngZone: NgZone, _router: Router, _route: ActivatedRoute, private completerService: CompleterService) {
    this.httpService = _httpService;
    this.storageService = _storageService;
    this.router = _router;
    this.route = _route;
    this.storageService.write("fuck", "somedata");
    this.ngzone = _ngZone;
    // console.debug(this.storageService.read("fuck"));
    this.utility = new Utility(this.router, this.route, this.storageService);


    this.dataService = completerService.local(this.searchData, 'surveyor_email', 'surveyor_name');

    this.getSurveyoursListinVariable(this.selectedSurvey.survey_id);
    this.downloadSurveyorsListInThisSurvey();
    // this.q.username = Config.USERNAME;
  }

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
      Config.ID_FOR_ALL = adminID;

      this.q.username = username;
      this.q.password = password;
      this.q.adminId = adminID;

    }

    // console.debug(username+"Some other key check");
    this.httpService.listAllSurveys(UrlFactory.getUrlListAllSurverys())
      .subscribe(
        data => this.updateSurveysList(data),
        error => console.debug(error),
        () => console.debug("Done")
      );


    this.q.surveysList = this.surveys;

    // this.q.quest = this.q.surveysList[0].questions;
    // console.debug(this.surveys);
  }

  surveyItemClicked(ndx) {
    this.indexSurveySeleted = ndx;
    this.selectedSurvey = this.q.surveysList[ndx];

    this.heading = this.selectedSurvey.survey_name;
    this.description = this.selectedSurvey.survey_description;

    // let surveyId: string = survey.survey_id;
    let url: string = UrlFactory.getUrlQuestionsListInASurvey(this.selectedSurvey.survey_id);

    // this.router.navigate(['questions', this.selectedSurvey.survey_id], {relativeTo: this.route});

    this.httpService.listAllQuestions(url)
      .subscribe(
        data => this.updateQuestionsList(data, ndx),
        error => this.httpService.errorOccured(error.status),
        () => console.debug("Done")
      );


    this.q.reportUrl = UrlFactory.getUrlDownloadReport(this.selectedSurvey.survey_id);

    this.getSurveyoursListinVariable(this.selectedSurvey.survey_id);

    this.downloadSurveyorsListInThisSurvey();

    this.navigateToQuestions(this.selectedSurvey.survey_id);

    // jQuery(Materialize.toast('I am a toast! <a class="headnavitem">Undo</a>', 4000));
  }

  createNewSurvey() {
    // console.debug(this.q.surveysList)
    // console.debug(this.mySurvey)

    let parserJsonDict: ObjectToRequestBodyParser = new ObjectToRequestBodyParser();
    let jsonObject = parserJsonDict.surveyToDictionary(this.mySurvey);

    // console.debug(jsonObject)

    this.httpService.createNewSurveyNetwork(UrlFactory.createNewSurveyUrl(), JSON.stringify(jsonObject))
      .subscribe(
        data => this.updateSurveysListAfterCreatingNewSurvey(data),
        error => console.debug(error),
        () => console.debug("Done")
      )

  }

  deleteSurveyView() {
    // this.q.surveyId
    this.httpService.deleteSurvey(UrlFactory.getUrlDeleteSurvey(this.q.surveyId))
      .subscribe(
        data => this.surveyDeleted(data),
        error => console.debug(error),
        () => console.debug("survey delete request called")
      )

  }

  publishSurveyView() {
    this.httpService.publishSurvey(UrlFactory.getUrlPublishSurvey(this.q.surveyId))
      .subscribe(
        data => this.surveyPublished(data),
        error => console.debug(error),
        () => console.debug("Published thread executed")
      )
  }

  private updateSurveysList(data) {
    // console.debug(data);
    // let surveys=[];
    this.q.surveysList = data['surveys'];
    this.surveyItemClicked(0);
    // console.debug(this.q.surveysList[0]);

    this.downloadSurveyorsListInThisSurvey();

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
        data => this.onSuccessfullyLogin(data),
        error => this.httpService.errorOccured(error.status),
        () => console.debug("Login attempted")
      );

  }

  private onSuccessfullyLogin(data) {
    Config.ID_FOR_ALL = data[Const.ADMIN_ID];
    Config.USERNAME = this.q.username;
    Config.PASSWORD = this.q.password;

    console.debug("q.username is : " + this.q.username);

    this.storageService.writeString(Const.ADMIN_ID, Config.ID_FOR_ALL)
    this.storageService.writeString(Const.USERNAME, this.q.username)
    this.storageService.writeString(Const.PASSWORD, this.q.password)

    console.debug(data + "Data downloaded login")

    this.ngzone.runOutsideAngular(() => {
      location.reload();
    });
  }

  logout() {
    this.utility.logoutFromApplication();
  }

  private addSurveyorsList(data: any) {
    let surveyorsList: Array<Surveyor> = JSON.parse(data);
    this.searchData.splice(0, this.searchData.length);
    for (let surveyor of surveyorsList) {
      let objTemp = {surveyor_name: "", surveyor_email: ""};
      objTemp.surveyor_name = surveyor.surveyor_fullname;
      objTemp.surveyor_email = surveyor.surveyor_email;
      console.log(surveyor.surveyor_email);
      this.searchData.push(Object.create(objTemp));
    }

    // console.debug(this.searchData[0]);
  }

  private getSurveyoursListinVariable(surveyId) {
    console.debug("Survey id is : " + surveyId);
    if (surveyId != null && surveyId != "") {
      this.httpService.requestGetObservable(UrlFactory.getUrlSurveyorsList(surveyId))
        .subscribe(
          data => this.addSurveyorsList(data),
          error => this.httpService.errorOccured(error.status),
          () => console.debug("Done!")
        )
    }
  }

  private updateSurveyorsListInASurvey(data: any) {
    let tempDat = JSON.parse(data);

    let tempListSurveyors = tempDat[Const.SURVEYOR];
    this.surveyorsList.splice(0, this.surveyorsList.length);

    for (let surveyorTemp of tempListSurveyors) {
      this.surveyorsList.push(surveyorTemp);
    }
    // console.debug(this.surveyorsList);
  }

  private downloadSurveyorsListInThisSurvey() {
    if (this.selectedSurvey.survey_id != null && this.selectedSurvey.survey_id != "") {
      this.httpService.requestGetObservable(UrlFactory.getUrlSurveyorsAddedInSurvey(this.selectedSurvey.survey_id))
        .subscribe(
          data => this.updateSurveyorsListInASurvey(data),
          error => this.httpService.errorOccured(error.status),
          () => console.debug("Done")
        )
    }

  }

  private
  onUpdateOnAddedSurveyor(data: any) {
    this.downloadSurveyorsListInThisSurvey();
    console.debug(data);
  }

  removeSurveyorFromSurvey(ndx, email) {
    let bodyDict = {};
    bodyDict[Const.SURVEYOR_EMAIL] = email;
    this.httpService.requestPostObservableNew(UrlFactory.getUrlDeleteSurveyorRelationship(this.selectedSurvey.survey_id), JSON.stringify(bodyDict))
      .subscribe(
        data => this.onRelationshipRemove(data),
        error => this.httpService.errorOccured(error.status),
        () => console.debug("Done")
      );

    this.surveyorsList.splice(ndx, 1);
  }


  private routeToReport(surveyId) {
    this.router.navigate(['reportsurvey', surveyId], {relativeTo: this.route});
    this.shouldHideDataRelatedToSurvey = false;
  }

  private navigateToQuestions(survey_id: string) {
    this.router.navigate(['questions', survey_id], {relativeTo: this.route});
    this.shouldHideDataRelatedToSurvey = false;
  }

  private inviteSurveyor() {
    this.router.navigate(['createsurveyor'], {relativeTo: this.route});
    this.shouldHideDataRelatedToSurvey = true;
  }

  private onRelationshipRemove(data: any) {
    console.debug(data);
  }

  private showProfile() {
    this.shouldHideDataRelatedToSurvey = true;
    this.router.navigate(['profileadmin'], {relativeTo: this.route});
  }

  private downloadExcelSheet(urlString: string) {
    // this.saveExcelSheet(urlString)

    var xhr = new XMLHttpRequest();
    xhr.open("GET", urlString);
    xhr.responseType = "arraybuffer";
    xhr.setRequestHeader("Authorization", "Basic " + btoa(Config.USERNAME + ":" + Config.PASSWORD));

    xhr.onload = function () {
      if (this.status === 200) {
        var blob = new Blob([xhr.response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
      }
    };
    xhr.send();

    // console.debug("downloadExcelSheet");
    // this.httpService.requestGetObservable(urlString)
    //   .subscribe(
    //     data => this.saveExcelSheet(data),
    //     error => this.httpService.errorOccured(error.status),
    //     () => console.debug("done")
    //   )

  }

  private saveExcelSheet(data: any) {
    // console.debug(data);
    // console.debug("saveExcelSheet");
    var buf = new ArrayBuffer(data.toString().length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != data.toString().length; ++i) view[i] = data.toString().charCodeAt(i) & 0xFF;
    // return buf;

    var blob = new Blob([buf], {
      type: ''
    });

    var href = URL.createObjectURL(blob);

    // var uri = 'data:text/xlsx;,' + data;

    var downloadLink = document.createElement("a");
    downloadLink.href = href;
    downloadLink.download = "data.xls";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}

