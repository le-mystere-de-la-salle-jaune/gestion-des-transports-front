import { Component, OnInit } from '@angular/core';
import { PaginationService } from './../services/pagination.service';
import { Annonce } from '../publier-annonce.service';
import { ListerAnnonceService } from '../lister-annonce.service';

@Component({
  selector: 'app-lister-annonce',
  templateUrl: './lister-annonce.component.html',
  styles: []
})
export class ListerAnnonceComponent implements OnInit {

  listeAnnonce: Annonce[] = [];

  constructor(private _listerAnnonceService: ListerAnnonceService) { }

  ngOnInit() {
    this._listerAnnonceService.getAnnonce().then((annonceTab:Annonce[]) => {
      this.listeAnnonce = annonceTab
      console.log(this.listeAnnonce)
    })
  }



}
