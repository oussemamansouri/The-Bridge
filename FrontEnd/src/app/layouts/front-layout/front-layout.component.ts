
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
  data: any = ''; 
  helper: JwtHelperService = new JwtHelperService();
  imagepath: string = 'http://localhost:3000/'; 
  profile: any; 
    selectedCity: string = 'TN';
  cities = [
    { name: 'Tunisie', abbr: 'TN' },
    { name: 'France', abbr: 'FR' },
    { name: 'New York', abbr: 'NY' }
    // Ajoutez d'autres villes ici
  ];
  http: any;

  selectCity(cityAbbr: string): void {
    this.selectedCity = cityAbbr;
  }
  selectedLanguage: string = 'FR';
  languages = [
    { name: 'Français', abbr: 'FR' },
    { name: 'English', abbr: 'EN' },
    { name: 'العربية', abbr: 'AR' }
  ];

  constructor(public asf: AuthLoginService, private router: Router, private api: DataService) { } // Fusionnez les constructeurs en un seul

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      this.data = decodedToken;
    }

    const id = this.getId();
    this.api.getoneformateur(id).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
    });
  }

  getId():number{
    let token:any=localStorage.getItem('token')
   let decodedtoken:any=this.helper.decodeToken(token)
    return decodedtoken.id
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.ngOnInit();
  }

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
  redirectToPacksPage() {
    this.router.navigate(['/tarifs']);
}
selectLanguage(languageAbbr: string): void {
  this.selectedLanguage = languageAbbr;
  this.http.get(`https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&q=TEXT_TO_TRANSLATE&source=SOURCE_LANGUAGE&target=${languageAbbr}`).subscribe((response: any) => {

  });
}
}
