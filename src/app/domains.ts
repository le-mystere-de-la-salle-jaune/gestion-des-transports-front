export class Vehicule
{
    constructor(public id:number,public photoUrl:string,public immatriculation:string,public marque:string,public modele:string, public categorie:string,public places:number,public societe:boolean)
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

