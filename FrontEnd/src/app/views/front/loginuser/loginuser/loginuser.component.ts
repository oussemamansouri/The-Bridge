// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { NavigationEnd, Router } from '@angular/router';
// import { AuthadminService } from 'src/app/views/services/authadmin.service';
// import { AuthformateurService } from 'src/app/views/services/authformateur.service';
// import { AuthmoderateurService } from 'src/app/views/services/authmoderateur.service';
// import { AuthLoginService } from 'src/app/views/services/auth-login.service';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { DataService } from 'src/app/views/services/data.service';

// @Component({
//   selector: 'app-loginuser',
//   templateUrl: './loginuser.component.html',
//   styleUrls: ['./loginuser.component.scss']
// })
// export class LoginuserComponent implements OnInit {
//   profile : any
//   img:any
//   imagepath:any='http://localhost:3000/'
//   dataReceived: any;
//   messageError: any;

//   data:any;
//   errmessage:any
//   helper=new JwtHelperService

//   constructor(private auth:AuthLoginService,  private as: AuthadminService, private route: Router, private asf: AuthformateurService,private asm:AuthmoderateurService,private api:DataService) {
//     if(this.as.LoggedIn() === true){
//       this.route.navigate(['/admin/profile']);
//     }
//   }

//   ngOnInit(): void {
//     const id = this.getId(); // Appel de la méthode pour obtenir l'identifiant du modérateur
//     this.api.getoneformateur(id).subscribe(data => {
//       this.profile = data;
//       console.log(this.profile);
//     });
//   }

//   updateimage(event:any){
//     if (event.target.files.length > 0) {
//       const path = event.target.files[0];
//       const formData = new FormData();
//       formData.append('img', path)
//       this.api.updateaformateurimage(formData,this.getId()).subscribe(info=>this.ngOnInit())
//     }
//   }
//   onFileSelected(event: any) {
//     if (event.target.files.length > 0){
//       this.img = event.target.files[0]; // Assignez le fichier sélectionné à img
//       console.log(this.img);
//     }
//   }

//   getId():number{
//     let token:any=localStorage.getItem('token')
//    let decodedtoken:any=this.helper.decodeToken(token)
//     return decodedtoken.id
//   }


//   loginuser(f:any){
//     let body=f.value
//     this.auth.login(body).subscribe(res=>{
//       this.data=res
//       this.auth.savedata(this.data.token.token)
//       let decodeToken = this.helper.decodeToken(this.data.token.token)
//       // if (this.url){this.route.navigate([this.url])}

//       switch(decodeToken.role) {
//         case 'Admin':
//           this.route.navigate(['/admin'])
//           break;
//         case 'moderateur':
//           this.route.navigate(['/moderator'])
//           break;
//           case 'formateur':
//             this.route.navigate(['/formateur'])
//             break;
//         default:
//           this.route.navigate(['/login'])
//       }

//     },(err:HttpErrorResponse)=>this.errmessage=err.error)
//   }



//   register(f1: any) {
//     let data = f1.value;

//     this.asf.register(data).subscribe(
//       () => {
//         // Navigate to home route after successful registration
//         this.route.navigate(['/']).then(() => {
//           // Scroll to top after navigation
//           window.scrollTo(0, 0);
//         });
//       },
//       (err: HttpErrorResponse) => {
//         console.log(err);
//         // Handle error if needed
//       }
//     );
//   }
// }












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
















  import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { AuthformateurService } from 'src/app/views/services/authformateur.service';
import { AuthmoderateurService } from 'src/app/views/services/authmoderateur.service';
import { AuthLoginService } from 'src/app/views/services/auth-login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';
declare var $: any;

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.scss']
})
export class LoginuserComponent implements OnInit {
  profile : any
  img:any
  cv:any
  imagepath:any='http://localhost:3000/'
  dataReceived: any;
  messageError: any;

  data:any;
  errmessage:any
  helper=new JwtHelperService
  conditionsGeneralesModalVisible = false;
  constructor(private auth:AuthLoginService,  private as: AuthadminService, private route: Router, private asf: AuthformateurService,private asm:AuthmoderateurService,private api:DataService) {
    if(this.as.LoggedIn() === true){
      this.route.navigate(['/admin/profile']);
    }
  }

  ngOnInit(): void {
    const id = this.getId(); // Appel de la méthode pour obtenir l'identifiant du modérateur
    this.api.getoneformateur(id).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
    });
  }

  updateimage(event:any){
    if (event.target.files.length > 0) {
      const path = event.target.files[0];
      const formData = new FormData();
      formData.append('img', path)
      this.api.updateaformateurimage(formData,this.getId()).subscribe(info=>this.ngOnInit())
    }
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0){
      this.img = event.target.files[0]; // Assignez le fichier sélectionné à img
      console.log(this.img);
    }
  }

  onCVSelected(event: any) {
    if (event.target.files.length > 0) {
        this.cv = event.target.files[0]; // Stocke le fichier du CV
        console.log(this.cv);
    }
}

  getId():number{
    let token:any=localStorage.getItem('token')
   let decodedtoken:any=this.helper.decodeToken(token)
    return decodedtoken.id
  }


  loginuser(f: any) {
    let body = f.value;
    this.auth.login(body).subscribe(
      (res) => {
        this.data = res;
        this.auth.savedata(this.data.token.token);
        let decodeToken = this.helper.decodeToken(this.data.token.token);
        
        switch (decodeToken.role) {
          case 'Admin':
            this.route.navigate(['/admin']);
            break;
          case 'moderateur':
            this.route.navigate(['/moderator']);
            break;
          case 'formateur':
            this.route.navigate(['/formateur']);
            break;
          default:
            this.route.navigate(['/login']);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Mot de passe incorrect ou email non valide
          this.errmessage = "Email ou mot de passe incorrect";
        } else {
          // Gestion des autres erreurs
          this.errmessage = err.error;
        }
      }
    );
  }
  



  register(f1: any) {
    let data = f1.value;

    let formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('dob', data.dob);
    formData.append('img', this.img); // Image
    formData.append('portfolio', data.portfolio);
    formData.append('address', data.address);
    formData.append('email', data.email);
    formData.append('tel', data.tel);
    formData.append('password', data.password);
    formData.append('statu', data.statu);
    formData.append('niveau', data.niveau);
    formData.append('experience', data.experience);
    formData.append('linkedin', data.linkedin);
    formData.append('cv', this.cv); // CV

    this.asf.register(formData).subscribe(
        () => {
            // Navigate to home route after successful registration
            window.location.href = '/loginuser'
            
            });
        
        (err: HttpErrorResponse) => {
            console.log(err);
            // Handle error if needed
        }
   
}





openConditionsGeneralesModal() {
  this.conditionsGeneralesModalVisible = true;
  $('#conditionsGeneralesModal').modal('show');
}

closeConditionsGeneralesModal() {
  this.conditionsGeneralesModalVisible = false;
  $('#conditionsGeneralesModal').modal('hide');
}
}
