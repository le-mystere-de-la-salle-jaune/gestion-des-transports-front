import { Component, OnInit, ViewChild } from '@angular/core';
import { CreerReservationService } from './services/creer-reservation.service';
import { ReserverAfficherAnnonce, Adresse } from './ReserverAfficherAnnonce';

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styles: []
})
export class ReserverComponent implements OnInit {

  @ViewChild('test') test: any;
  addressInput:string;
  annonces:Array<ReserverAfficherAnnonce> = [];
 

  constructor(public creerReservationService:CreerReservationService) {
    
  }

  ngOnInit() {
  }

  updateInput(){
    this.selectVille();
  }

  selectVille(){
    this.creerReservationService.listerAnnonceVilleDepart(this.addressInput)
  .subscribe(
    (listeAnnonces: Array<ReserverAfficherAnnonce>) => {
      this.annonces = listeAnnonces;
    },
    (err: any) => {
      console.log(err)
    }
  )
}

  ngAfterViewInit(){
    this.test.show();
  }

}
