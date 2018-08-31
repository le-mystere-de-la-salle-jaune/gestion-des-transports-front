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
  reservation: Reservation;
  reservationSociete:ReservationSociete;
  afficher:boolean;
  reservationDetails: any;

  // récupération de la valeur des modals
  @ViewChild('frame') frame:any;
  @ViewChild('frameCancel') frameCancel:any;

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
    this.router.navigate(['/collaborateur/reservations/creer'])
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

  openModalDetails(id:number) {
    console.log(this.listeReservations);
    this.listeReservations.forEach(reservation => {
      if(reservation.id == id) {
        this.reservationDetails = reservation;
        console.log(reservation);
      }
    })
    this.afficher = true;
    this.frame.show();
  }

  openModalCancel(id:number) {
    this.listeReservations.forEach(reservation => {
      if(reservation.id == id) {
        this.reservationDetails = reservation;
        this.reservation = reservation;
        console.log(reservation)
      }
    })
    this.afficher = true;
    this.frameCancel.show();
  }

  
  confirmCancel() {
        this._reservationService.modifierReservation(this.reservation)
    .subscribe(
      (reservation) => {
        console.log(reservation);
      },
      error => {
        console.log('error', error);
      }
    );
   
   this.frameCancel.hide();
  }

}
