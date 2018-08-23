import { Injectable } from '@angular/core';
import { ReserverAfficherAnnonce, Adresse, CreerReservation, ReserverAfficherAnnonceUtils } from '../ReserverAfficherAnnonce'
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
    return this._http.get(`http://localhost:8080/${environment.apiCreerReservation}/${depart}`).pipe(
      map(
        (data: any[]) => data.map(el => new ReserverAfficherAnnonceUtils(el.id, new Adresse(el.adresse_depart.numeroVoie, el.adresse_depart.designationVoie, el.adresse_depart.ville, el.adresse_depart.codePostal, el.adresse_depart.pays), new Adresse(el.adresse_arriver.numeroVoie, el.adresse_arriver.designationVoie, el.adresse_arriver.ville, el.adresse_arriver.codePostal, el.adresse_arriver.pays), new Date(el.depart), el.depart, el.vehicule, el.chauffeur, el.place))
      )
    )
  }

  addReservation(annonce:CreerReservation): Observable<CreerReservation> {
    {

      return this._http.put(`http://localhost:8080/${environment.apiCreerReservation}`, annonce).pipe(
        map(
          (data: any) => new CreerReservation(data.id, 1, data.depart, new Adresse(data.adresse_depart.numeroVoie, data.adresse_depart.designationVoie, data.adresse_depart.ville, data.adresse_depart.codePostal, data.adresse_depart.pays), new Adresse(data.adresse_arriver.numeroVoie, data.adresse_arriver.designationVoie, data.adresse_arriver.ville, data.adresse_arriver.codePostal, data.adresse_arriver.pays)))
        )
    }
  }

  
}
