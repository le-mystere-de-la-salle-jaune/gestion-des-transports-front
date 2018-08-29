import { Pipe, PipeTransform } from '@angular/core';
import { Collaborateur } from './domains';

@Pipe({
  name: 'filtrerMatricule'
})
export class FiltrerPipeMatricule implements PipeTransform {

  transform(value, args) {
    if(args!=undefined) {
      return value.filter(chauffeur => chauffeur.matricule.toLocaleLowerCase().includes(args.trim().toLocaleLowerCase()));
    } else {
      return value;
    }
  }
}