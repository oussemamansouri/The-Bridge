// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { DataService } from 'src/app/views/services/data.service';

// @Component({
//   selector: 'app-addformation',
//   templateUrl: './addformation.component.html',
//   styleUrls: ['./addformation.component.scss']
// })
// export class AddformationComponent implements OnInit {
//   profile : any
//   id:any
//   img:any
//   imagepath:any='http://localhost:3000/'
//   messageSucces: string = ''; // Variable pour stocker le message de succès



//   helper= new JwtHelperService
//   constructor(private ds:DataService,private route:Router) { }

//   ngOnInit(): void {
//     const id = this.getId(); // Appel de la méthode pour obtenir l'identifiant du modérateur
//     this.ds.getoneformateur(id).subscribe(data => {
//       this.profile = data;
//       console.log(this.profile);
//     });
//   }

//   getId():number{
//     let token:any=localStorage.getItem('token')
//    let decodedtoken:any=this.helper.decodeToken(token)
//     return decodedtoken.id
//   }
//   onFileSelected(event: any) {
//     if (event.target.files.length > 0){
//       this.img = event.target.files[0]; // Assignez le fichier sélectionné à img
//       console.log(this.img);
//     }
//   }
  
//   addformation(f: any): void {
//     const formData = new FormData();
//     formData.append('titre', f.value.titre);
//     formData.append('description', f.value.description);
//     // formData.append('pointsf', f.value.pointsf);
//     formData.append('modeformation', f.value.modeformation);
//     formData.append('besoin', f.value.besoin);
//     formData.append('domaine', f.value.domaine);
  
//     // Vérifie si un fichier a été sélectionné pour le champ 'img'
//     if (this.img) {
//       formData.append('img', this.img); // Utilise l'image sélectionnée
//     } else {
//       // Si aucune image personnalisée n'a été sélectionnée, utilisez l'image par défaut
//       // Chargez l'image par défaut correctement
//       // Assurez-vous que 'assets/image/formation.png' est accessible depuis l'application Angular
//       const defaultImageFile = new File(['assets/image/formation.png'], 'formation.png', { type: 'image/png' });
//       formData.append('img', defaultImageFile); // Ajoute l'image par défaut au formulaire
//     }
  
//     if (this.getId()) { // Vérification si l'identifiant est valide
//       this.ds.addformationparid(formData, this.getId()).subscribe(
//         (réponse) => {
//           console.log(réponse);
//           this.messageSucces = "La formation a été ajoutée avec succès !"; // Message de succès

//           this.route.navigate(['/formateur/formation']); // Redirection après l'ajout de la formation
//         },
//         (erreur: HttpErrorResponse) => {
//           console.error(erreur);
//           // Affichage d'un message d'erreur en cas d'échec de l'ajout de la formation
//           console.error("Erreur lors de l'ajout de la formation : " + erreur.message);
//         }
//       );
//     } else {
//       console.error("Identifiant invalide");
//       // Affichage d'un message d'erreur si l'identifiant n'est pas valide
//       console.error("Identifiant invalide");
//     }
//   }
  


// }

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-addformation',
  templateUrl: './addformation.component.html',
  styleUrls: ['./addformation.component.scss']
})
export class AddformationComponent implements OnInit {
  profile: any;
  id: any;
  img: any;
  imagepath: any = 'http://localhost:3000/';
  messageSucces: string = ''; // Variable pour stocker le message de succès
  currentCategory: string = ''; // Ajout de cette variable pour le menu déroulant

  helper = new JwtHelperService();
  constructor(private ds: DataService, private route: Router) {}

  ngOnInit(): void {
    const id = this.getId(); // Appel de la méthode pour obtenir l'identifiant du modérateur
    this.ds.getoneformateur(id).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
    });
  }

  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.img = event.target.files[0]; // Assignez le fichier sélectionné à img
      console.log(this.img);
    }
  }

  addformation(f: any): void {
    const formData = new FormData();
    formData.append('titre', f.value.titre);
    formData.append('description', f.value.description);
    formData.append('modeformation', f.value.modeformation);
    formData.append('besoin', f.value.besoin);
    formData.append('domaine', f.value.domaine);

    if (this.img) {
      formData.append('img', this.img); // Utilise l'image sélectionnée
    } else {
      const defaultImageFile = new File(['assets/image/formation.png'], 'formation.png', { type: 'image/png' });
      formData.append('img', defaultImageFile); // Ajoute l'image par défaut au formulaire
    }

    if (this.getId()) {
      this.ds.addformationparid(formData, this.getId()).subscribe(
        (réponse) => {
          console.log(réponse);
          this.messageSucces = "La formation a été ajoutée avec succès !"; // Message de succès
          this.route.navigate(['/formateur/formation']); // Redirection après l'ajout de la formation
        },
        (erreur: HttpErrorResponse) => {
          console.error(erreur);
          console.error("Erreur lors de l'ajout de la formation : " + erreur.message);
        }
      );
    } else {
      console.error("Identifiant invalide");
    }
  }

  // Méthode pour manipuler le DOM et gérer les menus déroulants
  toggleDropdown(event: Event, category: string): void {
    event.stopPropagation();

    // Remove show class from current category
    const currentElement = document.querySelector(`.dropdown-submenu[aria-label="${this.currentCategory}"] > ul`);
    if (currentElement) {
      currentElement.classList.remove('show');
    }

    // Add show class to clicked category
    const clickedElement = document.querySelector(`.dropdown-submenu[aria-label="${category}"] > ul`);
    if (clickedElement) {
      clickedElement.classList.add('show');
    }

    this.currentCategory = category;
  }
}











