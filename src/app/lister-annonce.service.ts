import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annonce } from './publier-annonce.service';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})

export class ListerAnnonceService {

  constructor(private _http:HttpClient) { }

  getAnnonce(): Promise<Annonce[]> {
    
    return this._http.get(
      environment.listerAnnonceUrl,
      httpOptions
    )
    .toPromise()
    .then((data: any) => {
      return data
    }, (error:any)=>{
      console.log(error)
      return -1
    })

  }

}
