import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from './domains';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'FiltrerReservation'
})
export class FiltrerReservationPipe implements PipeTransform {

  dateNow = new Date();
  dateNowParse = this.dateNow.toJSON();
  
  transform(value, reservationFuture) {
    if(reservationFuture == true) {
      return value.filter(reservation => reservation.dateDepart > this.dateNowParse)
    } else {
      return value.filter(reservation => reservation.dateDepart < this.dateNowParse);
    }
  }
}
