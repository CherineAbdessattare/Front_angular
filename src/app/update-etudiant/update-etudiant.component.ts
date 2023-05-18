import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';
import { Etudiant} from '../model/etudiant.model';
import { Departement } from '../model/departement.model';

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  })
export class UpdateEtudiantComponent implements OnInit {
  currentEtudiant = new Etudiant();
  departements! : Departement[];
  updatedDepId! : number;
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.etudiantService.listeDepartements().subscribe(deps =>  {console.log(deps);
      this.departements = deps._embedded.departements;})//remplir la liste des departements
      this.etudiantService.consulterEtudiant(this.activatedRoute.snapshot.params['id']).subscribe( etud =>{ this.currentEtudiant = etud; 
        this.updatedDepId = this.currentEtudiant.departement.idDepart;} ) ; //selectionner  departement par defaut
 
      }
  updateEtudiant() {
    this.currentEtudiant.departement = this.departements.find(dep => dep.idDepart == this.updatedDepId)!;
    this.etudiantService.updateEtudiant(this.currentEtudiant).subscribe(etud => {
    this.router.navigate(['etudiants']); }
    );
    }


}
