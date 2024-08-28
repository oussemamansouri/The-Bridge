import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-consultpack',
  templateUrl: './consultpack.component.html',
  styleUrls: ['./consultpack.component.scss']
})
export class ConsultpackComponent implements OnInit {

  // Array to hold the list of packs fetched from the service
  dataArray: any = []

  // Object to store the current pack's details
  datapack = {
    titre: '',
    description: '',
    description1: '',
    description2: '',
    description3: '',
    prix: 0,
    points: 0,
    id: ''
  }

  // Messages to display success or error feedback to the user
  successMessage: string = '';
  errorMessage: string = '';
  messagesuccess = ''

  // Base path for the images associated with packs
  imagepath: any = 'http://localhost:3000/'

  // Injecting the DataService and Router services
  constructor(private ds: DataService, private route: Router) {

    // Fetch all packs on component initialization
    this.ds.getAllpack().subscribe(data => {
      this.dataArray = data
    })

  }

  // Lifecycle hook that gets called after the component's view has been initialized
  ngOnInit(): void {
  }

  // Method to delete a pack by ID
  delete(id: any, i: number) {
    this.ds.deletepack(id).subscribe(
      () => {
        this.successMessage = "Le pack a été supprimé avec succès.";
        this.errorMessage = ''; // Reset the error message
        this.dataArray.splice(i, 1); // Remove the deleted pack from the array
      },
      (error: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la suppression du pack : " + error;
        this.successMessage = ''; // Reset the success message
      }
    );
  }

  // Method to populate the form with the selected pack's details
  getdata(titre: string, description: string, description1: string, description2: string, description3: string, prix: number, points: number, id: any) {
    this.messagesuccess = '' // Reset success message
    this.datapack.titre = titre
    this.datapack.description = description
    this.datapack.description1 = description1
    this.datapack.description2 = description2
    this.datapack.description3 = description3
    this.datapack.prix = prix
    this.datapack.points = points
    this.datapack.id = id
  }

  // Method to update the pack with the new data
  updatenewpack(f: any) {
    let data = f.value;
    this.ds.updatepack(this.datapack.id, data).subscribe(
      (response) => {
        console.log(response); // Log the response for debugging

        // Find the index of the pack to be updated in the array
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.datapack.id);

        // Update the pack's details in the array
        this.dataArray[indexId].titre = data.titre;
        this.dataArray[indexId].description = data.description;
        this.dataArray[indexId].description1 = data.description1;
        this.dataArray[indexId].description2 = data.description2;
        this.dataArray[indexId].description3 = data.description3;
        this.dataArray[indexId].prix = data.prix;
        this.dataArray[indexId].points = data.points;

        // Show success message after the update
        this.messagesuccess = `Les informations du pack ${this.dataArray[indexId].titre} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message); // Log the error message for debugging
      }
    );
  }

}
