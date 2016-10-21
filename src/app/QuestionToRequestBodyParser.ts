import {Question} from "./databasestructure/Question";
import {Const} from "./const";
import {Config} from "./config";
import {Survey} from "./databasestructure/Survey";
/**
 * Created by sandeeprana on 02/09/16.
 */
export class ObjectToRequestBodyParser {

  public questionToRequest(question: Question) {

    let jsonObj: {[key: string]: Object} = {};
    let jsonOptionObj: Array<Object> = [];

    jsonObj[Const.QUESTION_ID] = question.question_id;
    jsonObj[Const.QUESTION_TEXT] = question.question_text;
    jsonObj[Const.QUESTION_TYPE] = question.question_type;
    jsonObj[Const.SURVEY_ID] = question.survey_id;
    jsonObj[Const.ADMIN_ID] = question.admin_id;
    jsonObj[Const.QUESTION_INDEX] = question.question_index;
    jsonObj[Const.QUESTION_PAGE_NO] = question.question_page_no;
    jsonObj[Const.CREATION_TIME] = question.creation_time;
    jsonObj[Const.UPDATION_TIME] = question.updation_time;
    jsonObj[Const.QUESTION_EXTRA] = question.question_extra;


    for (var option of question.question_options_array) {
      jsonOptionObj.push(option);
    }

    jsonObj[Const.OPTION] = jsonOptionObj;

    return jsonObj;
  }

  public surveyToDictionary(survey: Survey) {

    let jsonObj: {[key: string]: Object} = {};
    let jsonOptionObj: Array<Object> = [];

    jsonObj[Const.SURVEY_NAME] = survey.survey_name;
    jsonObj[Const.SURVEY_DESCRIPTION] = survey.survey_description;
    jsonObj[Const.SURVEY_CREATED_BY] = survey.survey_created_by;
    // jsonObj[Const.SURVEY_ID] = survey.survey_id;
    jsonObj[Const.SURVEY_STARTTIME] = survey.survey_starttime + " 00:00:00";
    jsonObj[Const.SURVEY_ENDTIME] = survey.survey_endtime + " 23:59:59";
    jsonObj[Const.ADMIN_ID] = Config.ID_FOR_ALL;


    // for (var option of survey) {
    //     jsonOptionObj.push(option);
    // }

    // jsonObj[Const.OPTION] = jsonOptionObj;

    return jsonObj;
  }


}
