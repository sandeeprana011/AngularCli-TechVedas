/**
 * Created by sandeeprana on 29/08/16.
 */
export class Option {
  constructor(option_id: string, question_id: string, option_text: string, creation_time: string, updation_time: string) {
    this.option_id = option_id;
    this.question_id = question_id;
    this.option_text = option_text;
    this.creation_time = creation_time;
    this.updation_time = updation_time;
  }

  public option_id: string;
  public question_id: string;
  public option_text: string;
  public creation_time: string;
  public updation_time: string;

}
