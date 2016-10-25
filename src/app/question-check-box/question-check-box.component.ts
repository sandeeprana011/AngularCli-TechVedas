import {Component, OnInit} from "@angular/core";
import {Question} from "../databasestructure/Question";
import {Option} from "../databasestructure/Option";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {ObjectToRequestBodyParser} from "../QuestionToRequestBodyParser";
import {Input} from "@angular/core/src/metadata/directives";


@Component({

  templateUrl: './question-check-box.component.html',
  styleUrls: ['./question-check-box.component.css'],
  selector: 'questioncheck',

  providers: [HTTPService]
})

export class QuestionCheckBoxComponent implements OnInit {

  private getData: string;

  private httpService: HTTPService;

  constructor(_httpService: HTTPService) {
    this.httpService = _httpService;
  }

  @Input() question: Question;
  @Input() questionArrayList: Array<Question>;
  @Input() qindex;

  public ques = {question: this.question};


  ngOnInit() {
    this.ques.question = this.question;
  }

  saveQuestionClicked() {
    console.debug("questiontext " + this.ques.question.question_text);
    console.debug("id" + this.ques.question.question_id);
    console.debug("survey_id" + this.ques.question.survey_id);
    // console.debug(this.ques.question.question_options_array);
    for (var opt of this.ques.question.question_options_array) {
      console.debug(opt.option_text);
    }

    let jsonObj;
    let parserQuestion: ObjectToRequestBodyParser = new ObjectToRequestBodyParser();

    jsonObj = parserQuestion.questionToRequest(this.ques.question);


    this.httpService.requestPutObservable(UrlFactory.getUrlUpdateQuestion(), JSON.stringify(jsonObj))
      .subscribe(
        data=> {
          this.getData = data.toString()
        },
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("finished")
      );


  }

  addOneMoreOption(question_id: string) {
    console.debug("called add onemore options");
    let option: Option = new Option("", question_id, "", "", "");
    this.ques.question.question_options_array.push(option);
    // console.debug(this.ques.question)
  }

  removeOption(ndx: number) {
    if (this.ques.question.question_options_array.length > 1) {
      this.ques.question.question_options_array.splice(ndx, 1);
    } else {

    }
  }

  removeThisQuestion() {
    this.httpService.removeThisQuestion(this.question, this.questionArrayList, this.qindex);

  }


}

