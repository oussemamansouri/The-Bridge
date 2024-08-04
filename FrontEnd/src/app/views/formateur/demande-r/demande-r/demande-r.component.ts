import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-demande-r',
  templateUrl: './demande-r.component.html',
  styleUrls: ['./demande-r.component.scss']
})
export class DemandeRComponent implements OnInit {
  demandesParticipation: any[] = [];
  profile:any
  helper= new JwtHelperService
  successMessage: string = ''; // Variable pour le message de succès
  successClass: string = '';    // Classe CSS pour le message de succès
  dangerMessage: string = '';   // Variable pour le message de danger
  dangerClass: string = '';     // Classe CSS pour le message de danger
  imagepath: any = 'http://localhost:3000/';
  dataArray:any=[]
  constructor(private ds: DataService) { }


    ngOnInit(): void {
      const id = this.getId();
      this.ds.getoneformateur(id).subscribe(data => {
        this.profile = data;
        console.log(this.profile);
      });
      this.getDemandesParticipation();

      this.ds.getAllformateur().subscribe(data=>{
        console.log(data)
        this.dataArray=data
      })

    }
    getId():number{
      let token:any=localStorage.getItem('token')
     let decodedtoken:any=this.helper.decodeToken(token)
      return decodedtoken.id
    }

    accepterRequest(FormateurId: number, formationId: number) {
      this.ds.accepterRequest(FormateurId, formationId, this.getId()).subscribe(
        res => {
          this.successMessage = 'La demande a été acceptée avec succès.';
          this.successClass = 'alert-success'; // Ajoutez ici la classe CSS pour le message de succès
          this.ngOnInit();
        },
        error => {
          this.dangerMessage = 'Une erreur s\'est produite lors de l\'acceptation de la demande.';
          this.dangerClass = 'alert-danger'; // Ajoutez ici la classe CSS pour le message de danger
        }
      );
    }
    
    refuserRequest(FormateurId: number, formationId: number) {
      this.ds.refuserRequest(FormateurId, formationId, this.getId()).subscribe(
        res => {
          this.successMessage = 'La demande a été refusée avec succès.';
          this.successClass = 'alert-success'; // Ajoutez ici la classe CSS pour le message de succès
          this.ngOnInit();
        },
        error => {
          this.dangerMessage = 'Une erreur s\'est produite lors du refus de la demande.';
          this.dangerClass = 'alert-danger'; // Ajoutez ici la classe CSS pour le message de danger
        }
      );
    }


  getDemandesParticipation() {
    // Remplacer formateurId par l'ID du formateur concerné
    const id = this.getId();
    this.ds.getDemandesParticipation(id)
      .subscribe(
        (data) => {
          this.demandesParticipation = data;
          console.log('Demandes de participation:', this.demandesParticipation);
        },
        (error) => {
          console.error('Erreur lors de la récupération des demandes de participation:', error);
        }
      );
  }
  navigateToProfile(Formateur: any) {
    window.location.href = `/formateur/profiledetailles/${Formateur}`;
  }
}

