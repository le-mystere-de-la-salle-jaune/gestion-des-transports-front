import { Pipe, PipeTransform } from '@angular/core';
import {Vehicule} from './../domains';

@Pipe({
  name: 'filtrerImma'
})
export class FiltrerPipeImma implements PipeTransform {

  transform(value, args) {
    if(args!=undefined) {
      return value.filter(vehicule => vehicule.immatriculation.toLocaleLowerCase().includes(args.trim().toLocaleLowerCase()));
    } else {
      return value;
    }
  }
}