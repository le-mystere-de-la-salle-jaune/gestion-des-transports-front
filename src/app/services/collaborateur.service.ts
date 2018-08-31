import { Injectable } from '@angular/core';
import { Collaborateur } from '../domains';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CollaborateurService 
{

  constructor(private _http:HttpClient) 
  { 

  }

  listerChauffeur():Promise<Collaborateur[]>  
  {
    return this._http.get(`${environment.baseUrl}${environment.apiCollaborateurChauffeur}`)
    .toPromise()
    .then((data: any) => data.map(el => new Collaborateur(el.id, el.nom, el.prenom, el.email,
        el.motDePasse,el.matricule,el.permis,el.telephone,el.roles,el.photoUrl)));
  }

  

  trouverChauffeurParId(id:number)
  {
    return this._http.get(`${environment.baseUrl}${environment.apiCollaborateur}/${id}`)
    .toPromise()
    .then((el: any) => new Collaborateur(el.id, el.nom, el.prenom, el.email,
        el.motDePasse,el.matricule,el.permis,el.telephone,el.roles,el.photoUrl));
  }

  trouverChauffeurParMatricule(matricule:string)
  {
    return this._http.get(`${environment.baseUrl}${environment.apiCollaborateurChauffeur}/${matricule}`)
    .toPromise()
    .then((el: any) => new Collaborateur(el.id, el.nom, el.prenom, el.email,
        el.motDePasse,el.matricule,el.permis,el.telephone,el.roles,el.photoUrl));
  }

  ajouterUnChauffeur(matricule:string)
  {
    return this._http.put(`${environment.baseUrl}${environment.apiCollaborateurChauffeur}`,matricule)
    .toPromise()
    .then((el: any) => new Collaborateur(el.id, el.nom, el.prenom, el.email,
        el.motDePasse,el.matricule,el.permis,el.telephone,el.roles,el.photoUrl));
  }

}
