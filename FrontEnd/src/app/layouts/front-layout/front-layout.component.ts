import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthLoginService } from 'src/app/views/services/auth-login.service';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent implements OnInit {

  // Holds decoded JWT data
  data: any = '';

  // Helper for decoding JWT tokens
  helper: JwtHelperService = new JwtHelperService();

  // Base path for images
  imagepath: string = 'http://localhost:3000/';

  // Holds user profile information
  profile: any;

  // Selected city abbreviation (default is 'TN' for Tunisia)
  selectedCity: string = 'TN';

  // List of available cities
  cities = [
    { name: 'Tunisie', abbr: 'TN' },
    { name: 'France', abbr: 'FR' },
    { name: 'New York', abbr: 'NY' }
    // Add more cities here
  ];

  // Selected language abbreviation (default is 'FR' for French)
  selectedLanguage: string = 'FR';

  // List of available languages
  languages = [
    { name: 'Français', abbr: 'FR' },
    { name: 'English', abbr: 'EN' },
    { name: 'العربية', abbr: 'AR' }
  ];

  // Constructor: Injects services for authentication, routing, and data handling
  constructor(public asf: AuthLoginService, private router: Router, private api: DataService) { }

  // Lifecycle hook: Executes when the component is initialized
  ngOnInit(): void {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // If a token is present, decode it and store the data
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      this.data = decodedToken;
    }

    // Retrieve the user's profile data based on the decoded token's ID
    const id = this.getId();
    this.api.getoneformateur(id).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
    });
  }

  // Retrieves the ID from the decoded JWT token
  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  // Logs the user out by removing the token and navigating to the home page
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.ngOnInit(); // Re-initialize the component
  }

  // Navigates the user to different pages based on their role
  navigateprofile() {
    switch (this.data.role) {
      case 'Admin':
        this.router.navigate(['/admin']);
        break;
      case 'moderateur':
        this.router.navigate(['/moderator']);
        break;
      case 'formateur':
        this.router.navigate(['/formateur']);
        break;
      default:
        this.router.navigate(['/loginuser']);
    }
  }

  // Redirects the user to the pricing page
  redirectToPacksPage() {
    this.router.navigate(['/tarifs']);
  }

  // Selects a city based on the abbreviation provided
  selectCity(cityAbbr: string): void {
    this.selectedCity = cityAbbr;
  }

  // Selects a language based on the abbreviation provided
  selectLanguage(languageAbbr: string): void {
    this.selectedLanguage = languageAbbr;

    // Placeholder for a translation API call (replace with actual implementation)
    this.http.get(`https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&q=TEXT_TO_TRANSLATE&source=SOURCE_LANGUAGE&target=${languageAbbr}`)
      .subscribe((response: any) => {
        // Handle the translation response
      });
  }
}
