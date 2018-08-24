import { Component, OnInit, Input } from '@angular/core';
import { Collaborateur } from '../domains';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {

  @Input() chauffeur:Collaborateur
  newChauffeur:Collaborateur=new Collaborateur(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)

  constructor() { }

  ngOnInit() {
  }

}
