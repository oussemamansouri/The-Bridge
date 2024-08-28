import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboardf',
  templateUrl: './dashboardf.component.html',
  styleUrls: ['./dashboardf.component.scss']
})
export class DashboardfComponent implements OnInit {
  profile: any; // Variable to store formateur profile data
  img: any; // Variable to store the selected image for update
  cv: any; // Variable to store CV data
  imagepath: any = 'http://localhost:3000/'; // Base URL for image paths
  cvpathe: any = 'http://localhost:3000/'; // Base URL for CV paths
  old: string = ''; // Variable for old password (not used in current code)
  new: string = ''; // Variable for new password (not used in current code)
  repe: string = ''; // Variable for password repetition (not used in current code)
  errmessage: any; // Variable to store error messages for profile update
  secmessage: any; // Variable to store success messages for profile update
  errmessagepass: any; // Variable to store error messages for password update
  secmessagepass: any; // Variable to store success messages for password update
  id: any; // Variable to store the formateur ID
  cvImportedMessage: string = ''; // Variable to store CV import success message

  helper = new JwtHelperService(); // JWT helper instance for decoding tokens

  constructor(private api: DataService, private route: Router) { }

  ngOnInit(): void {
    const id = this.getId(); // Get the formateur ID from the JWT token
    this.api.getoneformateur(id).subscribe(data => {
      this.profile = data; // Assign the profile data to the component variable
      console.log(this.profile); // Log profile data for debugging
    });
  }

  // Method to update the profile image
  updateimage(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0]; // Get the selected file
      const formData = new FormData();
      formData.append('img', path); // Append the file to the FormData object
      this.api.updateaformateurimage(formData, this.getId()).subscribe(info => {
        this.ngOnInit(); // Reload the profile after updating the image
      });
    }
  }

  // Method to update the CV
  updatecv(event: any) {
    if (event.target.files.length > 0) {
      const path = event.target.files[0]; // Get the selected CV file
      const formData = new FormData();
      formData.append('cv', path); // Append the CV file to the FormData object
      this.api.updateaformateurcv(formData, this.getId()).subscribe(info => {
        this.cvImportedMessage = 'CV importé avec succès.'; // Set success message
        this.ngOnInit(); // Reload the profile after updating the CV
      });
    }
  }

  // Method to get the current user's ID from the JWT token
  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id; // Return the user ID from the decoded token
  }

  // Method to update the formateur profile
  update(f: any) {
    let body = f.value; // Get the form data
    this.api.updateformateurf(body, this.getId()).subscribe(info => {
      console.log(info); // Log the update response for debugging
      this.api.getoneformateur(this.id).subscribe(data => {
        this.secmessage = "Mise à jour terminée avec succès"; // Set success message
        this.ngOnInit(); // Reload the profile after update
      });
    }, (err: HttpErrorResponse) => {
      this.errmessage = err.error; // Set error message for profile update
    });
  }

  // Method to update the formateur password
  updatepassword(f: any) {
    let body = f.value; // Get the form data
    this.api.updatepasswordformateur(body, this.getId()).subscribe(
      info => {
        this.secmessagepass = "Mot de passe mis à jour avec succès."; // Set success message
      },
      (err: HttpErrorResponse) => {
        this.errmessagepass = "Le champ 'ancien mot de passe' est obligatoire et ne peut pas être vide."; // Set error message
      }
    );
  }

  // Method to open the CV in a new tab
  openCV() {
    window.open(this.cvpathe + this.profile.cv, '_blank');
  }

  // Method to download the CV
  downloadCV() {
    const link = document.createElement('a');
    link.href = this.cvpathe + this.profile.cv; // Set the CV URL
    link.download = this.profile.cv; // Set the CV file name
    link.click(); // Trigger the download
  }
}
