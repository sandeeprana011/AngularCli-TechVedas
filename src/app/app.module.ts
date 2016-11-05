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
import {ReportAdminComponent} from "./report-admin/report-admin.component";
import {ChartsModule} from "ng2-charts";
import {AddAdminComponent} from "./add-admin/add-admin.component";
import {SignupCompanyComponent} from "./signup-company/signup-company.component";
import {CompanyprofileComponent} from "./companyprofile/companyprofile.component";
import {MapFragmentComponent} from "./map-fragment/map-fragment.component";
import {UrlersaferPipe} from "./urlersafer.pipe";
import {Ng2CompleterModule} from "ng2-completer";
import {ReportadminsurveyComponent} from "./reportadminsurvey/reportadminsurvey.component";
import {CreateSurveyorComponent} from "./create-surveyor/create-surveyor.component";


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
    CompanyDashboardComponent,
    ReportAdminComponent,
    AddAdminComponent,
    SignupCompanyComponent,
    CompanyprofileComponent,
    MapFragmentComponent,
    UrlersaferPipe,
    ReportadminsurveyComponent,
    CreateSurveyorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    HttpModule,
    Ng2CompleterModule,
    RouterModule.forRoot([
      {path: "", component: LoginModuleComponent},
      {path: 'manager', component: AppComponent},
      {path: 'signup', component: SignupCompanyComponent},
      {
        path: 'builder', component: AdminAppComponent,
        children: [
          {path: "", component: AddAdminComponent},
          {path: "questions/:id", component: QuestionsListComponent},
          {path: "reportsurvey/:id", component: ReportadminsurveyComponent},
          {path: "createsurveyor", component: CreateSurveyorComponent}

        ]
      },
      {path: 'login', component: LoginModuleComponent},
      {
        path: 'company', component: CompanyDashboardComponent,
        children: [
          {path: "", component: AddAdminComponent},
          {path: 'report/:id', component: ReportAdminComponent},
          {path: 'invite', component: AddAdminComponent},
          {path: 'profileCompany', component: CompanyprofileComponent}
        ]

      }
    ])
  ],
  providers: [HTTPService, StorageService],
  bootstrap: [RoutercompComponent]
})
export class AppModule {
}
