import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthmoderateurService } from '../services/authmoderateur.service';

@Injectable({
  providedIn: 'root'
})
export class GuardmoderatorGuard implements CanActivate {
  constructor(private asm:AuthmoderateurService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject)=>{
        if(this.asm.moderateurLoggedIn()==true){
          resolve(true)
        }
        else {
          this.router.navigate(['/loginuser'])
          localStorage.removeItem('token')
          resolve(false)
        }
      })
    }
    
}
