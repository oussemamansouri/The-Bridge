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

  profile: any; // Variable to hold the profile information
  img: any; // Variable to hold the image file
  imagepath: any = 'http://localhost:3000/'; // Base URL for the image path
  old = ""; // Variable to hold the old password
  new = ""; // Variable to hold the new password
  repe = ""; // Variable to hold the repeated new password
  errmessage: any; // Variable to hold error messages
  secmessage: any; // Variable to hold success messages
  errmessagepass: any; // Variable to hold password error messages
  secmessagepass: any; // Variable to hold password success messages

  helper = new JwtHelperService(); // Service to help decode JWT tokens

  constructor(private api: DataService, private route: Router) { }

  ngOnInit(): void {
    // Fetch the admin profile data on component initialization
    this.api.getadmin().subscribe(data => {
      this.profile = data;
      console.log(this.profile); // Log profile data for debugging
    });
  }

  // Method to update the admin profile image
  updateimage(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0]; // Get the selected file
      const formData = new FormData();
      formData.append('img', path); // Append the file to FormData
      this.api.updateaadminimage(formData, this.getId()).subscribe(info => {
        this.ngOnInit(); // Refresh profile data after updating image
      });
    }
  }

  // Method to get the admin ID from the JWT token
  getId(): number {
    let token: any = localStorage.getItem('token'); // Get the token from local storage
    let decodedtoken: any = this.helper.decodeToken(token); // Decode the token
    return decodedtoken.id; // Return the admin ID from the token
  }

  // Method to update admin profile information
  update(f: any) {
    let body = f.value; // Get form data
    this.api.updateadmin(body, this.getId()).subscribe(info => {
      console.log(info); // Log the response for debugging
      this.api.getadmin().subscribe(data => {
        this.secmessage = "Mise à jour terminée avec succès"; // Success message
        this.ngOnInit(); // Refresh profile data after update
      });
    }, (err: HttpErrorResponse) => {
      this.errmessage = err.error; // Display error message if update fails
    });
  }

  // Method to update admin password
  updatepassword(f: any) {
    let body = f.value; // Get form data
    this.api.updatepassword(body, this.getId()).subscribe(
      info => {
        this.secmessagepass = "Mot de passe mis à jour avec succès."; // Success message
      },
      (err: HttpErrorResponse) => {
        this.errmessagepass = "Le champ 'ancien mot de passe' est obligatoire et ne peut pas être vide."; // Error message
      }
    );
  }

}
