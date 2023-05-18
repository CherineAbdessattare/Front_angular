import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import { Departement } from '../model/departement.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLDep } from '../config';
import { DepartementWrapper } from '../model/DepartementWrapped.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  apiURL: string = 'http://localhost:8061/etudiants/api';
 apiURLDep: string = 'http://localhost:8061/etudiants/dep';

  idEtudiant! : number;
  etudiant!:Etudiant;
  etudiants:Etudiant[];
  // departements: Departement[];
  constructor(private http : HttpClient) { 
    //console.log("Création de service etudiant ! ")
    // this.departements = [{idDepart : 1, nomDepart :"TI",DescriptionDepart:"Technologies de l'informatique"},
    // {idDepart : 2, nomDepart :"GM",DescriptionDepart:"Génie mécanique"}]
    this.etudiants = [{idEtudiant:1, nom:'Cherine',prenom:'Abdessattare',parcours:'DSI',
    email:'shirine073@gmail.com',dateInscription: new Date("01/15/2023"), departement :{idDepart : 1, nomDepart :"TI",DescriptionDepart:"Technologies de l'informatique"}},
    {idEtudiant:2, nom:'Dalel',prenom:'Loussaief',parcours:'DSI',
    email:'loussaiefdalel@gmail.com',dateInscription: new Date("01/20/2023"),departement :{idDepart : 1, nomDepart :"TI",DescriptionDepart:"Technologies de l'informatique"}},
    {idEtudiant:3, nom:'Nour',prenom:'Garaali',parcours:'DSI',
    email:'garaalinour@gmail.com',dateInscription: new Date("01/25/2023"),departement :{idDepart : 1, nomDepart :"TI",DescriptionDepart:"Technologies de l'informatique"}}];
  }

  listeEtudiant(): Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(this.apiURL);
    }


  ajouterEtudiant( etud: Etudiant)
{
  // this.etudiants.push(etud);
  return this.http.post<Etudiant>(this.apiURL, etud,httpOptions);

}

supprimerEtudiant( id : number){
  const url = `${this.apiURL}/${id}`;
  return this.http.delete(url, httpOptions);

  }

  consulterEtudiant(id: number): Observable<Etudiant> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Etudiant>(url);
    }
    

    updateEtudiant(etud :Etudiant) : Observable<Etudiant>
    {
      return this.http.put<Etudiant>(this.apiURL, etud, httpOptions);
    }
   
    listeDepartements():Observable<DepartementWrapper>{
      return this.http.get<DepartementWrapper>(this.apiURLDep);
    }
    
    rechercherParDepartement(idDepart: number):Observable< Etudiant[]> {
      const url = `${this.apiURL}/etudDepart/${idDepart}`;
      return this.http.get<Etudiant[]>(url);
    }

    rechercherParNom(nom: string):Observable< Etudiant[]> {
      const url = `${this.apiURL}/etudsByName/${nom}`;
      return this.http.get<Etudiant[]>(url);
      }
        
      ajouterDepartement( dep: Departement):Observable<Departement>{
        return this.http.post<Departement>(this.apiURLDep, dep, httpOptions);
        }
        
 
 

    
  
}
