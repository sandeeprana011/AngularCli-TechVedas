import {Component, OnInit, NgZone} from "@angular/core";
import {Surveyor} from "../databasestructure/Surveyor";
import {StorageService} from "../utility/StorageService";
import {HTTPService} from "../utility/HTTPService";
import {Router, ActivatedRoute} from "@angular/router";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";

@Component({
  selector: 'app-create-surveyor',
  templateUrl: './create-surveyor.component.html',
  styleUrls: ['./create-surveyor.component.css']
})
export class CreateSurveyorComponent implements OnInit {

  private surveyor: Surveyor = new Surveyor("", "", "", "", "", "", "", "", "", "", "", "", "", "");

  constructor(private httpService: HTTPService, private storageService: StorageService, private ngzone: NgZone, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  createSurveyorView() {
    let body = JSON.stringify(this.surveyor);

    this.httpService.requestPostObservableNew(UrlFactory.getUrlCreateNewSurveyor(), body)
      .subscribe(
        data=>this.onSurveyorCreated(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.debug("Surveyor create called")
      )

  }

  private onSurveyorCreated(data: any) {
    let surveyor = JSON.parse(data)[Const.SURVEYOR];
    console.debug(surveyor);
  }
}
