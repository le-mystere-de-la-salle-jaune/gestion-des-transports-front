import { Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from './../domains';
import { ReservationService } from './../service/reservation.service';
import { Router } from '@angular/router';
import { Collegue } from './../auth/auth.domains';

@Component({
  selector: 'app-collab-reservations',
  templateUrl: './collab-reservations.component.html',
  styles: []
})
export class CollabReservationsComponent implements OnInit {

  listeReservations: Reservation[] = [];
  reservationPassee: boolean = false;
  reservationFuture: boolean = true;
  @ViewChild('frame') frame:any;
  reservation: Reservation;
  afficher:boolean;
  reservationDetails: any;


  constructor(private _reservationService: ReservationService, private router:Router) {
    this._reservationService.listerReservations().subscribe((reservations: Reservation[]) => {
      this.listeReservations = reservations; console.log(this.listeReservations);
    },
      (error: any) => {
        console.log("error", error);
      })
    console.log(this.listeReservations);
  }

  reserver() {
    this.router.navigate(['/collaborateur/propositions/creer'])
  }
  ngOnInit() {
  }

  openModal(id:number) {
    this.listeReservations.forEach(reservation => {
      if(reservation.id == id) {
        this.reservationDetails = reservation;
      }
    })
    this.afficher = true;
    this.frame.show();
  }


}
