import { Component, OnInit } from '@angular/core';
import { Vehicule } from './class'
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-societe',
  templateUrl: 'reservation-societe.component.html',
  styles: []
})
export class ReservationSocieteComponent implements OnInit {

  dateDep: string;
  heureDep: number;
  minuteDep: number;

  dateArr: string;
  heureArr: number;
  minuteArr: number;

  vehicules: Array<Vehicule> = [];
  vehicule:Vehicule;

  carouselIndex:number = 0;

  constructor(public reservationService:ReservationService) {
    this.vehicules.push(new Vehicule('https://www.fly-car.fr/img/categories/location-voiture-tourisme-citadine.png', 'AZ-595-FQ', 'Renault', 'Clio', 'CITADINE', false));
    this.vehicules.push(new Vehicule('https://www.fly-car.fr/img/categories/location-voiture-tourisme-citadine.png', 'FD-595-KI', 'Renault', 'Clio', 'CITADINE', false));
    this.vehicules.push(new Vehicule('https://www.fly-car.fr/img/categories/location-voiture-tourisme-citadine.png', 'HG-295-DH', 'Renault', 'Clio', 'CITADINE', true));
    this.vehicules.push(new Vehicule('https://www.fly-car.fr/img/categories/location-voiture-tourisme-citadine.png', 'HG-595-GF', 'Renault', 'Clio', 'CITADINE', false));
  }

  ngOnInit() {
    /*
    this.reservationService.listeVehiculeSociete().subscribe(
      (listeVehicule:Array<Vehicule>) => this.vehicules = listeVehicule,
      (err:any) => console.log(err)
    );
    */

    this.vehicule = this.vehicules[this.carouselIndex];
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



}
