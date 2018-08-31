import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Vehicule } from './class'
import { ReservationService } from '../services/reservation.service';
import { DateDebutFin, ReserverAfficherVehicule, ReserverVehicule } from '../domains';

@Component({
  selector: 'app-reservation-societe',
  templateUrl: 'reservation-societe.component.html',
  styles: []
})
export class ReservationSocieteComponent implements OnInit {

  dateDep: string;
  dateDepart:string;
  heureDepart:number;
  heureDep: string;
  minuteDep: string;
  minuteDepart:number;

  dateArr: string;
  dateArrivee: string;
  heureArr: string;
  heureArrivee: string;
  minuteArr: string;
  minuteArrivee: string;

  displayCar:boolean = false;

  vehicules: Array<ReserverAfficherVehicule> = [];
  vehicule:ReserverAfficherVehicule;

  carouselIndex:number = 0;

  crenau:DateDebutFin;


  constructor(public reservationService:ReservationService) {

  }

  ngOnInit() {
    
  }

  precedent() {
    if(this.carouselIndex === 0){
      this.carouselIndex = this.vehicules.length - 1;
      this.vehicule = this.vehicules[this.carouselIndex];
    }
    else{
      this.carouselIndex = this.carouselIndex - 1;
      this.vehicule = this.vehicules[this.carouselIndex];
    }
  }

  suivant() {
    if(this.carouselIndex === (this.vehicules.length - 1)){
      this.carouselIndex = 0;
      this.vehicule = this.vehicules[this.carouselIndex];
    }
    else{
      this.carouselIndex = this.carouselIndex + 1;
      this.vehicule = this.vehicules[this.carouselIndex];
    }
  }

  demanderVehicule(){
    let dateDepart = { "date" : this.dateDepart, "heure" : +this.heureDepart, "minute" : +this.minuteDepart }
    let dateArrivee = { "date" : this.dateArrivee, "heure" : +this.heureArrivee, "minute" : +this.minuteArrivee }

    this.crenau = new DateDebutFin(dateDepart, dateArrivee);
    this.reservationService.listerVehiculePro(this.crenau)
      .subscribe(
        (data:Array<ReserverAfficherVehicule>) => { this.vehicules = data;
          this.displayCar = true;
          this.suivant();
        },
        (err: any) => {
          console.log(err)
        }
      )
    
      this.vehicules.forEach(element => {
        console.log(element);
      });
  }

  saveVehicule(idVehicule:number) {
    //this.creerReservation = new CreerReservation(this.annonceDetail.id, sessionStorage.getItem("email"), this.annonceDetail.depart, this.annonceDetail.adresse_arriver, this.annonceDetail.adresse_arriver)
    let dateDepart = { "date" : this.dateDepart, "heure" : +this.heureDepart, "minute" : +this.minuteDepart }
    let dateArrivee = { "date" : this.dateArrivee, "heure" : +this.heureArrivee, "minute" : +this.minuteArrivee }

    let periode = new DateDebutFin(dateDepart, dateArrivee);
    
    let reservation:ReserverVehicule = new ReserverVehicule(periode, idVehicule, sessionStorage.getItem("email"));
    this.reservationService.enregistrerReservation(reservation)
      .subscribe(
        (annonce: ReserverVehicule) => {
          console.log("save");
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

}
