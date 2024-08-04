import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {
  myParticipation: any = [];
  myId: any;
  helper = new JwtHelperService;
  imagepath: any = 'http://localhost:3000/';
  dataArray: any = [];
  showConfirmationDialog = false;
  currentFormationId: any;
  currentReceiverId: any;
  currentIndex: any;
  successMessage: string = '';

  constructor(private ds: DataService, private route: Router) {
    this.ds.getAllformateur().subscribe(data => {
      console.log(data);
      this.dataArray = data;
    });
  }

  ngOnInit(): void {
    this.myId = this.getId();
    this.loadParticipations();
  }
  
  loadParticipations() {
    this.ds.getParticipation(this.myId).subscribe(data => {
      this.myParticipation = data;
      console.log(this.myParticipation)
    });
  }

  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  navigateToProfile(FormateurId: any) {
    window.location.href = `/formateur/profiledetailles/${FormateurId}`;
  }

  deleteParticipation(FormationId: any, ReceiverId: any, index: number) {
    this.currentFormationId = FormationId;
    this.currentReceiverId = ReceiverId;
    this.currentIndex = index;
    this.showConfirmationDialog = true;
  }

  onConfirm() {
    this.showConfirmationDialog = false;
    this.ds.ddeleteParticipation(this.getId(), this.currentFormationId, this.currentReceiverId).subscribe(
      res => {
        this.myParticipation.splice(this.currentIndex, 1); // Supprime l'élément de la liste
        this.successMessage = 'Suppression effectuée avec succès.';
      },
      err => {
        console.error('Erreur lors de la suppression de la participation', err);
      }
    );
  }

  onCancel() {
    this.showConfirmationDialog = false;
  }

  
}
