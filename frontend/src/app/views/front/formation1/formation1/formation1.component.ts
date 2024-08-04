import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthLoginService } from 'src/app/views/services/auth-login.service';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-formation1',
  templateUrl: './formation1.component.html',
  styleUrls: ['./formation1.component.scss']
})
export class Formation1Component implements OnInit {
  dataArray: any = [];
  myId: any;
  formations: any=[] ;
  helper = new JwtHelperService();
  messagesuccess = '';
  imagepath: any = 'http://localhost:3000/';
  demandeEnvoyee: boolean = false;
  profile: any;
  selectedCategory: string = 'Toute Formations';
  categoryMenuVisible: boolean = false;
  searchQuery: string = '';
  searchResults: any[] = [];
  noResults!: TemplateRef<NgIfContext<boolean>> | null;

  constructor(private ds: DataService, private route: Router, private asf: AuthLoginService) {
    // Récupérer les formations dans le constructeur
    this.ds.getAllformation().subscribe(data => {
      this.formations = data;
        // Initialiser les résultats de recherche
        this.searchResults = this.formations;
    });

    // Récupérer les informations du formateur dans le constructeur
  }

  ngOnInit(): void {
    this.myId = this.getId();
    this.ds.getoneformateur(this.myId).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
    });
   
    this.formations
    this.updateDemandesEnvoyees();
  }

  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  loadFormations(): void {
    this.ds.getAllformation().subscribe(data => {
      this.formations = data;
      this.updateDemandesEnvoyees();
    });
  }



  envoyerDemande(FormateurId: number, FormationId: number): void {
    if (!this.asf.logedin()) {
      console.error('Erreur: Le formateur n\'est pas connecté à son compte.');
      window.location.href = '/loginuser'; // Recharge la page en naviguant vers la même URL
      return;
    }

    // Utiliser les informations du profil du formateur stockées dans this.profile
    const pointsFormateur = this.profile.points;

    // Comparer le nombre de points
    if (pointsFormateur > 20) {
      // Si le formateur a plus de 20 points, envoyer la demande
      this.ds.envoyerDemande(this.myId, FormationId, FormateurId).subscribe(
        response => {
          console.log('Demande envoyée avec succès!', response);})
  
    // Après avoir envoyé la demande avec succès, mettez à jour demandeEnvoyee et sauvegardez-la
    const formation = this.formations.find((f: any) => f.id === FormationId);
    if (formation) {
      formation.demandeEnvoyee = true;
      this.saveDemandesEnvoyees(); // Sauvegarde de l'état mise à jour
      
    }
  }
}
  
  saveDemandesEnvoyees(): void {
    const demandes = this.formations
      .filter((formation: any) => formation.demandeEnvoyee)
      .map((formation: any) => formation.id);
    localStorage.setItem('demandesEnvoyees', JSON.stringify(demandes));
  }
  
  updateDemandesEnvoyees(): void {
    const demandesEnvoyees = JSON.parse(localStorage.getItem('demandesEnvoyees') || '[]');
    this.formations.forEach((formation: any) => {
      formation.demandeEnvoyee = demandesEnvoyees.includes(formation.id);
    });
  }
  
  navigateToProfile(FormateurId: any) {
    window.location.href = `/formateur/profiledetailles/${FormateurId}`;
  }

  

  toggleCategoryMenu() {
    this.categoryMenuVisible = !this.categoryMenuVisible;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categoryMenuVisible = false;
  }

  search() {
    const query = this.searchQuery.toLowerCase();
    this.searchResults = this.formations.filter((formation: { titre: string; description: string; domaine: string; }) =>
      formation.titre.toLowerCase().includes(query) ||
      formation.description.toLowerCase().includes(query) ||
      formation.domaine.toLowerCase().includes(query)
    );
  
    // Vérifier si aucun résultat n'a été trouvé
    if (this.searchResults.length === 0) {
      // Ajouter un message pour indiquer qu'aucune formation n'a été trouvée
      this.messagesuccess = 'Aucune formation trouvée pour votre recherche.';
    } else {
      // Réinitialiser le message de succès s'il y a des résultats
      this.messagesuccess = '';
    }
  }
  
  
}














// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { AuthLoginService } from 'src/app/views/services/auth-login.service';
// import { DataService } from 'src/app/views/services/data.service';

// @Component({
//   selector: 'app-formation1',
//   templateUrl: './formation1.component.html',
//   styleUrls: ['./formation1.component.scss']
// })
// export class Formation1Component implements OnInit {
//   dataArray: any = [];
//   myId: any;
//   formations: any;
//   helper = new JwtHelperService();
//   messagesuccess = '';
//   imagepath: any = 'http://localhost:3000/';
//   demandeEnvoyee: boolean = false;
//   profile: any; // Variable pour stocker les informations du formateur

