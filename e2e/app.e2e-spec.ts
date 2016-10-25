import {AngularCliSurveyamPage} from "./app.po";

describe('angular-cli-surveyam App', function () {
  let page: AngularCliSurveyamPage;

  beforeEach(() => {
    page = new AngularCliSurveyamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
