import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from "@angular/forms";
import { StatutConnecteService } from "./auth/statut-connecte.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { HeaderComponent } from './header/header.component';
import { CollabReservationsComponent } from './collab-reservations/collab-reservations.component';
import { CollabAnnoncesComponent } from './collab-annonces/collab-annonces.component';
import { CollabStatistiquesComponent } from './collab-statistiques/collab-statistiques.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { ReservationService } from './services/reservation.service';
import { PaginationService } from './services/pagination.service';
import { FiltrerReservationPipe } from './pipes/filtrer-reservation.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const routes: Routes = [

  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] },
  { path: 'auth', component: AuthComponent },

  {
    path: 'collaborateur',
    component: CollaborateurComponent, canActivate: [StatutConnecteService],
    children: [
      { path: 'reservations', component: CollabReservationsComponent },
      { path: 'propositions/creer', component: CollaborateurComponent },
      { path: 'annonces', component: CollabAnnoncesComponent },
      { path: 'statistiques', component: CollabStatistiquesComponent },

    ]
  },

  { path: '', redirectTo: 'collaborateur', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    HeaderComponent,
    CollabReservationsComponent,
    CollabAnnoncesComponent,
    CollabStatistiquesComponent,
    CollaborateurComponent,
    FiltrerReservationPipe

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [
    ReservationService,
    PaginationService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
