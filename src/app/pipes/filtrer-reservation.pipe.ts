import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'FiltrerReservation'
})
export class FiltrerReservationPipe implements PipeTransform {

  dateNow = new Date();
  dateNowParse = this.dateNow.toJSON();
  
  transform(value, reservationFuture) {
    if(reservationFuture == true) {
      return value.filter(reservation => reservation.depart > this.dateNowParse)
    } else {
      return value.filter(reservation => reservation.depart < this.dateNowParse);
    }
  }
}
