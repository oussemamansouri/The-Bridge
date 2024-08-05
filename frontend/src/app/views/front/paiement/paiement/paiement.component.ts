import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  packDetails: any;
  errorMessage: any;
  profile: any;
  helper: any = new JwtHelperService();
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardHolderName: string = '';
  packPoints: any;

  constructor(private route: ActivatedRoute, private dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const packId = params['id'];
      if (packId) {
        this.dataService.getonepack(packId).subscribe(
          (data: any) => {
            this.packDetails = data;
            this.packPoints = data.points;
          },
          error => {
            this.errorMessage = 'Une erreur s\'est produite lors de la récupération des détails du pack.';
          }
        );
      } else {
        this.errorMessage = 'Aucun identifiant de pack n\'a été fourni.';
      }
    });

    const id = this.getId();
    this.dataService.getoneformateur(id).subscribe(data => {
      this.profile = data;
    });
  }

  getId(): number {
    let token: any = localStorage.getItem('token')
    let decodedtoken: any = this.helper.decodeToken(token)
    return decodedtoken.id
  }

  onSubmit(formateurId: number, points: number): void {
    // Vérifier si l'ID du formateur et le nombre de points du pack sont valides
    if (formateurId && points) {
      // Envoyer les données d'achat de points au backend
      this.dataService.buyPoints(formateurId, points).subscribe(
        response => {
          // Traitement de la réponse du backend (si nécessaire)
          console.log(response);
          // Afficher un message de confirmation
          this.showConfirmationMessage();
          // Recharger la page après avoir effectué le paiement
          window.location.reload();
        },
        error => {
          // Gérer les erreurs
          console.error(error);
        }
      );
    } else {
      console.error('Veuillez fournir un ID de formateur et un nombre de points valides.');
    }
  }
  

  showConfirmationMessage(): void {
    // Afficher un message de confirmation à l'utilisateur
    alert('Votre paiement a été traité avec succès. Nous vous remercions pour votre confiance.');
    alert('Merci pour votre paiement!');
    alert('Si vous avez des questions ou des préoccupations, n hésitez pas à nous contacter.');
    alert('Encore une fois, merci pour votre soutien!');

  }
  
//   showConfirmationMessage(): void {
//     // Afficher un message de confirmation à l'utilisateur
//     const confirmationAlert = document.createElement('div');
//     confirmationAlert.classList.add('alert', 'alert-success', 'fade', 'show');
//     confirmationAlert.setAttribute('role', 'alert');
//     confirmationAlert.textContent = 'Paiement effectué avec succès!';
  
//     // Ajouter la boîte d'alerte à l'élément body
//     document.body.appendChild(confirmationAlert);
  
//     // Masquer la boîte d'alerte après un certain délai (par exemple, 3 secondes)
//     setTimeout(() => {
//       confirmationAlert.classList.remove('show');
//       setTimeout(() => {
//         confirmationAlert.remove();
//       }, 500);
//     }, 3000);
//   }
 }
   
 