//   selectedCategory: string = 'Toute Formations';
//   categoryMenuVisible: boolean = false;
//   searchQuery: string = '';
//   searchResults: any[] = [];
//   formationss: any[] = []


//   constructor(private ds: DataService, private route: Router, private asf: AuthLoginService) {
//     this.ds.getAllformation().subscribe(data => {
//       this.formations = data;
//     });

//     // Récupérer les informations du formateur dans le constructeur
   
//   }

//   ngOnInit(): void {
//     this.myId = this.getId();
//     this.ds.getoneformateur(this.myId).subscribe(data => {
//       this.profile = data;
//       console.log(this.profile);
//     });
//     this.loadFormations();

//      this.formations
//   }

//   getId(): number {
//     let token: any = localStorage.getItem('token');
//     let decodedtoken: any = this.helper.decodeToken(token);
//     return decodedtoken.id;
//   }

//   loadFormations(): void {
//     this.ds.getAllformation().subscribe(data => {
//       this.formations = data;
//       this.updateDemandesEnvoyees();
//     });
//   }

  // envoyerDemande(FormateurId: number, FormationId: number): void {
  //   if (!this.asf.logedin()) {
  //     console.error('Erreur: Le formateur n\'est pas connecté à son compte.');
  //     window.location.href = '/loginuser'; // Recharge la page en naviguant vers la même URL
  //     return;
  //   }

  //   // Utiliser les informations du profil du formateur stockées dans this.profile
  //   const pointsFormateur = this.profile.points;

  //   // Comparer le nombre de points
  //   if (pointsFormateur > 20) {
  //     // Si le formateur a plus de 20 points, envoyer la demande
  //     this.ds.envoyerDemande(this.myId, FormationId, FormateurId).subscribe(
  //       response => {
  //         console.log('Demande envoyée avec succès!', response);
  //         const formation = this.formations.find((f: any) => f.id === FormationId);
  //         if (formation) {
  //           formation.demandeEnvoyee = true;
  //           this.saveDemandesEnvoyees();
  //         }
  //       },
  //       error => {
  //         console.error('Erreur lors de l\'envoi de la demande:', error);
  //       }
  //     );
  //   } else {
  //     // Rediriger vers la page de pack si le formateur a moins de 20 points
  //     window.location.href = '/tarifs';
  //   }
  // }

//   saveDemandesEnvoyees(): void {
//     const demandes = this.formations
//       .filter((formation: any) => formation.demandeEnvoyee)
//       .map((formation: any) => formation.id);
//     localStorage.setItem('demandesEnvoyees', JSON.stringify(demandes));
//   }

//   updateDemandesEnvoyees(): void {
//     const demandesEnvoyees = JSON.parse(localStorage.getItem('demandesEnvoyees') || '[]');
//     this.formations.forEach((formation: any) => {
//       formation.demandeEnvoyee = demandesEnvoyees.includes(formation.id);
//     });
//   }
//   navigateToProfile(FormateurId: any) {
//     window.location.href = `/formateur/profiledetailles/${FormateurId}`;
//   }

  



// }
































  // envoyerDemande(FormateurId: number, FormationId: number): void {
  //   if (!this.asf.logedin()) {
  //     console.error('Erreur: Le formateur n\'est pas connecté à son compte.');
  //     window.location.href = '/loginuser'; // Recharge la page en naviguant vers la même URL
  //     return;
  //   }

  //   // Utiliser les informations du profil du formateur stockées dans this.profile
  //   const pointsFormateur = this.profile.points;

  //   // Comparer le nombre de points
  //   if (pointsFormateur > 20) {
  //     // Si le formateur a plus de 20 points, envoyer la demande
  //     this.ds.envoyerDemande(this.myId, FormationId, FormateurId).subscribe(
  //       response => {
  //         console.log('Demande envoyée avec succès!', response);
  //         const formation = this.formations.find((f: any) => f.id === FormationId);
  //         if (formation) {
  //           formation.demandeEnvoyee = true;
  //           this.saveDemandesEnvoyees();
  //         }
  //       },
  //       error => {
  //         console.error('Erreur lors de l\'envoi de la demande:', error);
  //       }
  //     );
  //   } else {
  //     // Rediriger vers la page de pack si le formateur a moins de 20 points
  //     window.location.href = '/tarifs';
  //   }
  // }
