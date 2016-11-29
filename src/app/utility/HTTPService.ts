import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Config} from "../config";
import {Observable} from "rxjs";
import {Question} from "../databasestructure/Question";
import {UrlFactory} from "./UrlFactory";
import {Surveyor} from "../databasestructure/Surveyor";
/**
 * Created by sandeeprana on 31/08/16.
 */

// import {Injectable} from "angular2/src/core/di/decorators";
// import {Http} from "angular2/src/http/http";
// import 'rxjs/add/operator/map';
// import {Headers} from "angular2/src/http/headers";
// import {Config} from "../config";
// import {Observable} from "rxjs/Rx";
// import {Response} from "angular2/src/http/static_response";
// import {UrlFactory} from "./UrlFactory";
// import {Question} from "../databasestructure/Question";
// import {Const} from "../Constants";
// import {Surveyor} from "../databasestructure/Surveyor";

export declare var jQuery: any;

@Injectable()
export class HTTPService {


  private UNAUTHORIZED_ACCESS = "Unauthorized Access. Please Login first";

  constructor(private _http: Http) {
  }

  public requestPostObservableNew(url: string, bodyString: string) {
    return this._http.post(url, bodyString, {headers: HTTPService.getHeadersCustom()})
      .map(res => res.text());
  }

  public requestGetObservable(url: string) {

    return this._http.get(url, {headers: HTTPService.getHeadersCustom()})
      .map(res => res.text());
  }



  public requestPutObservable(url: string, bodyString: string) {

    return this._http.put(url, bodyString, {headers: HTTPService.getHeadersCustom()})
      .map(res => res.text());
  }

  public deleteQuestionObservable(url: string) {
    return this._http.delete(url, {headers: HTTPService.getHeadersCustom()})
      .map(res => res.text());
  }

