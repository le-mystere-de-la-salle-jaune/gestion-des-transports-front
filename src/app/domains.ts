export class Vehicule
{
    constructor(public id:number,public photoUrl:string,public immatriculation:string,public marque:string,public modele:string, public categorie:string)
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