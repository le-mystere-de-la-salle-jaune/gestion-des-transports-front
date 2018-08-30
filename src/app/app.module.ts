import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';

import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { AjoutItineraireComponent } from './ajout-itineraire/ajout-itineraire.component';
import { AjoutVehiculeComponent } from './ajout-vehicule/ajout-vehicule.component';
import { AjoutDateComponent } from './ajout-date/ajout-date.component';
import { AgmCoreModule } from '@agm/core';

import { FormsModule,ReactiveFormsModule } from "@angular/forms";

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
import { PageListeVehiculesComponent } from './page-liste-vehicules/page-liste-vehicules.component';
import { PageListeChauffeursComponent } from './page-liste-chauffeurs/page-liste-chauffeurs.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { FiltrerPipePrenom } from './pipes/filtrerPrenom.pipe';
import { FiltrerPipeNom } from './pipes/filtrerNom.pipe';
import { FiltrerPipeMatricule } from './pipes/filtrerMatricule.pipe';
import { FiltrerPipeMarque } from './pipes/filtrerMarque.pipe';
import { FiltrerPipeImma } from './pipes/filtrerImma.pipe';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { ListeChauffeursComponent } from './liste-chauffeurs/liste-chauffeurs.component';
import { ListeVehiculesComponent } from './liste-vehicules/liste-vehicules.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderAdminComponent } from './header/header-admin.component';
import { PageDetailsVehiculeComponent } from './page-details-vehicule/page-details-vehicule.component';

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
      { path: 'annonces/creer', component: PublierAnnonceComponent},
      { path: '', redirectTo: 'collaborateur', pathMatch: 'full'}
    ]
  },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [StatutConnecteService],
    children: [
  { path:'vehicules', component: PageListeVehiculesComponent},
  { path:'vehicules/:id', component: PageDetailsVehiculeComponent},
  { path:'chauffeurs', component: PageListeChauffeursComponent},
    ]
  },

  { path: '', redirectTo: 'collaborateur', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    PublierAnnonceComponent,
    AjoutItineraireComponent,
    AjoutVehiculeComponent,
    AjoutDateComponent,
    HeaderComponent,
    CollabReservationsComponent,
    CollabAnnoncesComponent,
    CollabStatistiquesComponent,
    CollaborateurComponent,
    FiltrerReservationPipe,
    FiltrerPipeImma,
    FiltrerPipeMarque,
    FiltrerPipeMatricule,
    FiltrerPipeNom,
    FiltrerPipePrenom,
    ModalFormComponent,
    PageListeChauffeursComponent,
    ListeChauffeursComponent,
    ChauffeurComponent,
    PageListeVehiculesComponent,
    ListeVehiculesComponent,
    VehiculeComponent,
    AdminComponent,
    HeaderAdminComponent,
    PageDetailsVehiculeComponent

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

    ReactiveFormsModule

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
