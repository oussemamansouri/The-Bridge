import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {
  myParticipation: any = []; // Array to hold the user's participation data
  myId: any; // Variable to store the user's ID
  helper = new JwtHelperService(); // JWT helper service instance
  imagepath: any = 'http://localhost:3000/'; // Base URL for images
  dataArray: any = []; // Array to hold formateur data
  showConfirmationDialog = false; // Flag to control the visibility of the confirmation dialog
  currentFormationId: any; // ID of the currently selected formation for deletion
  currentReceiverId: any; // ID of the receiver associated with the formation
  currentIndex: any; // Index of the participation item in the list
  successMessage: string = ''; // Message to display upon successful deletion

  constructor(private ds: DataService, private route: Router) {
    // Fetch formateur data when the component is initialized
    this.ds.getAllformateur().subscribe(data => {
      console.log(data); // Log the data for debugging purposes
      this.dataArray = data; // Assign the data to the dataArray
    });
  }

  ngOnInit(): void {
    // Get the user's ID from the token and load their participation data
    this.myId = this.getId();
    this.loadParticipations();
  }

  // Load participation data for the current user
  loadParticipations() {
    this.ds.getParticipation(this.myId).subscribe(data => {
      this.myParticipation = data; // Assign the data to the myParticipation array
      console.log(this.myParticipation); // Log the data for debugging purposes
    });
  }

  // Retrieve the user's ID from the JWT token stored in localStorage
  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  // Navigate to the profile details of the selected formateur
  navigateToProfile(FormateurId: any) {
    window.location.href = `/formateur/profiledetailles/${FormateurId}`;
  }

  // Show the confirmation dialog for deleting a participation
  deleteParticipation(FormationId: any, ReceiverId: any, index: number) {
    this.currentFormationId = FormationId; // Set the formation ID
    this.currentReceiverId = ReceiverId; // Set the receiver ID
    this.currentIndex = index; // Set the index of the item to delete
    this.showConfirmationDialog = true; // Show the confirmation dialog
  }

  // Handle the confirmation of the deletion
  onConfirm() {
    this.showConfirmationDialog = false; // Hide the confirmation dialog
    this.ds.ddeleteParticipation(this.getId(), this.currentFormationId, this.currentReceiverId).subscribe(
      res => {
        this.myParticipation.splice(this.currentIndex, 1); // Remove the item from the list
        this.successMessage = 'Suppression effectuée avec succès.'; // Set the success message
      },
      err => {
        console.error('Erreur lors de la suppression de la participation', err); // Log the error if deletion fails
      }
    );
  }

  // Handle the cancellation of the deletion
  onCancel() {
    this.showConfirmationDialog = false; // Hide the confirmation dialog
  }
}
