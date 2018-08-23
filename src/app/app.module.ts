import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StatutConnecteService} from "./auth/statut-connecte.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { PageListeVehiculesComponent } from './page-liste-vehicules/page-liste-vehicules.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { FiltrerPipeImma } from './filtrerImma.pipe';
import { FiltrerPipeMarque } from './filtrerMarque.pipe';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ListeVehiculesComponent } from './liste-vehicules/liste-vehicules.component';

const routes: Routes = [
  { path:'tech', component: TechComponent, canActivate:[StatutConnecteService]},
  { path:'auth', component: AuthComponent},
  { path:'admin/vehicules', component: PageListeVehiculesComponent},
  { path: '', redirectTo: '/tech', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    PageListeVehiculesComponent,
    VehiculeComponent,
    FiltrerPipeImma,
    FiltrerPipeMarque,
    ModalFormComponent,
    ListeVehiculesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
