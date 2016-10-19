import {Component, OnInit, NgZone} from '@angular/core';
import {HTTPService} from "../utility/HTTPService";
import {StorageService} from "../utility/StorageService";
import {Surveyor} from "../databasestructure/Surveyor";
import {Survey} from "../databasestructure/Survey";
import {UrlFactory} from "../utility/UrlFactory";
import {Config} from "../config";
import {Const} from "../const";

export declare var jQuery: any;

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private httpService: HTTPService = new HTTPService(null);
  private storageService: StorageService;
  private ngzone;
  // public surveysArray: Array<Survey> = [];


  public q = {
    surveysList: [],
    surveyorsList: [],
    selectedSurveyor: new Surveyor("", "", "", "", "", "", "", "", "", "", "", "", "", ""),
    createSurveyor: new Surveyor("", "", "", "", "", "", "", "", "", "", "", "", "", ""),
    surveyDetails: new Survey("", "", "", "", "", "", "", "", "", ""),
    username: "",
    password: "",
    selectedSurveyId: "",
    email: "",
    surveyorsArray: ["Name", "Sandeep", "Singh", "Rana"],
    surveyorsArrayToAssign: []
  };


  constructor(_httpService: HTTPService, _storageService: StorageService, _ngzone: NgZone) {
    this.httpService = _httpService;
    this.storageService = _storageService;
    this.ngzone = _ngzone;
  }


  ngOnInit() {

    /**
     * check for login and all
     * @type {string}
     */

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


    this.q.surveysList = [];

    this.httpService.listAllSurveys(UrlFactory.getUrlListAllSurverys())
      .subscribe(
        data=>this.updateSurveysList(data),
        error=>console.debug(error),
        ()=>console.debug("Done")
      );


  }


  private updateSurveysList(data) {

    this.q.surveysList = data['surveys'];
    this.surveyItemClicked(0);
  }

  surveyItemClicked(ndx) {
    this.q.selectedSurveyId = this.q.surveysList[ndx].survey_id;
    this.q.surveyDetails = this.q.surveysList[ndx]
    // console.debug(this.q.surveyDetails)

    this.httpService.listAllSurveyors(UrlFactory.getUrlListAllSurveyors(this.q.surveysList[ndx].survey_id))
      .subscribe(
        data=>this.updateSurveyorsList(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("List All Surveyors")
      );

  }

  createSurveyorView() {
    // console.debug(this.q.createSurveyor);
    this.httpService.createNewSurveyor(UrlFactory.getUrlCreateNewSurveyor(), this.q.createSurveyor)
      .subscribe(
        data=>this.surveyorCreated(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("Surveyor created!")
      )
  }

  createSurveyorDailogOpen() {
    jQuery('#createSurveyor').openModal();
  }

  private updateSurveyorsList(data: any) {
    //do something todo
    let surveyorsList = data[Const.SURVEYOR];
    // console.debug(surveyorsList)
    // let survey: Surveyor = surveyorsList[0];
    this.q.surveyorsList.splice(0, this.q.surveyorsList.length);

    console.debug(surveyorsList)
    for (var item of surveyorsList) {
      this.q.surveyorsList.push(item)
    }

    this.surveyorItemClicked(0);

  }

  addSurveyorClicked() {
    jQuery('#addSurveyor').openModal();
  }

  addOneMoreSurveyorView() {

    this.httpService.addSurveyorToSurvey(UrlFactory.getUrlAddMoreSurveyor(this.q.selectedSurveyId), this.q.email)
      .subscribe(
        data=>this.updateAddSurveyor(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("Done!")
      )
  }

  private updateAddSurveyor(data) {
    console.debug(data[Const.SURVEYOR]);
  }

  surveyorItemClicked(ndxSurveyor) {
    this.q.selectedSurveyor = this.q.surveyorsList[ndxSurveyor]
  }

  loginUserView() {
    jQuery("#loginButton").prop('disabled', true);
    // jQ("loginButton").attr('disabled','disabled');
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

  private surveyorCreated(data) {
    console.debug(data['message']);
  }
}
