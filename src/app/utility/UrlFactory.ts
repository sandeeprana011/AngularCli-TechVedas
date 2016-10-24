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
}
