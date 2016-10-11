import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {$} from "protractor";

/**
 * Created by sandeeprana on 31/08/16.
 */
//
// import {Injectable} from "angular2/src/core/di/decorators";
// import {Http} from "angular2/src/http/http";
// import 'rxjs/add/operator/map';
// import {Headers} from "angular2/src/http/headers";
// import {Config} from "../config";
// import {Observable} from "rxjs/Rx";
// import {Response} from "angular2/src/http/static_response";
// import {UrlFactory} from "./UrlFactory";
// import {Question} from "../databasestructure/Question";


@Injectable()
export class HTTPService {
  private UNAUTHORIZED_ACCESS = "Unauthorized Access. Please Login first";

  constructor(private _http: Http) {
  }

  public requestPostObservableNew(url: string, bodyString: string) {

    return this._http.post(url, bodyString, {headers: HTTPService.getHeadersCustom()})
      .map(res=> res.text());
  }

  public requestGetObservable(url: string) {

    return this._http.get(url, {headers: HTTPService.getHeadersCustom()})
      .map(res=> res.text());
  }

  public requestPutObservable(url: string, bodyString: string) {

    return this._http.put(url, bodyString, {headers: HTTPService.getHeadersCustom()})
      .map(res=> res.text());
  }

  public deleteQuestionObservable(url: string) {
    return this._http.delete(url, {headers: HTTPService.getHeadersCustom()})
      .map(res=>res.text());
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

  private downloadDataAndRevertWithErrors(url: string) {
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
          data=>this.updateOnDeleted(data, questionArrayList, qindex),
          error=>this.errorOccured(error.status),
          ()=>console.log("Deleted")
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
      // alert("Either survey has alredy published or finished");
      $('#headingInformation').html('Error Code : 417 <br> <span class="grey-text">Either survey has alredy published or finished</span>');
      $('#modalInformationError').openModal();
    } else if (status == 401) {
      $('#needToLoginIn').openModal();
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
}
