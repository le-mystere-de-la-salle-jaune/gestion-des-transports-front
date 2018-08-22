export class ReserverAfficherAnnonce{
    
    constructor(public id:number, 
        public adresse_depart:Adresse, 
        public adresse_arriver:Adresse, 
        public depart:string, 
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
        public depart:string,
        public adresse_depart:Adresse,
        public adresse_arriver:Adresse){
        }
}