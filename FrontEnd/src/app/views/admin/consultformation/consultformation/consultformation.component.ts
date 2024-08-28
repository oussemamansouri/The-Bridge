import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-consultformation',
  templateUrl: './consultformation.component.html',
  styleUrls: ['./consultformation.component.scss']
})
export class ConsultformationComponent implements OnInit {

  // Array to hold the list of formations fetched from the service
  dataArray: any = []

  // Object to store the current formation's details
  dataformation = {
    titre: '',
    description: '',
    pointsf: 0,
    modeformation: '',
    besoin: '',
    domaine: '',
    id: '',
    FormateurId: ''
  }

  // Messages to display success or error feedback to the user
  successMessage: string = '';
  errorMessage: string = '';

  // Message to show success when updating a formation
  messagesuccess = ''

  // Base path for the images associated with formations
  imagepath: any = 'http://localhost:3000/'

  // Injecting the DataService and Router services
  constructor(private ds: DataService, private route: Router) {

    // Fetch all formations on component initialization
    this.ds.getAllformation().subscribe(data => {
      this.dataArray = data
    })

  }

  // Lifecycle hook that gets called after the component's view has been initialized
  ngOnInit(): void {
  }

  // Method to delete a formation by ID
  delete(id: any, i: number) {
    this.ds.deleteformation(id).subscribe(
      () => {
        this.successMessage = "La formation a été supprimé avec succès.";
        this.errorMessage = ''; // Reset the error message
        this.dataArray.splice(i, 1); // Remove the deleted formation from the array
      },
      (error: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la suppression du formation : " + error;
        this.successMessage = ''; // Reset the success message
      }
    );
  }

  // Method to populate the form with the selected formation's details
  getdata(titre: string, description: string, pointsf: number, modeformation: string, besoin: string, domaine: string, id: any, FormateurId: any) {
    this.messagesuccess = '' // Reset success message
    this.dataformation.titre = titre
    this.dataformation.description = description
    this.dataformation.pointsf = pointsf
    this.dataformation.modeformation = modeformation
    this.dataformation.besoin = besoin
    this.dataformation.domaine = domaine
    this.dataformation.id = id
    this.dataformation.FormateurId = FormateurId
    console.log(this.dataformation) // Log the formation data for debugging
  }

  // Method to update the formation with the new data
  updatenewformation(f: any) {
    let data = f.value;
    this.ds.updateformation(this.dataformation.id, data).subscribe(
      (response) => {
        console.log(response); // Log the response for debugging

        // Find the index of the formation to be updated in the array
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.dataformation.id);

        // Update the formation's details in the array
        this.dataArray[indexId].titre = data.titre;
        this.dataArray[indexId].description = data.description;
        this.dataArray[indexId].pointsf = data.pointsf;
        this.dataArray[indexId].modeformation = data.modeformation;
        this.dataArray[indexId].besoin = data.besoin;
        this.dataArray[indexId].domaine = data.domaine;

        // Show success message after the update
        this.messagesuccess = `Les informations du Formation ${this.dataArray[indexId].titre} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message); // Log the error message for debugging
      }
    );
  }

  // Method to navigate to the details page of the selected formation
  details(id: any) {
    this.route.navigate(['admin/detailsformation/' + id])
  }

}
