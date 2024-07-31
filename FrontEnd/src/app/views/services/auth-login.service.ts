import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  helper=new JwtHelperService
  constructor(private http:HttpClient) { }

  login(body:any){
    return this.http.post('http://localhost:3000/login',body)
    }

    savedata(token:any){
    localStorage.setItem('token',token)
    }

    logedin(): boolean {
      const token = localStorage.getItem('token');
      return !!token && !this.helper.isTokenExpired(token);
    }
}
