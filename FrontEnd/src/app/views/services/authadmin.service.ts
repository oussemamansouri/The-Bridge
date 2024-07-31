import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthadminService {

  // ProfileAdmin={
  //   username:'',
  //   role:''
  // }



helper=new JwtHelperService()
  constructor(private http:HttpClient) {

  }


  loginA(data:any){
    return this.http.post('http://localhost:3000/login',data)
  }


  saveDataProfil(token:any,role:any){
    let decodeToken=this.helper.decodeToken(token)
    localStorage.setItem('token',token)
    localStorage.setItem('username',decodeToken.username)
    localStorage.setItem('role',decodeToken.role)

  }


  LoggedIn(){
    let token:any=localStorage.getItem('token')
    if(!token){
      return false
    }
    let decodeToken=this.helper.decodeToken(token)


    if(decodeToken.role!=='Admin'){
      return false
    }

    if(this.helper.isTokenExpired(token)){
      return false
    }
    return true
  }

}
