export class Vehicule{
    constructor(
        public url:string,
        public immatriculation:string,
        public marque:string,
        public model:string,
        public categorie:string,
        public estReservee:boolean
    ){}
}