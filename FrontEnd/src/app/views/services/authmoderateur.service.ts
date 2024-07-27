import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthmoderateurService {
  helper=new JwtHelperService()
  constructor(private http:HttpClient) { }
  register(body:any){
    return this.http.post('http://localhost:3000/moderateur/register',body)
  }
  
  loginM(body:any){
    return this.http.post('http://localhost:3000/login',body)
  }
  
  saveDataProfil(token:any,role:any){
    let decodeToken=this.helper.decodeToken(token)
    localStorage.setItem('token',token)
    localStorage.setItem('username',decodeToken.username)
    localStorage.setItem('role',decodeToken.role)
   
  }
  
  
  moderateurLoggedIn(){
    let token:any=localStorage.getItem('token')
    if(!token){
      return false
    }
    let decodeToken=this.helper.decodeToken(token)
   
    
    if(decodeToken.role!=='moderateur'){
      return false
    }
  
    if(this.helper.isTokenExpired(token)){
      return false
    }
    return true
  }
  
}
