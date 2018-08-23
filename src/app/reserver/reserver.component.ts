import { Component, OnInit, ViewChild } from '@angular/core';
import { CreerReservationService } from './services/creer-reservation.service';
import { ReserverAfficherAnnonce, CreerReservation } from './ReserverAfficherAnnonce';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styles: []
})
export class ReserverComponent implements OnInit {

  @ViewChild('test') test: any;
  @ViewChild('frame') frame: any;
  addressInput: string;
  annonces: Array<ReserverAfficherAnnonce> = [];
  annonceDetail: any;
  creerReservation: CreerReservation;
  afficher: boolean = false;
  dateDepart:Date;

  constructor(public creerReservationService: CreerReservationService, public router:Router) {

  }

  ngOnInit() {
  }

  updateInput() {
    this.selectVille();
  }

  selectVille() {
    this.creerReservationService.listerAnnonceVilleDepart(this.addressInput)
      .subscribe(
        (listeAnnonces: Array<ReserverAfficherAnnonce>) => 
          this.annonces = listeAnnonces,
        (err: any) => {
          console.log(err)
        }
      )
  }

  ngAfterViewInit() {
    this.test.show();
  }

  afficherInfo(id: number) {
    this.annonces.forEach(annonce => {
      if (annonce.id == id) {
        this.annonceDetail = annonce;
      }
    })
    this.afficher = true;
    this.frame.show();
  }

  sendReservation() {
    this.creerReservation = new CreerReservation(this.annonceDetail.id, 1, this.annonceDetail.depart, this.annonceDetail.adresse_arriver, this.annonceDetail.adresse_arriver)

    this.creerReservationService.addReservation(this.creerReservation)
      .subscribe(
        (annonce: CreerReservation) => {
          this.closeWindows();
          },
        (err: any) => {
          console.log(err);
        }
      )
      this.closeWindows();
  }

  redirect(){
    this.router.navigate(["/collaborateur/reservations"]);
  }

  closeWindows(){
    this.frame.hide();
    this.redirect();
  }
}
