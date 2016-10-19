import {Component, OnInit} from "@angular/core";
import {Question} from "../databasestructure/Question";
import {HTTPService} from "../utility/HTTPService";
import {Input} from "@angular/core/src/metadata/directives";

@Component({

  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
  selector: 'questionslist',
  providers: [HTTPService]
})

export class QuestionsListComponent implements OnInit {

  @Input() surveyId: string;
  @Input() adminId: string;
  @Input() questionsArray: Array<Question>;
  private httpService: HTTPService;


  constructor(_httpService: HTTPService) {
    this.httpService = _httpService;
  }

  //
  public q = {questionsList: this.questionsArray};

  ngOnInit() {
    this.q.questionsList = this.questionsArray;
    // console.debug(this.q);
  }

  public createNewQuestionAndAdd(questionType) {
    if (questionType === null || questionType === "") {
      questionType = "text";
    }
    // let quest: Question = new Question("questionid", "questiontext", questionType, this.surveyId, this.adminId, "0", "0", "crettime", "updatetime");
    let question: Question = new Question(null, "questiontext", questionType, this.surveyId, this.adminId, "0", "0", "", "");


    question.question_options_array = [];
    this.questionsArray.push(question);
    // console.debug(question);
  }


}

