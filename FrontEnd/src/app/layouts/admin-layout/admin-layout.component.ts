import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthadminService } from 'src/app/views/services/authadmin.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  username:any
  data: any;
  helper= new JwtHelperService
  imagepath:any='http://localhost:3000/'


  constructor(private as:AuthadminService,private route:Router) {

    this.username=localStorage.getItem('username')

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
    this.route.navigate(['/loginuser'])
    this.ngOnInit()
  }

}
