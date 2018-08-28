import { Component, OnInit, ViewChild} from '@angular/core';
import { Reservation, ReservationSociete } from './../domains';
import { ReservationService } from './../services/reservation.service';
import { Router } from '@angular/router';
import { PaginationService } from './../services/pagination.service';

@Component({
  selector: 'app-collab-reservations',
  templateUrl: './collab-reservations.component.html',
  styles: []
})
export class CollabReservationsComponent implements OnInit {

  listeReservations: Reservation[] = [];
  listeReservationsSociete:ReservationSociete[] = [];
  reservationPassee: boolean = false;
  reservationFuture: boolean = true;
  @ViewChild('frame') frame:any;
  reservation: Reservation;
  reservationSociete:ReservationSociete;
  afficher:boolean;
  reservationDetails: any;

  public isCollapsed = false;

    // pager object
    pager: any = {};

     // pager object
     pagerSociete: any = {};

    // paged reservations
    pagedListeReservations: Reservation[] = [];
    // paged reservations Societe
    pagedListeReservationsSociete: ReservationSociete[] = [];

  constructor(private _reservationService: ReservationService, private router:Router, private paginationService:PaginationService) {
    
  }

  reserver() {
    this.router.navigate(['/collaborateur/propositions/creer'])
  }
  ngOnInit() {
    this._reservationService.listerReservations().subscribe((reservations: Reservation[]) => {
    this.listeReservations = reservations; 
    console.log(this.listeReservations);
    // initialize to page 1
    this.setPage(1); 
  },
    (error: any) => {
      console.log("error", error);
    }),

    this._reservationService.listerReservationsSociete().subscribe((reservationsSociete: ReservationSociete[]) => {
      this.listeReservationsSociete = reservationsSociete;
      console.log(this.listeReservationsSociete);
    // initialize to page 1
    this.setPageSociete(1); 
  },
    (error: any) => {
      console.log("error", error);
    }) 
  }
  

  setPage(page: number) {
    // get pager object from service
    this.pager = this.paginationService.getPager(this.listeReservations.length, page);
    // get current page of reservations
    this.pagedListeReservations = this.listeReservations.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  setPageSociete(page: number) {
  // get pager object from service
  this.pagerSociete = this.paginationService.getPager(this.listeReservationsSociete.length, page);
  // get current page of reservations
  this.pagedListeReservationsSociete = this.listeReservationsSociete.slice(this.pagerSociete.startIndex, this.pagerSociete.endIndex + 1);
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
