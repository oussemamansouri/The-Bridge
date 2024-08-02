import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile : any
  img:any
  imagepath:any='http://localhost:3000/'
  old=""
  new=""
  repe=""
  errmessage:any
  secmessage:any
  errmessagepass:any
  secmessagepass:any

  helper= new JwtHelperService

  constructor(private api:DataService,private route:Router) { }

  ngOnInit(): void {
    this.api.getadmin().subscribe(data=>{this.profile=data
      console.log(this.profile)
    })
   }

   updateimage(event:any){
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path)
      this.api.updateaadminimage(formData,this.getId()).subscribe(info=>this.ngOnInit())
    }
  }

  getId():number{
    let token:any=localStorage.getItem('token')
   let decodedtoken:any=this.helper.decodeToken(token)
    return decodedtoken.id
  }

  update(f:any){
    let body=f.value
    this.api.updateadmin(body,this.getId()).subscribe(info=>{
      console.log(info)
      this.api.getadmin().subscribe(data=>{
        {this.secmessage="Mise à jour terminée avec succès"
      this.ngOnInit()}
      })

    },(err:HttpErrorResponse)=>{
      this.errmessage=err.error
    })
      }

      updatepassword(f:any){
        let body=f.value
         this.api.updatepassword(body,this.getId()).subscribe(info=>{
          this.route.navigate(['/admin/dashbord'])
          this.secmessagepass=" mot de passe mettre à jour avec succès "


        },(err:HttpErrorResponse)=>{
          this.errmessagepass=err.error
          // this.old=""

        })

      }


}
