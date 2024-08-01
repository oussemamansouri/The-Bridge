import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { AuthformateurService } from 'src/app/views/services/authformateur.service';
import { AuthmoderateurService } from 'src/app/views/services/authmoderateur.service';
import { AuthLoginService } from 'src/app/views/services/auth-login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.scss']
})
export class LoginuserComponent implements OnInit {

  dataReceived: any;
  messageError: any;

  data:any;
  errmessage:any
  helper=new JwtHelperService

  constructor(private auth:AuthLoginService,  private as: AuthadminService, private route: Router, private asf: AuthformateurService,private asm:AuthmoderateurService) {
    if(this.as.LoggedIn() === true){
      this.route.navigate(['/admin/profile']);
    }
  }

  ngOnInit(): void {
  }




  loginuser(f:any){
    let body=f.value
    this.auth.login(body).subscribe(res=>{
      this.data=res
      this.auth.savedata(this.data.token.token)
      let decodeToken = this.helper.decodeToken(this.data.token.token)
      // if (this.url){this.route.navigate([this.url])}

      switch(decodeToken.role) {
        case 'Admin':
          this.route.navigate(['/admin'])
          break;
        case 'moderateur':
          this.route.navigate(['/moderator'])
          break;
          case 'formateur':
            this.route.navigate(['/formateur'])
            break;
        default:
          this.route.navigate(['/login'])
      }

    },(err:HttpErrorResponse)=>this.errmessage=err.error)
  }

  // loginA(f: any) {
  //   let data = f.value;

  //   this.as.loginA(data).subscribe(
  //     (response) => {
  //       this.dataReceived = response;
  //       this.as.saveDataProfil(this.dataReceived.token.token, this.dataReceived.role);
  //       this.route.navigate(['/admin/profile']);
  //     },
  //     (err) => console.log(err)
  //   );
  // }

  // loginF(f: any) {
  //   let data = f.value;

  //   this.asf.loginF(data).subscribe(
  //     (response) => {
  //       this.dataReceived = response;
  //       this.asf.saveDataProfil(this.dataReceived.token.token, this.dataReceived.role);
  //       this.route.navigate(['/formateur/profile']);
  //     },
  //     (err) => console.log(err)
  //   );
  // }
  // loginM(f: any) {
  //   let data = f.value;

  //   this.asm.loginM(data).subscribe(
  //     (response) => {
  //       this.dataReceived = response;
  //       this.asm.saveDataProfil(this.dataReceived.token.token, this.dataReceived.role);
  //       this.route.navigate(['/moderator/profile']);
  //     },
  //     (err) => console.log(err)
  //   );
  // }




  register(f1: any) {
    let data = f1.value;

    this.asf.register(data).subscribe(
      () => {
        // Navigate to home route after successful registration
        this.route.navigate(['/']).then(() => {
          // Scroll to top after navigation
          window.scrollTo(0, 0);
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        // Handle error if needed
      }
    );
  }
}
