import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthLoginService } from 'src/app/views/services/auth-login.service';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-formateur-layout',
  templateUrl: './formateur-layout.component.html',
  styleUrls: ['./formateur-layout.component.scss']
})
export class FormateurLayoutComponent implements OnInit {
  name:any
  data: any;
  helper= new JwtHelperService
  imagepath:any='http://localhost:3000/'
  profile: any; 


  constructor(private route:Router ,public asf: AuthLoginService, private api: DataService) { 
    this.name=localStorage.getItem('name')
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      this.data = decodedToken;
    }else{this.data=''}
    
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



  logout(){
    localStorage.removeItem('token')
    this.route.navigate(['/loginuser'])
    this.ngOnInit()
  }
  redirectToPacksPage() {
    this.route.navigate(['/tarifs']);
}
}
