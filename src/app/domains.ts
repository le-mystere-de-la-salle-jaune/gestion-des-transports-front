export class Reservation {
    
    constructor(
        public id:number, 
        public depart:Date, 
        public adresse_depart:Adresse, 
        public adresse_arriver:Adresse,
        public vehicule:string, 
        public chauffeur:string) {        
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

export class ReservationSociete {
    constructor(
        public id:number,
        public date_debut:Date,
        public date_fin:Date,
        public marque:string,
        public modele:string,
        public immatriculation:string,
    ) {}
}

  