import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profile: any; // Holds the profile data of the moderator
  img: any; // Holds the image data for profile updates
  imagepath: any = 'http://localhost:3000/'; // Base URL for images
  old = ""; // Holds the old password value for password change
  new = ""; // Holds the new password value for password change
  repe = ""; // Holds the repeated new password value for confirmation
  errmessage: any; // Message for general update errors
  secmessage: any; // Message for successful general updates
  errmessagepass: any; // Message for password update errors
  secmessagepass: any; // Message for successful password updates
  id: any; // Stores the moderator's ID
  helper = new JwtHelperService(); // JWT Helper service to decode the token

  constructor(private api: DataService, private route: Router) { }

  ngOnInit(): void {
    // On component initialization, fetch the moderator's profile using their ID
    const id = this.getId(); // Retrieve the moderator's ID from the token
    this.api.getonemoderateur(id).subscribe(data => {
      this.profile = data; // Assign the fetched profile data
      console.log(this.profile); // Log the profile data for debugging
    });
  }

  // Method to update the moderator's profile image
  updateimage(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0]; // Get the selected file
      const formData = new FormData();
      formData.append('img', path); // Append the image file to FormData
      this.api.updateamoderatorimage(formData, this.getId()).subscribe(
        info => this.ngOnInit() // Refresh the profile data after updating the image
      );
    }
  }

  // Method to get the ID of the logged-in moderator from the JWT token
  getId(): number {
    let token: any = localStorage.getItem('token'); // Get the JWT token from local storage
    let decodedtoken: any = this.helper.decodeToken(token); // Decode the token to get the user ID
    return decodedtoken.id; // Return the ID
  }

  // Method to update the moderator's profile information
  update(f: any) {
    let body = f.value; // Get the form data
    this.api.updatemoderator(body, this.getId()).subscribe(info => {
      console.log(info); // Log the response
      this.api.getonemoderateur(this.id).subscribe(data => {
        this.secmessage = "Mise à jour terminée avec succès"; // Success message
        this.ngOnInit(); // Refresh the profile data
      });
    },
    (err: HttpErrorResponse) => {
      this.errmessage = err.error; // Handle and display any errors
    });
  }

  // Method to update the moderator's password
  updatepassword(f: any) {
    let body = f.value; // Get the form data
    this.api.updatepasswordmoderateur(body, this.getId()).subscribe(
      info => {
        // Display success message
        this.secmessagepass = "Mot de passe mis à jour avec succès.";
      },
      (err: HttpErrorResponse) => {
        // Handle and display errors, such as missing old password
        this.errmessagepass = "Le champ 'ancien mot de passe' est obligatoire et ne peut pas être vide.";
      }
    );
  }
}
