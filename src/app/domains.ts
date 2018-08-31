export class Reservation {
    
    constructor(
        public id:number, 
        public depart:Date, 
        public adresse_depart:Adresse, 
        public adresse_arriver:Adresse,
        public vehicule:string, 
        public chauffeur:string,
        public statut:any) {        
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

export class PlaceAdress { street_number:number ; route:string; locality:string; administrative_area_level_1:string; country:string; postal_code:string}

export class AdresseGoogleApi { adresseDep:PlaceAdress; adresseArr:PlaceAdress; dist:number; duree:string}

export class CreerReservation{
    constructor(public id_annonce:number,
        public id_collegue:string,
        public depart:any,
        public adresse_depart:Adresse,
        public adresse_arriver:Adresse){
        }
}

export class DateHeure{
    constructor(
        public date,
        public heure,
        public minute
    ){

    }
}

export class DateDebutFin{
    constructor(
        public debut:DateHeure,
        public fin:DateHeure
    ){
    }
}

export class ReserverAfficherVehicule{
    constructor(
        public id:number,
        public url:string,
        public marque:string,
        public modele:string,
        public immatriculation:string,
        public dispo:boolean
    ){}
}
  
export class ReserverVehicule{
    constructor(
	public creneau,
	public vehicule,
    public collab){
        
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


export class Vehicule
{
    constructor(public id:number,public photoUrl:string,public immatriculation:string,public marque:string,public modele:string, public categorie:string,public places:number,public societe:boolean, public etat:string)
    {
   
    }

}

export enum Categories
{
    MICRO_URBAINES = "Micro urbaine", 
    MINI_CITADINES = "Mini citadine", 
    CITADINES_POLYVALENTES = "Citadine polyvalente", 
    COMPACTES = "Compact", 
    BERLINES_TAILLE_S = "Berline taille S", 
    BERLINES_TAILL_M = "Berline taille M", 
    BERLINES_TAILL_L = "Berline taille L",
    SUV_TT_PICKUP= "SUV/Tout terrain/Pick-Up"
}

export class Collaborateur
{
    constructor(public id:number, public nom:string, public prenom:string, public email:string,
        public motDePasse:string,public matricule:string,public permis:string[],public telephone:string,
        public roles:string[],public photoUrl:string)
    {

    }
}

export enum Roles
{
    ROLE_UTILISATEUR = "Utlisateur",
    ROLE_ADMINISTRATEUR = "Administrateur",
    ROLE_CHAUFFEUR= "Chauffeur"
} 

export enum Permis
{
    PERMIS_A = "Permis A", 
    PERMIS_B = "Permis B",
    PERMIS_C = "Permis C",
    PERMIS_D = "Permis D",
    PERMIS_E = "Permis E"
}

