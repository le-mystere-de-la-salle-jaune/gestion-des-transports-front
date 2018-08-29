import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation, Adresse} from '../domains';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, filter } from 'rxjs/operators';


// en développement, URL_BACKEND = 'http://localhost:8080/api/reservations'
// en mode production, URL_BACKEND = 'à définir'
const URL_BACKEND = environment.baseUrl + environment.reservationsApi;


@Injectable()
export class ReservationService {

  listeReservations(): any {
    throw new Error("Method not implemented.");
  }
  constructor(private _http: HttpClient) { }

  listerReservations(): Observable<Reservation[]> {
    const reservation$ = this._http.get(URL_BACKEND)
      .pipe(
        map((reservationsServeur: any[]) => reservationsServeur.map( el => new Reservation(el.id, el.depart, new Adresse(el.adresse_depart.numeroVoie, el.adresse_depart.designationVoie, el.adresse_depart.ville, el.adresse_depart.codePostal, el.adresse_depart.pays), new Adresse(el.adresse_arriver.numeroVoie, el.adresse_arriver.designationVoie, el.adresse_arriver.ville, el.adresse_arriver.codePostal, el.adresse_arriver.pays), el.vehicule, el.chauffeur)))
      );
      return reservation$;
      
  }



}