import { Pipe, PipeTransform } from '@angular/core';
import {Collaborateur} from './../domains';

@Pipe({
  name: 'filtrerPrenom'
})
export class FiltrerPipePrenom implements PipeTransform {

  transform(value, args) {
    if(args!=undefined) {
      return value.filter(chauffeur => chauffeur.prenom.toLocaleLowerCase().includes(args.trim().toLocaleLowerCase()));
    } else {
      return value;
    }
  }
}