import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrerDate'
})
export class FiltrerPipeDate implements PipeTransform {

  transform(value, args) {
    if(args!=undefined) {
      let date = new Date(args);
      return value.filter(annonce => annonce.dateDepart > date);
    } else {
      return value;
    }
  }
}