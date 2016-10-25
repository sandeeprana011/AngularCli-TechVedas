import {Component, OnInit} from "@angular/core";
import {HTTPService} from "../utility/HTTPService";
import {UrlFactory} from "../utility/UrlFactory";
import {Const} from "../const";


export declare var jQuery: any;


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  private httpService: HTTPService;
  private email: string;


  constructor(_httpService: HTTPService) {
    this.httpService = _httpService;

  }

  ngOnInit() {

  }

  createUser() {
    let jsonDat = {};
    jsonDat[Const.ADMIN_EMAIL] = this.email;
    // console.debug(jsonDat);

    this.httpService.requestPostObservableNew(UrlFactory.inviteNewAdmin(), JSON.stringify(jsonDat))
      .subscribe(
        data=>this.onSuccessfullyInvited(data),
        error=>this.httpService.errorOccured(error.status),
        ()=>console.log("Invite finish!")
      )
  }

  private onSuccessfullyInvited(data: any) {
    // alert("Successfully invited!")
    jQuery().Materialize.toast('I am a toast!', 4000);

  }
}
