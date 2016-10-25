import {Component, OnInit} from "@angular/core";
import {Question} from "../databasestructure/Question";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";
import {ObjectToRequestBodyParser} from "../QuestionToRequestBodyParser";
import {Input} from "@angular/core/src/metadata/directives";


@Component({

  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.css'],
  selector: 'questiontext',

  providers: [HTTPService]
})

export class QuestionTextComponent implements OnInit {

  @Input() question: Question;
  @Input() questionArrayList: Array<Question>;
  @Input() qindex;


  private httpService: HTTPService;


  constructor(_httpService: HTTPService) {
    this.httpService = _httpService;
  }

  public ques = {question: this.question};


  ngOnInit() {
    this.ques.question = this.question;
    // console.debug(this.question);
    console.log(this.qindex);
  }

  saveQuestionClicked() {
    // console.debug("questiontext " + this.ques.question.question_text);
    // console.debug("id" + this.ques.question.question_id);
    // console.debug("survey_id" + this.ques.question.survey_id);
    // console.debug(this.ques.question);
    // let mine: string = JSON.stringify(this.ques.question);
    let jsonObj: {[key: string]: Object} = {};

    let parserQuestion: ObjectToRequestBodyParser = new ObjectToRequestBodyParser();
    jsonObj = parserQuestion.questionToRequest(this.ques.question);

    // mine['option']=this.ques.question.question_options_array;

    // console.debug(jsonObj);
    this.httpService.requestPutObservable(UrlFactory.getUrlUpdateQuestion(), JSON.stringify(jsonObj))
      .subscribe(
        data=>this.updateView(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.log("Done")
      );

  }

  private updateView(data) {
    console.log(data.toString());
    let jsonResponseObject: {[key: string]: string} = {};
    jsonResponseObject = JSON.parse(data);
    // console.debug(jsonResponseObject);
    console.debug(jsonResponseObject[Const.QUESTION_ID]);
    this.ques.question.question_id = jsonResponseObject[Const.QUESTION_ID];
    // this.ques.question.question_id = jsonResponseObject[Const.QUESTION_ID];
  }

  removeThisQuestion() {
    this.httpService.removeThisQuestion(this.question, this.questionArrayList, this.qindex);

  }

}



