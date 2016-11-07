import {Question} from "./Question";
/**
 * Created by sandeeprana on 11/09/16.
 */

export class Survey {
  constructor(survey_id: string, admin_id: string, survey_name: string, survey_description: string, survey_start_time: string, survey_end_time: string, survey_created_by: string, creation_time: string, updation_time: string, is_published) {
    this.survey_id = survey_id;
    this.admin_id = admin_id;
    this.survey_name = survey_name;
    this.survey_description = survey_description;
    this.survey_starttime = survey_start_time;
    this.survey_endtime = survey_end_time;
    this.survey_created_by = survey_created_by;
    this.creation_time = creation_time;
    this.updation_time = updation_time;
    this.is_published = is_published;
  }

  public survey_id: string;

  public admin_id: string;
  public survey_name: string;
  public survey_description: string;
  public survey_starttime: string;
  public survey_endtime: string;
  public survey_created_by: string;
  public creation_time: string;
  public updation_time: string;
  public is_published: number;


  public questions: Array<Question> = [];
}
