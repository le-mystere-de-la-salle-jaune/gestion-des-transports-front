import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation, CreerReservation, Adresse, ReserverAfficherAnnonce, ReserverAfficherAnnonceUtils, DateDebutFin, ReserverAfficherVehicule, ReserverVehicule } from '../domains';
import { environment } from '../../environments/environment';
import { Vehicule } from '../reservation-societe/class';


const URL_BACKEND = environment.baseUrl + environment.reservationsApi;


@Injectable()
export class ReservationService {

  listeReservations(): any {
    throw new Error("Method not implemented.");
  }
  constructor(private _http: HttpClient) { }

  listerReservations(): Observable<Reservation[]> {
    const reservation$ = this._http.get(`${environment.baseUrl}${environment.reservationsApi}`)
      .pipe(
        map((reservationsServeur: any[]) => reservationsServeur.map( el => new Reservation(el.id, el.depart, new Adresse(el.adresse_depart.numeroVoie, el.adresse_depart.designationVoie, el.adresse_depart.ville, el.adresse_depart.codePostal, el.adresse_depart.pays), new Adresse(el.adresse_arriver.numeroVoie, el.adresse_arriver.designationVoie, el.adresse_arriver.ville, el.adresse_arriver.codePostal, el.adresse_arriver.pays), el.vehicule, el.chauffeur)))
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


}