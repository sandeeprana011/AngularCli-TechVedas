import {Component, OnInit, Input} from "@angular/core";
import {Question} from "../databasestructure/Question";
import {HTTPService} from "../utility/HTTPService";
import {ObjectToRequestBodyParser} from "../QuestionToRequestBodyParser";
import {Const} from "../const";
import {UrlFactory} from "../utility/UrlFactory";

@Component({
  selector: 'question-date',
  templateUrl: './question-date.component.html',
  styleUrls: ['./question-date.component.css']
})
export class QuestionDateComponent implements OnInit {

  @Input() question: Question;
  @Input() questionArrayList: Array<Question>;
  @Input() qindex;


  private httpService: HTTPService;
  public ques = {question: this.question};
  private minDate: string;
  private maxDate: string;

  constructor(_httpService: HTTPService) {
    this.httpService = _httpService;
  }


  ngOnInit() {
    this.ques.question = this.question;

    let jsonParsedDate = JSON.parse(this.question.question_extra);

    this.minDate = jsonParsedDate[Const.MIN_DATE];
    this.maxDate = jsonParsedDate[Const.MAX_DATE];
    
    // console.debug(this.question);
    console.log(this.qindex);


  }

  saveQuestionClicked() {

    let jsonObj: {[key: string]: Object} = {};
    let tempo = {};

    let parserQuestion: ObjectToRequestBodyParser = new ObjectToRequestBodyParser();

    tempo[Const.MIN_DATE] = this.minDate;
    tempo[Const.MAX_DATE] = this.maxDate;

    this.ques.question.question_extra = JSON.stringify(tempo);
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


    // console.debug(jsonResponseObject[Const.QUESTION_ID]);
    this.ques.question.question_id = jsonResponseObject[Const.QUESTION_ID];
    let jsonDateParsed = JSON.parse(jsonResponseObject[Const.QUESTION_EXTRA]);

    console.debug(jsonDateParsed);


    // this.ques.question.question_id = jsonResponseObject[Const.QUESTION_ID];
  }

  removeThisQuestion() {
    this.httpService.removeThisQuestion(this.question, this.questionArrayList, this.qindex);

  }

}



