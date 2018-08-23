import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import {StatutConnecteService} from "./auth/statut-connecte.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { ReserverComponent } from './reserver/reserver.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FiltrerPipeDate } from './reserver/FiltrePipeDate';
import { FiltrerPipeDestination } from './reserver/FiltrePipeDestination';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  { path:'tech', component: TechComponent, canActivate:[StatutConnecteService]},
  { path:'auth', component: AuthComponent},
  { path:'collaborateur/reservations/creer', component: ReserverComponent},
  { path:'collaborateur/reservations', component: TechComponent},
  { path: '', redirectTo: '/tech', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    ReserverComponent,
    FiltrerPipeDate,
    FiltrerPipeDestination
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAI-Xa9jqwXSzHVG3IKNKgT_J74qpx3Oo8",
      libraries: ["places"]
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent], 
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
