import { Pipe, PipeTransform } from '@angular/core';
import {Vehicule} from './../domains';

@Pipe({
  name: 'filtrerMarque'
})
export class FiltrerPipeMarque implements PipeTransform {

  transform(value, args) {
    if(args!=undefined) {
      return value.filter(vehicule => vehicule.marque.toLocaleLowerCase().includes(args.trim().toLocaleLowerCase()));
    } else {
      return value;
    }
  }
}