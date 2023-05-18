import { Departement } from "./departement.model";

export class Etudiant {
    idEtudiant! : number;
    nom! : string;
    prenom!: string;
    parcours!:string;
    email!:string;
    dateInscription!:Date;
    departement! : Departement;

}