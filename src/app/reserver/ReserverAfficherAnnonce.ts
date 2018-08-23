import { DatePipe, getLocaleDateFormat } from "../../../node_modules/@angular/common";

export class ReserverAfficherAnnonce{
    
    constructor(public id:number, 
        public adresse_depart:Adresse, 
        public adresse_arriver:Adresse, 
        public depart:any, 
        public vehicule:string, 
        public chauffeur:string, 
        public place:number){
            this.depart = new Date(depart);
    }
}

export class ReserverAfficherAnnonceUtils{
    
    constructor(public id:number, 
        public adresse_depart:Adresse, 
        public adresse_arriver:Adresse, 
        public dateDepart:Date,
        public depart:any, 
        public vehicule:string, 
        public chauffeur:string, 
        public place:number){
    }
}

export class Adresse{
    constructor(public numeroVoie:number,
        public designationVoie:string,
        public ville:string,
        public codePostal:string,
        public pays:string){
    }

}


export class CreerReservation{
    constructor(public id_annonce:number,
        public id_collegue:number,
        public depart:any,
        public adresse_depart:Adresse,
        public adresse_arriver:Adresse){
        }
}