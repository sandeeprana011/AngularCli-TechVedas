import {Component, OnInit} from "@angular/core";
import {Input} from "@angular/core/src/metadata/directives";
import {Question} from "../databasestructure/Question";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";
import {ObjectToRequestBodyParser} from "../QuestionToRequestBodyParser";


@Component({

  templateUrl: './question-rating.component.html',
  styleUrls: ['./question-rating.component.css'],
  selector: 'questionrating',

  providers: [HTTPService]
})

export class QuestionRatingComponent implements OnInit {


  @Input() question: Question;
  @Input() questionArrayList: Array<Question>;
  @Input() qindex;

  private httpService: HTTPService;

  constructor(_httpService: HTTPService) {
    this.httpService = _httpService;
  }

  public ques = {question_temp: this.question};


  ngOnInit() {
    this.ques.question_temp = this.question;
  }

  ngAfterContentInit() {
    this.howManyNowSelected(this.ques.question_temp.question_extra);
    this.starNow = this.ques.question_temp.question_extra;
    console.debug("Now Executed ngAfterViewInit" + this.ques.question_temp.question_extra);
  }


  saveQuestionClicked() {
    console.debug("questiontext " + this.ques.question_temp.question_text);
    console.debug("id" + this.ques.question_temp.question_id);
    console.debug("survey_id" + this.ques.question_temp.survey_id);
    // console.debug(this.ques.question_temp);
    // let mine: string = JSON.stringify(this.ques.question_temp);
    let jsonObj: {[key: string]: Object} = {};

    let parserQuestion: ObjectToRequestBodyParser = new ObjectToRequestBodyParser();
    jsonObj = parserQuestion.questionToRequest(this.ques.question_temp);

    // mine['option']=this.ques.question_temp.question_options_array;

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
    this.ques.question_temp.question_id = jsonResponseObject[Const.QUESTION_ID];
    // this.ques.question_temp.question_id = jsonResponseObject[Const.QUESTION_ID];
    // this.ques.question_temp.question_extra=this.numbers.length;
  }


  numbersor: string[] = [];

  public selectedOption(value) {

    let temp = value.target.selectedOptions[0].value;
    // console.debug(value.target.selectedOptions[0].value);
    this.howManyNowSelected(temp)
  }

  public howManyNowSelected(count) {

    // console.debug(value.target.selectedOptions[0].value);
    this.numbersor = [];

    for (var i = 0; i < count; i++) {
      // console.log(i);
      this.numbersor.push("Some");
    }

    // console.debug(this.numbers.length)
    this.ques.question_temp.question_extra = this.numbersor.length.toString();
  }

  starNow = "1";

  stars: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ];

  removeThisQuestion() {
    this.httpService.removeThisQuestion(this.question, this.questionArrayList, this.qindex);

  }
}


