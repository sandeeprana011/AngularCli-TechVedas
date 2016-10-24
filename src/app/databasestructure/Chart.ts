import {Const} from "../const";
export class ChartData {
  constructor(names: Array<string>, valuesAssoc: Array<number>, question: string, chart_type: string, extraData: string) {
    this.names = names;
    this.valuesAssoc = valuesAssoc;
    this.question = question;
    this.chartType = chart_type;
    this.extraData = extraData;
  }


  public valuesAssoc: Array<number> = [];
  public names: Array<string> = [];
  public question: string;
  public chartType: string;
  public extraData: string;

  public initWithObject(dataObj) {

    this.question = dataObj[Const.QUESTION_TEXT];
    this.chartType = dataObj[Const.QUESTION_TYPE];
    let dataTop = dataObj['data'];
    this.names = [];
    this.valuesAssoc = [];
    for (var da of dataTop) {
      this.names.push(da[Const.OPTION_TEXT]);
      this.valuesAssoc.push(da[Const.COUNT]);
    }

    return new ChartData(this.names, this.valuesAssoc, this.question, this.chartType, this.question);
  }


}
