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
  id:any

  helper= new JwtHelperService


  constructor(private api:DataService,private route:Router) { }

  ngOnInit(): void {
    const id = this.getId(); // Appel de la méthode pour obtenir l'identifiant du modérateur
    this.api.getonemoderateur(id).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
    });
  }
  

  updateimage(event:any){
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path)
      this.api.updateamoderatorimage(formData,this.getId()).subscribe(info=>this.ngOnInit())
    }
  }
  getId():number{
    let token:any=localStorage.getItem('token')
   let decodedtoken:any=this.helper.decodeToken(token)
    return decodedtoken.id
  }

  update(f:any){
    let body=f.value
    this.api.updatemoderator(body,this.getId()).subscribe(info=>{
      console.log(info)
      this.api.getonemoderateur(this.id).subscribe(data=>{
        {this.secmessage="Mise à jour terminée avec succès"
      this.ngOnInit()}
      })

    },(err:HttpErrorResponse)=>{
      this.errmessage=err.error
    })
      }
      updatepassword(f: any) {
        let body = f.value;
        this.api.updatepasswordmoderateur(body, this.getId()).subscribe(
          info => {
            // Rediriger vers le profil
            // this.route.navigate(['/moderator/profile']);
            // Afficher le message de succès
            this.secmessagepass = "Mot de passe mis à jour avec succès.";
          },
          (err: HttpErrorResponse) => {
            // En cas d'erreur, afficher le message d'erreur
            this.errmessagepass = "Le champ 'ancien mot de passe' est obligatoire et ne peut pas être vide.";
            // this.old="";
          }
        );
      }
      
      // updatepassword(f:any){
      //   let body=f.value
      //    this.api.updatepasswordmoderateur(body,this.getId()).subscribe(info=>{
      //     this.route.navigate(['/moderator/profile'])
      //     this.secmessagepass=" mot de passe mettre à jour avec succès "


      //   },(err:HttpErrorResponse)=>{
      //     this.errmessagepass=err.error
      //     // this.old=""

      //   })

      // }

}
