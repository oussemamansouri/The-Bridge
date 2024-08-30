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

  dataArray: any = []; // Array to hold the list of packs retrieved from the backend
  datapack = {
    titre: '',
    description: '',
    description1: '',
    description2: '',
    description3: '',
    prix: 0,
    points: 0,
    id: ''
  }; // Object to hold the data for the currently selected or updated pack
  successMessage: string = ''; // Message to display on successful operations
  errorMessage: string = ''; // Message to display in case of errors
  messagesuccess = ''; // Message to display after updating a pack
  imagepath: any = 'http://localhost:3000/'; // Base URL for images

  constructor(private ds: DataService, private route: Router) {
    // Fetch all packs on component initialization and assign to dataArray
    this.ds.getAllpack().subscribe(data => {
      this.dataArray = data;
    });
  }

  ngOnInit(): void {
    // Initialization logic can be added here if needed
  }

  // Method to delete a pack by ID
  delete(id: any, i: number) {
    this.ds.deletepack(id).subscribe(
      () => {
        // On successful deletion, update the success message and remove the pack from dataArray
        this.successMessage = "Le pack a été supprimé avec succès.";
        this.errorMessage = ''; // Clear the error message
        this.dataArray.splice(i, 1); // Remove the pack from the local array
      },
      (error: any) => {
        // In case of an error during deletion, update the error message
        this.errorMessage = "Une erreur s'est produite lors de la suppression du pack : " + error;
        this.successMessage = ''; // Clear the success message
      }
    );
  }

  // Method to populate the datapack object with the selected pack's data
  getdata(titre: string, description: string, description1: string, description2: string, description3: string, prix: number, points: number, id: any) {
    this.messagesuccess = ''; // Clear previous success messages
    this.datapack.titre = titre;
    this.datapack.description = description;
    this.datapack.description1 = description1;
    this.datapack.description2 = description2;
    this.datapack.description3 = description3;
    this.datapack.prix = prix;
    this.datapack.points = points;
    this.datapack.id = id;
    console.log(this.datapack); // Log the current state of datapack
  }

  // Method to update the selected pack's details
  updatenewpack(f: any) {
    let data = f.value; // Get form data
    this.ds.updatepack(this.datapack.id, data).subscribe(
      (response) => {
        console.log(response); // Log the response from the server
        // Find the index of the updated pack in dataArray
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.datapack.id);

        // Update the local dataArray with the new details
        this.dataArray[indexId].titre = data.titre;
        this.dataArray[indexId].description = data.description;
        this.dataArray[indexId].description1 = data.description1;
        this.dataArray[indexId].description2 = data.description2;
        this.dataArray[indexId].description3 = data.description3;
        this.dataArray[indexId].prix = data.prix;
        this.dataArray[indexId].points = data.points;

        // Display a success message after updating
        this.messagesuccess = `Les informations du pack ${this.dataArray[indexId].titre} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message); // Log any error messages
      }
    );
  }

}
