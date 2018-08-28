import { Pipe, PipeTransform } from '@angular/core';
import {Collaborateur} from './../domains';

@Pipe({
  name: 'filtrerNom'
})
export class FiltrerPipeNom implements PipeTransform {

  transform(value, args) {
    if(args!=undefined) {
      return value.filter(chauffeur => chauffeur.nom.toLocaleLowerCase().includes(args.trim().toLocaleLowerCase()));
    } else {
      return value;
    }
  }
}