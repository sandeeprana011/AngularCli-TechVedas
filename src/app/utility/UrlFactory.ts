import {Config} from "../config";
export class UrlFactory {
  public static protocolUrl() {
    // return "http";
    return "https";
  }

  public static domainUrl() {
    return "bheem-sirfireydevs.rhcloud.com";
    // return "localhost";
  }

  public static portUrl() {
    return "";
    // return "8051";
  }

  public static urlBase() {
    // return UrlFactory.protocolUrl() + "://" + UrlFactory.domainUrl() + ":" + UrlFactory.portUrl() + "/" + UrlFactory.versionApi() + "/";
    return UrlFactory.protocolUrl() + "://" + UrlFactory.domainUrl() + "" + UrlFactory.portUrl() + "/" + UrlFactory.versionApi() + "/";
  }

  public static versionApi() {
    return "v1"
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

  static getUrlDeleteSurveyorRelationship(selectedSurveyId: string) {
    return UrlFactory.urlBase() + "admin/relationship/delete/" + selectedSurveyId;
  }

  static getUrlCreateNewSurveyor() {
    return UrlFactory.urlBase() + "admin/surveyor/create";
  }

  static getUrlDownloadReport(surveyId: string) {
    return UrlFactory.urlBase() + "admin/report/survey/download/" + surveyId;
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

  static getUrlAdminReportSurvey(id: any) {
    return UrlFactory.urlBase() + "admin/report/survey/" + id;
  }

  static getUrlSignUp() {
    return UrlFactory.urlBase() + "company/create";
  }

  static getUrlAdminSignUp() {
    return UrlFactory.urlBase() + "admin/create";
  }

  static getUrlProfileCompany() {
    return UrlFactory.urlBase() + "company/profile";
  }

  static getUrlProfileAdmin() {
    return UrlFactory.urlBase() + "admin/profile";
  }

  static getUrlSaveCompanyProfile() {
    return UrlFactory.urlBase() + "company/profile/save";
  }

  static getUrlSaveAdminProfile() {
    return UrlFactory.urlBase() + "admin/profile/save";
  }

  static getUrlSaveNewPassword() {
    return UrlFactory.urlBase() + "company/password";
  }

  static getUrlSaveNewPasswordAdmin() {
    return UrlFactory.urlBase() + "admin/password";
  }

  static getUrlToMapWithHeatMap(surveyId: string) {
    return UrlFactory.urlBase() + "survey/locations/" + surveyId;
  }

  static getUrlSurveyorsList(surveyId: string) {
    return UrlFactory.urlBase() + "survey/surveyors/list/" + surveyId;
  }

  static getUrlSurveyorsAddedInSurvey(surveyId: string) {
    return UrlFactory.urlBase() + "admin/surveyors/list/" + surveyId;
  }

  static getUrlSurveyDetails(survey_id: any) {
    return UrlFactory.urlBase() + "admin/survey/" + survey_id;
  }
}
