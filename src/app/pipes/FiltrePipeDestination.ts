import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrerDestination'
})
export class FiltrerPipeDestination implements PipeTransform {

  transform(value, args) {
    if(args!=undefined && args != "") {
      return value.filter(annonce => annonce.adresse_arriver.ville.toLocaleLowerCase().includes(args.trim().toLocaleLowerCase()));
      
    } else {
      return value;
    }
  }
}