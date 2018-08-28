import { Component, OnInit, ViewChild } from '@angular/core';
import { Collaborateur, Roles, Permis } from '../domains';
import { CollaborateurService } from '../services/collaborateur.service';

@Component({
  selector: 'app-page-liste-chauffeurs',
  templateUrl: './page-liste-chauffeurs.component.html',
  styleUrls: ['./page-liste-chauffeurs.component.scss']
})
export class PageListeChauffeursComponent implements OnInit {

  saisiMatricule:string;
  saisiNom:string; 
  saisiPrenom:string;

  listeChauffeurs:Collaborateur[]=[]

  chauffeur:Collaborateur=new Collaborateur(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)

  optionsSelectRole:Array<string>=[]
  optionsSelectPermis:Array<string>=[]

  @ViewChild('frame')frame;

  constructor(private _listeCh:CollaborateurService) {
    _listeCh.listerChauffeur().then((chauffeurs:any) => {
      chauffeurs.forEach(chauffeur => {
        this.listeChauffeurs.push(chauffeur);
      });
    });
   }

  ngOnInit() {
    this.optionsSelectRole.push(Roles.ROLE_UTILISATEUR);
    this.optionsSelectRole.push(Roles.ROLE_ADMINISTRATEUR);
    this.optionsSelectRole.push(Roles.ROLE_CHAUFFEUR);

    this.optionsSelectPermis.push(Permis.PERMIS_A);
    this.optionsSelectPermis.push(Permis.PERMIS_B);
    this.optionsSelectPermis.push(Permis.PERMIS_C);
    this.optionsSelectPermis.push(Permis.PERMIS_D);
    this.optionsSelectPermis.push(Permis.PERMIS_E);
  }

  submit()
  {
    console.log(this.chauffeur.matricule)
    this._listeCh.ajouterUnChauffeur(this.chauffeur.matricule);
    this.frame.hide();
    location.reload();
  }

}
