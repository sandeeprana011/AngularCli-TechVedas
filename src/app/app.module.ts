import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app/app.component";
import {HTTPService} from "./utility/HTTPService";
import {StorageService} from "./utility/StorageService";
import {RouterModule} from "@angular/router";
import {RoutercompComponent} from "./routercomp/routercomp.component";
import {AdminAppComponent} from "./admin-app/admin-app.component";
import {SurveyContainerComponent} from "./survey-container/survey-container.component";
import {QuestionsListComponent} from "./questions-list/questions-list.component";
import {QuestionTextComponent} from "./question-text/question-text.component";
import {QuestionRatingComponent} from "./question-rating/question-rating.component";
import {QuestionCaptureImageComponent} from "./question-capture-image/question-capture-image.component";
import {QuestionRadioComponent} from "./question-radio/question-radio.component";
import {QuestionCheckBoxComponent} from "./question-check-box/question-check-box.component";
import {LoginModuleComponent} from "./login-module/login-module.component";
import {CompanyDashboardComponent} from "./company-dashboard/company-dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    QuestionsListComponent,
    QuestionTextComponent,
    QuestionRatingComponent,
    QuestionCaptureImageComponent,
    QuestionRadioComponent,
    QuestionCheckBoxComponent,
    AdminAppComponent,
    SurveyContainerComponent,
    RoutercompComponent,
    LoginModuleComponent,
    CompanyDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'',component:CompanyDashboardComponent},
      {path: 'manager', component: AppComponent},
      {path: 'builder', component: AdminAppComponent},
      {path: 'login', component: LoginModuleComponent},
      {path: 'company', component: CompanyDashboardComponent}
    ])
  ],
  providers: [HTTPService, StorageService],
  bootstrap: [RoutercompComponent]
})
export class AppModule {
}
