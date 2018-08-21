import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Vehicule { nbPlace:string;marque:string;model:string;immatriculation:string}

@Injectable({
  providedIn: 'root'
})
export class PublierAnnonceService {

  constructor() { }

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

  saveNbPlaceVehicule(data:any){
    // exécution de l'action

    // notification de tous les observateurs avec la donnée courante
    this.action.next(data);
  }
}
