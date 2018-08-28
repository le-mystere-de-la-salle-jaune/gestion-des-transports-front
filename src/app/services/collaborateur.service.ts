import { Injectable } from '@angular/core';
import { Collaborateur } from '../domains';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';

const URL_BACKEND = `http://localhost:8080`;
const API_VH = `api/collaborateurs`;

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
    return this._http.get(`${URL_BACKEND}/${API_VH}/chauffeurs`)
    .toPromise()
    .then((data: any) => data.map(el => new Collaborateur(el.id, el.nom, el.prenom, el.email,
        el.motDePasse,el.matricule,el.permis,el.telephone,el.roles,el.photoUrl)));
  }

  

  trouverChauffeurParId(id:number)
  {
    return this._http.get(`${URL_BACKEND}/${API_VH}/${id}`)
    .toPromise()
    .then((el: any) => new Collaborateur(el.id, el.nom, el.prenom, el.email,
        el.motDePasse,el.matricule,el.permis,el.telephone,el.roles,el.photoUrl));
  }

  trouverChauffeurParMatricule(matricule:string)
  {
    return this._http.get(`${URL_BACKEND}/${API_VH}/chauffeurs/${matricule}`)
    .toPromise()
    .then((el: any) => new Collaborateur(el.id, el.nom, el.prenom, el.email,
        el.motDePasse,el.matricule,el.permis,el.telephone,el.roles,el.photoUrl));
  }

  ajouterUnChauffeur(matricule:string)
  {
    return this._http.put(`${URL_BACKEND}/${API_VH}/chauffeurs`,matricule)
    .toPromise()
    .then((el: any) => new Collaborateur(el.id, el.nom, el.prenom, el.email,
        el.motDePasse,el.matricule,el.permis,el.telephone,el.roles,el.photoUrl));
  }

}
