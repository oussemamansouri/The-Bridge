import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  // Define variables to hold various data and messages
  profile: any;
  img: any;
  imagepath: string = 'http://localhost:3000/'; // Base URL for images
  detailsf: any;
  dataArray: any[] = []; // Initialize as an empty array
  dataformation = {
    titre: '',
    description: '',
    pointsf: 0,
    modeformation: '',
    besoin: '',
    domaine: '',
    id: '',
    FormateurId: ''
  };

  id: number; // Formateur ID

  messagesuccess: string = ''; // Success message for updates
  deleteMessage: string = ''; // Message for successful deletion
  helper = new JwtHelperService(); // JWT helper to decode tokens

  // Dependency injection for DataService and Router
  constructor(private ds: DataService, private route: Router) {}

  ngOnInit(): void {
    // Retrieve the formateur ID from the token and fetch their formations
    this.id = this.getId(); // Get formateur ID
    this.ds.getAllFormationByFormateur(this.id).subscribe(
      data => {
        this.dataArray = data; // Assign the data to dataArray
        console.log(this.dataArray);
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching formations:', err.message); // Log error if request fails
      }
    );
  }

  // Method to retrieve formateur ID from JWT token
  getId(): number {
    const token: any = localStorage.getItem('token');
    const decodedtoken: any = this.helper.decodeToken(token); // Decode token
    return decodedtoken.id; // Return the ID
  }

  // Method to delete a formation by ID
  delete(id: string, index: number): void {
    this.ds.deleteformation(id).subscribe(
      response => {
        console.log(response);
        this.dataArray.splice(index, 1); // Remove the formation from dataArray
        this.deleteMessage = "La formation a été supprimée avec succès."; // Success message
      },
      (err: HttpErrorResponse) => {
        console.error('Error deleting formation:', err.message); // Log error if request fails
      }
    );
  }

  // Method to set data for a specific formation
  getdata(titre: string, description: string, pointsf: number, modeformation: string, besoin: string, domaine: string, id: string, FormateurId: string): void {
    this.messagesuccess = ''; // Clear previous success message
    this.dataformation = {
      titre,
      description,
      pointsf,
      modeformation,
      besoin,
      domaine,
      id,
      FormateurId
    };
    console.log(this.dataformation); // Log the data for debugging
  }

  // Method to update a formation with new data
  updatenewformation(f: any): void {
    const data = f.value; // Extract data from the form
    this.ds.updateformation(this.dataformation.id, data).subscribe(
      (response) => {
        console.log(response);
        // Find index of the updated formation in dataArray
        const indexId = this.dataArray.findIndex(obj => obj.id === this.dataformation.id);
        if (indexId !== -1) {
          // Update the formation details in dataArray
          this.dataArray[indexId] = { ...this.dataArray[indexId], ...data };
          this.messagesuccess = `Les informations de la formation ${this.dataArray[indexId].titre} ont été mises à jour avec succès.`; // Success message
        }
      },
      (err: HttpErrorResponse) => {
        console.error('Error updating formation:', err.message); // Log error if request fails
      }
    );
  }

  // Method to navigate to the details page of a specific formation
  details(id: string): void {
    this.route.navigate(['formateur/detailsformation/' + id]); // Navigate to details page
  }
}
