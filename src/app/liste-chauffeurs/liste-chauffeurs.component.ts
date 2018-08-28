import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Collaborateur } from '../domains';
import { CollaborateurService } from '../services/collaborateur.service';

@Component({
  selector: 'app-liste-chauffeurs',
  templateUrl: './liste-chauffeurs.component.html',
  styleUrls: ['./liste-chauffeurs.component.scss']
})
export class ListeChauffeursComponent implements OnInit {

  @Input()optionsSelectRoles:Array<string>=[]
  @Input()optionsSelectPermis:Array<string>=[]

  @Input()listeChauffeurs:Collaborateur[]=[]

  @Input()saisiMatricule:string;
  @Input()saisiNom:string; 
  @Input()saisiPrenom:string; 

  @ViewChild('frame')frame:any

  chauffeur:Collaborateur=new Collaborateur(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)

  constructor(private _listeCh:CollaborateurService) { }

  ngOnInit() {
  }

}