  private static getHeadersCustom() {
    var headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(Config.USERNAME + ":" + Config.PASSWORD));
    headers.append("Content-Type", "application/json");
    return headers;
  }

  private static getHeadersAuthentication(username: string, password: string) {
    var headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json");
    return headers;
  }


  public listAllSurveys(url: string) {
    return this.downloadDataAndRevertWithErrors(url);
  }

  public listAllQuestions(url: string) {
    return this.downloadDataAndRevertWithErrors(url);

  }

  public createNewSurveyNetwork(url: string, jsonData: string) {
    return this.requestWithBody(url, jsonData);
  }

  public downloadDataAndRevertWithErrors(url: string) {
    return this._http.get(url, {headers: HTTPService.getHeadersCustom()})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201) {
            return res.json()
          }
          else if (res.status === 200) {
            return res.json()
          }
        }
      }).catch((error: any) => {
        return this.errorCodesReturn(error);
      });
  }

  private downloadDataAndRevertWithErrorsPUTRequest(url: string) {
    return this._http.put(url, "", {headers: HTTPService.getHeadersCustom()})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201) {
            return res.json()
          }
          else if (res.status === 200) {
            return res.json()
          }
        }
      }).catch((error: any) => {
        return this.errorCodesReturn(error);
      });
  }

  private errorCodesReturn(error: any) {
    if (error.status === 500) {
      return Observable.throw(new Error(error.status));
    }
    else if (error.status === 400) {
      return Observable.throw(new Error(error.status));
    }
    else if (error.status === 401) {
      return Observable.throw(new Error(this.UNAUTHORIZED_ACCESS));
    }
    else if (error.status === 409) {
      return Observable.throw(new Error(error.status));
    }
    else if (error.status === 406) {
      return Observable.throw(new Error(error.status));
    }
    else if (error.status === 417) {
      return Observable.throw(new Error(error.status));
    }
  }


  private deleteRequestDataAndRevertWithErrors(url: string) {
    return this._http.delete(url, {headers: HTTPService.getHeadersCustom()})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201) {
            return res.json()
          }
          else if (res.status === 200) {
            return res.json()
          }
        }
      }).catch((error: any) => {
        return this.errorCodesReturn(error);
      });
  }

  removeThisQuestion(question: Question, questionArrayList: Array<Question>, qindex: number) {
    if (question.question_id === null || question.question_id === "") {
      this.updateOnDeleted("", questionArrayList, qindex);
    } else {
      this.deleteQuestionObservable(UrlFactory.getUrlDeleteQuestion(question.question_id))
        .subscribe(
          data => this.updateOnDeleted(data, questionArrayList, qindex),
          error => this.errorOccured(error.status),
          () => console.log("Deleted")
        )
    }
  }

  private updateOnDeleted(data: string, questionArrayList: Array<Question>, qindex: number) {
    if (questionArrayList.length > 1) {
      questionArrayList.splice(qindex, 1);
    }
  }


  private requestWithBody(url: string, jsonData: string) {
    return this._http.post(url, jsonData, {headers: HTTPService.getHeadersCustom()})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201) {
            return res.json()
          }
          else if (res.status === 200) {
            return res.json()
          }
        } else {
          return null;
        }
      }).catch((error: any) => {
        return this.errorCodesReturn(error);
      });
  }

  deleteSurvey(urlDeleteSurvey: string) {
    return this.deleteRequestDataAndRevertWithErrors(urlDeleteSurvey);
  }

  publishSurvey(urlPublishSurvey: string) {
    return this.downloadDataAndRevertWithErrorsPUTRequest(urlPublishSurvey);
  }

  errorOccured(status) {
    if (status == 417) {
      // jQuery(Materialize.toast('Error Code : 417 <br> <span class="grey-text">Either survey has alredy published or finished</span>', 4000));
    } else if (status == 401) {
      // Utility.logoutFromApplicationWithoutRoute();
      jQuery(Materialize.toast('Un-authorized Access<br> Please Login!', 6000));
      // jQuery('#needToLoginIn').openModal();
    } else if (status == 303) {
      // jQuery('#error303').openModal();
      jQuery(Materialize.toast('Surveyor doesn\'t exist', 6000));
    } else if (status == 601) {
      // Error while inviting admin
      // jQuery("#errorInviteAdmin").openModal();
      jQuery(Materialize.toast('Invalid Email Address', 4000));
    } else if (status == 602) {
      // Error while inviting admin
      // jQuery("#errorInviteAdmin").openModal();
      jQuery(Materialize.toast('User Already Exist!', 4000));
    } else if (status == 603) {
      // Error while inviting admin
      // jQuery("#errorInviteAdmin").openModal();
      jQuery(Materialize.toast('Error Inviting Admin', 4000));
    } else if (status == 0) {
      jQuery(Materialize.toast('Network Problem!', 4000));
    } else {
      jQuery(Materialize.toast('Unknown Error  : ' + status.toString(), 4000));
    }
  }


  loginUser(urlLoginAdminUser: string, username: string, password: string) {
    return this._http.get(urlLoginAdminUser, {headers: HTTPService.getHeadersAuthentication(username, password)})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201) {
            return res.json()
          }
          else if (res.status === 200) {
            return res.json()
          }
        }
      }).catch((error: any) => {
        return this.errorCodesReturn(error);
      });

  }

  listAllSurveyors(urlListAllSurveyors: string) {
    return this.downloadDataAndRevertWithErrors(urlListAllSurveyors);
  }

  addSurveyorToSurvey(urlAddMoreSurveyor: string, email: string) {
    return this.requestPostObservableNew(urlAddMoreSurveyor, "{\"surveyor_email\":\"" + email + "\"}");
  }

  createNewSurveyor(urlCreateNewSurveyor: string, createSurveyor: Surveyor) {
    return this.requestPostObservableNew(urlCreateNewSurveyor, JSON.stringify(createSurveyor));
  }

  initCompanyDashBoard(urlInitCompany: any) {
    return this.requestGetObservable(urlInitCompany);
  }
}
