import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-demande-r',
  templateUrl: './demande-r.component.html',
  styleUrls: ['./demande-r.component.scss']
})
export class DemandeRComponent implements OnInit {
  demandesParticipation: any[] = []; // List to store participation requests
  profile: any; // Stores the formateur's profile information
  helper = new JwtHelperService(); // JWT helper instance for decoding tokens
  successMessage: string = ''; // Message to display upon successful request handling
  successClass: string = '';    // CSS class for success message
  dangerMessage: string = '';   // Message to display upon request handling failure
  dangerClass: string = '';     // CSS class for danger message
  imagepath: string = 'http://localhost:3000/'; // Base path for images
  dataArray: any[] = []; // Array to store formateurs data

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    const id = this.getId(); // Get the formateur's ID from JWT token
    this.ds.getoneformateur(id).subscribe(data => {
      this.profile = data; // Assign profile data
      console.log(this.profile); // Log profile data for debugging
    });
    this.getDemandesParticipation(); // Load participation requests
    this.ds.getAllformateur().subscribe(data => {
      this.dataArray = data; // Assign formateurs data
      console.log(data); // Log data for debugging
    });
  }

  // Method to get the formateur ID from the JWT token
  getId(): number {
    let token: any = localStorage.getItem('token'); // Retrieve the JWT token
    let decodedtoken: any = this.helper.decodeToken(token); // Decode the token
    return decodedtoken.id; // Return the formateur ID
  }

  // Method to accept a participation request
  accepterRequest(FormateurId: number, formationId: number) {
    this.ds.accepterRequest(FormateurId, formationId, this.getId()).subscribe(
      res => {
        this.successMessage = 'La demande a été acceptée avec succès.'; // Success message
        this.successClass = 'alert-success'; // CSS class for success message
        this.ngOnInit(); // Reload data
      },
      error => {
        this.dangerMessage = 'Une erreur s\'est produite lors de l\'acceptation de la demande.'; // Error message
        this.dangerClass = 'alert-danger'; // CSS class for error message
      }
    );
  }

  // Method to refuse a participation request
  refuserRequest(FormateurId: number, formationId: number) {
    this.ds.refuserRequest(FormateurId, formationId, this.getId()).subscribe(
      res => {
        this.successMessage = 'La demande a été refusée avec succès.'; // Success message
        this.successClass = 'alert-success'; // CSS class for success message
        this.ngOnInit(); // Reload data
      },
      error => {
        this.dangerMessage = 'Une erreur s\'est produite lors du refus de la demande.'; // Error message
        this.dangerClass = 'alert-danger'; // CSS class for error message
      }
    );
  }

  // Method to load participation requests
  getDemandesParticipation() {
    const id = this.getId(); // Get the formateur's ID
    this.ds.getDemandesParticipation(id).subscribe(
      (data) => {
        this.demandesParticipation = data; // Assign requests data
        console.log('Demandes de participation:', this.demandesParticipation); // Log data for debugging
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes de participation:', error); // Log errors
      }
    );
  }

  // Method to navigate to the formateur's detailed profile page
  navigateToProfile(Formateur: any) {
    window.location.href = `/formateur/profiledetailles/${Formateur}`; // Redirect to profile details page
  }
}
