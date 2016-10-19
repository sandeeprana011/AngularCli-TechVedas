import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from "./app/app.component";
import {HTTPService} from "./utility/HTTPService";
import {StorageService} from "./utility/StorageService";
import {RouterModule} from "@angular/router";
import {AdminComponent} from './admin/admin.component';
import { RoutercompComponent } from './routercomp/routercomp.component';
import {OuterSubscriber} from "rxjs/OuterSubscriber";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RoutercompComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'assign', component: AppComponent},
      {path: 'admin', component: AdminComponent}
    ])
  ],
  providers: [HTTPService, StorageService],
  bootstrap: [RoutercompComponent]
})
export class AppModule {
}
