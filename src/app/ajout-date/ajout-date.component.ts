import { Component, OnInit } from '@angular/core';
import { DateHeure } from '../publier-annonce.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ajout-date',
  templateUrl: './ajout-date.component.html',
  styles: []
})
export class AjoutDateComponent implements OnInit {

  dateDepart: Date
  heureDepart: number
  minuteDepart: number
  horraireCovoit: DateHeure = new DateHeure

  @Output() onHorraireChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onDateChange(value: Date) {
    this.horraireCovoit.dateDepart = value
    this.onHorraireChange.emit(this.horraireCovoit);
  }

  onHoureCHange(value: number){
    this.horraireCovoit.heureDepart = value
    this.onHorraireChange.emit(this.horraireCovoit);
  }

  onMinuteCHange(value: number){
    this.horraireCovoit.minuteDepart = value
    this.onHorraireChange.emit(this.horraireCovoit);
  }

}
