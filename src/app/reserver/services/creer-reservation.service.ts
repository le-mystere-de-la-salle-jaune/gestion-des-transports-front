import { Injectable } from '@angular/core';
import { ReserverAfficherAnnonce, Adresse } from '../ReserverAfficherAnnonce'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'node_modules/rxjs';
import { environment } from '../../../environments/environment.prod';
import { map } from 'node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreerReservationService {

  constructor(private _http: HttpClient) { 

  }

  listerAnnonceVilleDepart(depart: string): Observable<ReserverAfficherAnnonce[]> {
    return this._http.get(`http://localhost:8080/reserver/${depart}`).pipe(
      map(
        (data: any[]) => data.map(el => new ReserverAfficherAnnonce(el.id, new Adresse(el.adresse_depart.numeroVoie, el.adresse_depart.designationVoie, el.adresse_depart.ville, el.adresse_depart.codePostal, el.adresse_depart.pays), new Adresse(el.adresse_arriver.numeroVoie, el.adresse_arriver.designationVoie, el.adresse_arriver.ville, el.adresse_arriver.codePostal, el.adresse_arriver.pays), el.depart, el.vehicule, el.chauffeur, el.place))
      )
    )
  }
}
