import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthformateurService {
  helper=new JwtHelperService()
  constructor(private http:HttpClient) {
    
  }
register(formData:any){
  return this.http.post('http://localhost:3000/formateur/register',formData)
}

loginF(body:any){
  return this.http.post('http://localhost:3000/login',body)
}

saveDataProfil(token:any,role:any){
  let decodeToken=this.helper.decodeToken(token)
  localStorage.setItem('token',token)
  localStorage.setItem('username',decodeToken.username)
  localStorage.setItem('role',decodeToken.role)
 
}


formateurLoggedIn() {
  let token: any = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  let decodeToken = this.helper.decodeToken(token);
  
  if (!decodeToken.role) {
    return false; // Pas de rôle, donc probablement un utilisateur non authentifié
  }

  // Vérifie si le rôle est celui d'un formateur
  if (decodeToken.role === 'formateur') {
    // Vérifie également si le jeton est expiré
    if (this.helper.isTokenExpired(token)) {
      return false;
    }
    return true; // L'utilisateur est connecté en tant que formateur
  }

  return false; // Le rôle n'est pas celui d'un formateur
}


}



