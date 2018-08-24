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
import { ReservationSocieteComponent } from './reservation-societe/reservation-societe.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReservationParticulierComponent } from './reservation-particulier/reservation-particulier.component';
import { AgmCoreModule } from '@agm/core';
import { ReservationComponent } from './reservation/reservation.component';
import { FiltrerPipeDate } from './pipes/FiltrePipeDate';
import { FiltrerPipeDestination } from './pipes/FiltrePipeDestination';

const routes: Routes = [

  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] },
  { path: 'auth', component: AuthComponent },

  {
    path: 'collaborateur',
    component: CollaborateurComponent, canActivate: [StatutConnecteService],
    children: [
      { path: 'reservations', component: CollabReservationsComponent },
      { path: 'reservations/creer', component: ReservationComponent },
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
    FiltrerReservationPipe,
    ReservationSocieteComponent,
    ReservationParticulierComponent,
    ReservationComponent,
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
