import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-addformation',
  templateUrl: './addformation.component.html',
  styleUrls: ['./addformation.component.scss']
})

export class AddformationComponent implements OnInit {
  profile: any; // Variable to hold the profile data
  id: any; // Variable to store the ID of the moderator
  img: any; // Variable to store the selected image file
  imagepath: any = 'http://localhost:3000/'; // Base URL for image paths
  messageSucces: string = ''; // Variable to store success messages
  currentCategory: string = ''; // Variable for handling dropdown menu state

  helper = new JwtHelperService(); // Helper for decoding JWT tokens

  constructor(private ds: DataService, private route: Router) {}

  ngOnInit(): void {
    const id = this.getId(); // Call method to get the moderator's ID
    this.ds.getoneformateur(id).subscribe(data => {
      this.profile = data; // Assign the profile data received from the API
      console.log(this.profile); // Log profile data for debugging
    });
  }

  // Method to get the ID from the JWT token stored in local storage
  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id; // Return the ID from the decoded token
  }

  // Method to handle file selection
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.img = event.target.files[0]; // Assign the selected file to img
      console.log(this.img); // Log the selected file for debugging
    }
  }

  // Method to add a new formation
  addformation(f: any): void {
    const formData = new FormData();
    formData.append('titre', f.value.titre); // Add title to FormData
    formData.append('description', f.value.description); // Add description to FormData
    formData.append('modeformation', f.value.modeformation); // Add training mode to FormData
    formData.append('besoin', f.value.besoin); // Add needs to FormData
    formData.append('domaine', f.value.domaine); // Add domain to FormData

    if (this.img) {
      formData.append('img', this.img); // Append the selected image if available
    } else {
      // Create a default image file if no image is selected
      const defaultImageFile = new File(['assets/image/formation.png'], 'formation.png', { type: 'image/png' });
      formData.append('img', defaultImageFile); // Append default image to FormData
    }

    if (this.getId()) {
      this.ds.addformationparid(formData, this.getId()).subscribe(
        (response) => {
          console.log(response); // Log response for debugging
          this.messageSucces = "La formation a été ajoutée avec succès !"; // Success message
          this.route.navigate(['/formateur/formation']); // Redirect after successful addition
        },
        (error: HttpErrorResponse) => {
          console.error(error); // Log error for debugging
          console.error("Erreur lors de l'ajout de la formation : " + error.message); // Error message
        }
      );
    } else {
      console.error("Identifiant invalide"); // Log error if ID is invalid
    }
  }

  // Method to toggle dropdown menu visibility
  toggleDropdown(event: Event, category: string): void {
    event.stopPropagation(); // Prevent event propagation

    // Remove 'show' class from the current category
    const currentElement = document.querySelector(`.dropdown-submenu[aria-label="${this.currentCategory}"] > ul`);
    if (currentElement) {
      currentElement.classList.remove('show');
    }

    // Add 'show' class to the clicked category
    const clickedElement = document.querySelector(`.dropdown-submenu[aria-label="${category}"] > ul`);
    if (clickedElement) {
      clickedElement.classList.add('show');
    }

    this.currentCategory = category; // Update current category
  }
}
