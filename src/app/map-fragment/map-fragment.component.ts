import {Component, OnInit, Input} from "@angular/core";

export declare var jQuery: any;
@Component({
  selector: 'app-map-fragment',
  templateUrl: './map-fragment.component.html',
  styleUrls: ['./map-fragment.component.css']
})
export class MapFragmentComponent implements OnInit {
  @Input() urlToMap: string;

  constructor() { }

  ngOnInit() {
    // this.urlToMapWithHeatMap = UrlFactory.getUrlToMapWithHeatMap(this.surveyId);
    console.debug(this.urlToMap);
  }

  ngAfterContentInit() {
    // this.someVal = this.urlToMap;

  }


}
