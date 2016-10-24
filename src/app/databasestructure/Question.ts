import {Option} from "./Option";
/**
 * Created by sandeeprana on 27/08/16.
 */
export class Question {


  constructor(question_id: string, question_text: string, question_type: string, survey_id: string, admin_id: string, question_index: string, question_page_no: string, creation_time: string, updation_time: string) {
    this.question_id = question_id;
    this.question_text = question_text;
    this.question_type = question_type;
    this.survey_id = survey_id;
    this.admin_id = admin_id;
    this.question_index = question_index;
    this.question_page_no = question_page_no;
    this.creation_time = creation_time;
    this.updation_time = updation_time;
    this.question_extra = "";

  }


  public question_id: string;
  public question_text: string;
  public question_type: string;
  public survey_id: string;
  public admin_id: string;
  public question_index: string;
  public question_page_no: string;          //The main ingredient

  public creation_time: string;
  public updation_time: string;
  public question_options_array: Array<Option>;
  public question_extra: string;

}
