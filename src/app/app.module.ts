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
import { ListeVehiculesComponent } from './liste-vehicules/liste-vehicules.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { FiltrerPipeImma } from './filtrerImma.pipe';
import { FiltrerPipeMarque } from './filtrerMarque.pipe';

const routes: Routes = [
  { path:'tech', component: TechComponent, canActivate:[StatutConnecteService]},
  { path:'auth', component: AuthComponent},
  { path:'admin/vehicules', component: ListeVehiculesComponent},
  { path: '', redirectTo: '/tech', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    ListeVehiculesComponent,
    VehiculeComponent,
    FiltrerPipeImma,
    FiltrerPipeMarque
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
