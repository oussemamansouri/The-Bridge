import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-demande-e',
  templateUrl: './demande-e.component.html',
  styleUrls: ['./demande-e.component.scss']
})
export class DemandeEComponent implements OnInit {
  demandes: any; // Définissez correctement le type des demandes
  helper= new JwtHelperService
  constructor(private ds: DataService) { } // Assurez-vous d'injecter le service HelperService si nécessaire

  ngOnInit(): void {
    const id = this.getId(); // Appel de la méthode pour obtenir l'identifiant du formateur
    this.loadDemandes(id); // Appel de la méthode pour charger les demandes avec l'ID du formateur
  }

  loadDemandes(formateurId: number) {
    this.ds.getallDemandesByFormateurId(formateurId).subscribe(demandes => {
      this.demandes = demandes;
      console.log(demandes)
    });
  }

  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }
}
