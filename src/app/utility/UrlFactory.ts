import {Config} from "../config";
export class UrlFactory {
  public static protocolUrl() {
    return "http";
  }

  public static domainUrl() {
    return "localhost";
  }

  public static portUrl() {
    return "8051";
  }

  public static versionApi() {
    return "v1"
  }

  public static urlBase() {
    return UrlFactory.protocolUrl() + "://" + UrlFactory.domainUrl() + ":" + UrlFactory.portUrl() + "/" + UrlFactory.versionApi() + "/";
  }

  public static getUrlUpdateQuestion() {
    return UrlFactory.urlBase() + "admin/question/update/";
  }

  public static getUrlDeleteQuestion(questionId: string) {
    return UrlFactory.urlBase() + "admin/question/delete/" + questionId;
  }

  static getUrlListAllSurverys() {
    return UrlFactory.urlBase() + "survey/list";
  }

  static getUrlQuestionsListInASurvey(surveyId: string) {
    return UrlFactory.urlBase() + "question/list/" + surveyId;
  }

  static createNewSurveyUrl() {
    return UrlFactory.urlBase() + "admin/survey/create";
  }

  static getUrlDeleteSurvey(surveyId: string) {
    return UrlFactory.urlBase() + "admin/survey/delete/" + surveyId;
  }

  static getUrlPublishSurvey(surveyId: any) {
    return UrlFactory.urlBase() + "admin/survey/publish/" + surveyId;
  }

  static getUrlLoginAdminUser() {
    return UrlFactory.urlBase() + "admin/login";
  }

  static getUrlListAllSurveyors(surveyId: string) {
    return UrlFactory.urlBase() + "admin/surveyors/list/" + surveyId;
  }

  static getUrlAddMoreSurveyor(selectedSurveyId: string) {
    return UrlFactory.urlBase() + "admin/relationship/add/" + selectedSurveyId;
  }

  static getUrlCreateNewSurveyor() {
    return UrlFactory.urlBase() + "admin/surveyor/create";
  }

  static getUrlDownloadReport(surveyId: string) {
    return UrlFactory.urlBase() + "admin/report/survey/" + surveyId;
  }

  static getUrlDownloadReportWithAuthentication(surveyId: string) {
    return UrlFactory.protocolUrl() + "://" + Config.USERNAME + ":" + Config.PASSWORD + "@" + UrlFactory.domainUrl() + ":" + UrlFactory.portUrl() + "/" + UrlFactory.versionApi() + "/" + "company/report/survey/download/" + surveyId;
    // http://localhost:8051/v1/company/report/survey/1
  }

  static getUrlInitCompany() {
    return UrlFactory.urlBase() + "company/init";
  }

  static getLoginCompanyUserUrl() {
    return UrlFactory.urlBase() + "company/init";
  }

  static inviteNewAdmin() {
    return UrlFactory.urlBase() + "company/admin/invite"
  }

  static getUrlCompanyReportSurvey(id: any) {
    return UrlFactory.urlBase() + "company/report/survey/" + id;
  }

  static getUrlSignUp() {
    return UrlFactory.urlBase() + "company/create";
  }

  static getUrlProfileCompany() {
    return UrlFactory.urlBase() + "company/profile";
  }

  static getUrlSaveCompanyProfile() {
    return UrlFactory.urlBase() + "company/profile/save";
  }

  static getUrlSaveNewPassword() {
    return UrlFactory.urlBase() + "company/password";
  }

  static getUrlToMapWithHeatMap(surveyId: string) {
    return UrlFactory.urlBase() + "survey/locations/" + surveyId;
  }
}
