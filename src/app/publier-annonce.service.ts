import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

export class Vehicule { nbPlace:string;marque:string;model:string;immatriculation:string}
export class Adresse { adresseDep:PlaceAdress; adresseArr:PlaceAdress; dist:number; duree:string;}
export class DateHeure {dateDepart: Date; heureDepart: number; minuteDepart:number
  toString(){
    return this.dateDepart + " " + this.heureDepart + "h" + this.minuteDepart
}}
export class Annonce { itineraireAnnonce:Adresse; vehiculeAnnonce: Vehicule; horraireAnnonce:DateHeure; userEmail: string}
export class PlaceAdress { street_number:number ; route:string; locality:string; administrative_area_level_1:string; country:string; postal_code:string
  toString(){
    return this.street_number + " " + this.route +", " + this.locality + ", " + this.country
  }}

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class PublierAnnonceService {

  constructor(private _http:HttpClient) { }

  vehiculeAnnonce:Vehicule = new Vehicule();

  // création d'une instance de Subject
  // le subject est privé, seul le service ServiceA peut émettre une valeur
  // <string> désigne la nature de la donnée à notifier
  private action = new Subject<string>();

  // création d'une propriété publique
  // accessible en dehors du service
  // seule l'interface Observable du Subject est exposée
  get actionObs() {
      return this.action.asObservable();
  }


  postAnnonce(annonceToPost:Annonce){
    this._http.post(
        environment.publierAnnonceUrl,
        annonceToPost,
        httpOptions
    )
    .toPromise()
    .then((data: any) => {
      return data.passage_concours_id
    }, (error:any)=>{
      console.log(error)
      return -1
    })

  }
}
