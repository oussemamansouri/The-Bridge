import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthadminService } from 'src/app/views/services/authadmin.service';

@Component({
  selector: 'app-moderator-layout',
  templateUrl: './moderator-layout.component.html',
  styleUrls: ['./moderator-layout.component.scss']
})
export class ModeratorLayoutComponent implements OnInit {

  // Holds the username retrieved from localStorage
  username: any;

  // Holds decoded JWT data
  data: any;

  // Helper for decoding JWT tokens
  helper = new JwtHelperService();

  // Base path for images
  imagepath: any = 'http://localhost:3000/';

  // Constructor: Injects the Router service for navigation
  constructor(private route: Router) {
    // Retrieve the username from localStorage
    this.username = localStorage.getItem('username');
  }

  // Lifecycle hook: Executes when the component is initialized
  ngOnInit(): void {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // If a token is present, decode it and store the data
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      this.data = decodedToken;
    } else {
      this.data = ''; // If no token is present, set data to an empty string
    }
  }

  // Logs the user out by removing the token and navigating to the login page
  logout() {
    localStorage.removeItem('token'); // Remove the token from localStorage
    this.route.navigate(['/loginuser']); // Navigate to the login page
    this.ngOnInit(); // Re-initialize the component to clear any data
  }
}
