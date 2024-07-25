import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthLoginService } from 'src/app/views/services/auth-login.service';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent implements OnInit {
  data: any;
  helper= new JwtHelperService
  imagepath:any='http://localhost:3000/'

  constructor(public asf:AuthLoginService,private router:Router) {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      this.data = decodedToken;
    }else{this.data=''}

  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
    this.ngOnInit()
  }

  navigateprofile(){
    switch(this.data.role) {
      case 'Admin':
        this.router.navigate(['/admin'])
        break;
      case 'modirateur':
        this.router.navigate(['/moderator'])
        break;
        case 'formateur':
          this.router.navigate(['/formateur'])
          break;
      default:
        this.router.navigate(['/loginuser'])
    }

  }
}
