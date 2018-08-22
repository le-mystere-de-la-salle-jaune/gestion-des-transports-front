export class Reservation {
    
    constructor(public id:number, public dateDepart:Date, public villeDep:string, public villeArr:string, public chauffeur:string, public vehicule:string) {
        
    }  
}