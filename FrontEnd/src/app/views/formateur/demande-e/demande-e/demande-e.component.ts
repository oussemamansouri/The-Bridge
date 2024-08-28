import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-demande-e',
  templateUrl: './demande-e.component.html',
  styleUrls: ['./demande-e.component.scss']
})
export class DemandeEComponent implements OnInit {
  demandes: any; // Variable to store the list of demandes
  helper = new JwtHelperService(); // JWT helper instance for decoding tokens

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    const id = this.getId(); // Get the formateur ID from the JWT token
    this.loadDemandes(id); // Load demandes for the formateur using the ID
  }

  // Method to load demandes based on the formateur ID
  loadDemandes(formateurId: number) {
    this.ds.getallDemandesByFormateurId(formateurId).subscribe(
      demandes => {
        this.demandes = demandes; // Assign the list of demandes to the component variable
        console.log(demandes); // Log the demandes data for debugging
      },
      error => {
        console.error('Erreur lors du chargement des demandes :', error); // Log errors if any
      }
    );
  }

  // Method to get the formateur ID from the JWT token
  getId(): number {
    let token: any = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
    let decodedtoken: any = this.helper.decodeToken(token); // Decode the token to extract user information
    return decodedtoken.id; // Return the formateur ID
  }
}
