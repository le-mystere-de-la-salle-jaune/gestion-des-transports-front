import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Reservation, CreerReservation, Adresse, ReserverAfficherAnnonce, ReserverAfficherAnnonceUtils, DateDebutFin, ReserverAfficherVehicule, ReserverVehicule } from '../domains';

import { environment } from '../../environments/environment';

import { Vehicule } from '../reservation-societe/class';

import { map, filter } from 'rxjs/operators';
import { ReservationSociete } from './../domains';
import { tap } from 'rxjs/internal/operators/tap';


@Injectable()
export class ReservationService {

  listeReservations(): any {
    throw new Error("Method not implemented.");
  }
  constructor(private _http: HttpClient) { }

  listerReservations(): Observable<Reservation[]> {

    const reservation$ = this._http.get(`${environment.baseUrl}${environment.reservationsApi}/${sessionStorage.getItem("email")}`)
      .pipe(
        map((reservationsServeur: any[]) => reservationsServeur.map( 

          el => { 
            let statut;
            let dateNow = new Date();
            let dateNowParse = dateNow.toJSON();
            if (el.statut == true && el.depart < dateNowParse) {
              statut = 'Terminé';
            } else if (el.statut == false) {
              statut = 'Annulé';
            } else {
              statut = true;
            }
            return new Reservation(el.id, el.depart, new Adresse(el.adresse_depart.numeroVoie, el.adresse_depart.designationVoie, el.adresse_depart.ville, el.adresse_depart.codePostal, el.adresse_depart.pays), new Adresse(el.adresse_arriver.numeroVoie, el.adresse_arriver.designationVoie, el.adresse_arriver.ville, el.adresse_arriver.codePostal, el.adresse_arriver.pays), el.vehicule, el.chauffeur, statut)}))
      );
      return reservation$;
      
  }

  listeVehiculeSociete(): Observable<Vehicule[]> {
    return this._http.get(`${environment.baseUrl}${environment.reservationsApi}/vehicules`)
    .pipe(
      map((element:any[]) => element.map(vehicule => new Vehicule(vehicule.url, vehicule.immatriculation, vehicule.marque, vehicule.model, vehicule.categorie, vehicule.estReservee)))
    );
  }

  addReservation(annonce:CreerReservation): Observable<CreerReservation> {
    {

      return this._http.put(`${environment.baseUrl}${environment.apiCreerReservation}`, annonce).pipe(
        map(
          (data: any) => new CreerReservation(data.id, sessionStorage.getItem("email"), data.depart, new Adresse(data.adresse_depart.numeroVoie, data.adresse_depart.designationVoie, data.adresse_depart.ville, data.adresse_depart.codePostal, data.adresse_depart.pays), new Adresse(data.adresse_arriver.numeroVoie, data.adresse_arriver.designationVoie, data.adresse_arriver.ville, data.adresse_arriver.codePostal, data.adresse_arriver.pays)))
        )
    }
  }

  listerAnnonceVilleDepart(depart: string): Observable<ReserverAfficherAnnonce[]> {
    return this._http.get(`${environment.baseUrl}${environment.apiCreerReservation}/${depart}`).pipe(
      map(
        (data: any[]) => data.map(el => new ReserverAfficherAnnonceUtils(el.id, new Adresse(el.adresse_depart.numeroVoie, el.adresse_depart.designationVoie, el.adresse_depart.ville, el.adresse_depart.codePostal, el.adresse_depart.pays), new Adresse(el.adresse_arriver.numeroVoie, el.adresse_arriver.designationVoie, el.adresse_arriver.ville, el.adresse_arriver.codePostal, el.adresse_arriver.pays), new Date(el.depart), el.depart, el.vehicule, el.chauffeur, el.place))
      )
    )
  }

  listerVehiculePro(crenau: DateDebutFin): Observable<ReserverAfficherVehicule[]> {
    return this._http.post(`${environment.baseUrl}${environment.apiListerVoitureReservation}`, crenau).pipe(
      map(
        (data:any[]) => data.map(el => new ReserverAfficherVehicule(el.id, el.url, el.marque, el.modele, el.immatriculation, el.dispo))
      )
    )
  }

  // enregistrer reservation
  enregistrerReservation(reservation:ReserverVehicule): Observable<ReserverVehicule>{
    return this._http.put(`${environment.baseUrl}${environment.ajouterReservationSociete}`, reservation).pipe(
      map(
        (data:any) => data.map( el => new ReserverVehicule(el.crenau, el.vehicule, el.collab))
      )
    )
  }
  
  listerReservationsSociete(): Observable<ReservationSociete[]> {
    const reservationSociete$ = this._http.get(`${environment.baseUrl}${environment.reservationsSocieteApi}/${sessionStorage.getItem("email")}`)
      .pipe(
        map((reservationsSocieteServeur: any[]) => reservationsSocieteServeur.map( el => new ReservationSociete(el.id, el.date_debut, el.date_fin, el.marque, el.modele, el.immatriculation)))
      );
      return reservationSociete$;
      
  }

  private modifReservation:Subject<Reservation> = new BehaviorSubject(new Reservation(undefined, undefined, undefined, undefined, undefined, undefined, undefined));
  get modifReservation$(): Observable<Reservation> {
    return this.modifReservation.asObservable();
  }
  modifierReservation(reservation:Reservation): Observable<Reservation> {
    console.log("modifierReservation")
    console.log(reservation)
    return this._http.put(`${environment.baseUrl}${environment.reservationUpdate}/${reservation.id}`, reservation)
    .pipe(
      map((el: any) => new Reservation(el.id, el.depart, new Adresse(el.adresse_depart.numeroVoie, el.adresse_depart.designationVoie, el.adresse_depart.ville, el.adresse_depart.codePostal, el.adresse_depart.pays), new Adresse(el.adresse_arriver.numeroVoie, el.adresse_arriver.designationVoie, el.adresse_arriver.ville, el.adresse_arriver.codePostal, el.adresse_arriver.pays), el.vehicule, el.chauffeur, el.statut))
      , tap(modifiedReservation => this.modifReservation.next(modifiedReservation))
    );
  }

}