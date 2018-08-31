import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation, Adresse} from '../domains';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
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

  listerReservationsSociete(): Observable<ReservationSociete[]> {
    const reservationSociete$ = this._http.get(`${environment.baseUrl}${environment.reservationsSocieteApi}/${sessionStorage.getItem("email")}`)
      .pipe(
        map((reservationsSocieteServeur: any[]) => reservationsSocieteServeur.map( el => new ReservationSociete(el.id, el.date_debut, el.date_fin, el.marque, el.modele, el.immatriculation)))
      );
      return reservationSociete$;
      
  }

/*
  findReservationFromServeur(idReservation:number):Observable<Reservation> {
    return this._http.get(`${environment.baseUrl}${environment.reservationsApi}/${idReservation}`)
    .pipe(
      map((el: any) => new Reservation(el.id, el.depart, new Adresse(el.adresse_depart.numeroVoie, el.adresse_depart.designationVoie, el.adresse_depart.ville, el.adresse_depart.codePostal, el.adresse_depart.pays), new Adresse(el.adresse_arriver.numeroVoie, el.adresse_arriver.designationVoie, el.adresse_arriver.ville, el.adresse_arriver.codePostal, el.adresse_arriver.pays), el.vehicule, el.chauffeur, el.statut)),
      tap(modifiedReservation => this.modifReservation.next(modifiedReservation))
    );
  }*/

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