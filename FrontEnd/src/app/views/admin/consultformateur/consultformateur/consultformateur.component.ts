import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-consultformateur',
  templateUrl: './consultformateur.component.html',
  styleUrls: ['./consultformateur.component.scss']
})
export class ConsultformateurComponent implements OnInit {

  // Base path for images
  imagepath: any = 'http://localhost:3000/';

  // Array to hold the list of formateurs
  dataArray: any = [];

  // Object to hold formateur details for editing/updating
  dataformateur = {
    firstname: '',
    lastname: '',
    dob: 0,
    address: '',
    tel: 0,
    portfolio: '',
    statu: '',
    linkedin: '',
    niveau: '',
    experience: '',
    id: ''
  };

  // Variables to store success and error messages
  successMessage: string = '';
  errorMessage: string = '';

  messagesuccess = ''; // Variable to store success message for update

  // Constructor: Injects DataService for handling data operations and Router for navigation
  constructor(private ds: DataService, private route: Router) {

    // Fetch all formateurs and store them in dataArray
    this.ds.getAllformateur().subscribe(data => {
      console.log(data);
      this.dataArray = data;
    });
  }

  // Lifecycle hook: Executes when the component is initialized
  ngOnInit(): void {
  }

  // Method to delete a formateur by ID
  delete(id: any, i: number) {
    this.ds.deleteformateur(id).subscribe(
      () => {
        // On successful deletion, display success message and remove formateur from the list
        this.successMessage = "Le formateur a été supprimé avec succès.";
        this.errorMessage = ''; // Clear any error messages
        this.dataArray.splice(i, 1); // Remove the formateur from the dataArray
      },
      (error: any) => {
        // On error, display error message
        this.errorMessage = "Une erreur s'est produite lors de la suppression du formateur : " + error;
        this.successMessage = ''; // Clear any success messages
      }
    );
  }

  // Method to populate formateur data in the form for editing
  getdata(firstname: string, lastname: string, dob: number, address: string, tel: number, portfolio: string, statu: string, linkedin: string, niveau: string, experience: string, id: any) {
    this.messagesuccess = ''; // Clear success message
    this.dataformateur.firstname = firstname;
    this.dataformateur.lastname = lastname;
    this.dataformateur.dob = dob;
    this.dataformateur.address = address;
    this.dataformateur.tel = tel;
    this.dataformateur.portfolio = portfolio;
    this.dataformateur.statu = statu;
    this.dataformateur.linkedin = linkedin;
    this.dataformateur.niveau = niveau;
    this.dataformateur.experience = experience;
    this.dataformateur.id = id;
    console.log(this.dataformateur);
  }

  // Method to update a formateur's details
  updatenewformateur(f: any) {
    let data = f.value;
    this.ds.updateformateur(this.dataformateur.id, data).subscribe(
      (response) => {
        console.log(response);

        // Find the index of the formateur being updated in dataArray
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.dataformateur.id);

        // Update the formateur's details in dataArray
        this.dataArray[indexId].firstname = data.firstname;
        this.dataArray[indexId].lastname = data.lastname;
        this.dataArray[indexId].dob = data.dob;
        this.dataArray[indexId].address = data.address;
        this.dataArray[indexId].tel = data.tel;
        this.dataArray[indexId].portfolio = data.portfolio;
        this.dataArray[indexId].statu = data.statu;
        this.dataArray[indexId].linkedin = data.linkedin;
        this.dataArray[indexId].niveau = data.niveau;
        this.dataArray[indexId].experience = data.experience;

        // Display success message after updating
        this.messagesuccess = `Les informations du formateur ${this.dataArray[indexId].firstname} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message); // Log any errors
      }
    );
  }

  // Method to navigate to the formateur's details page
  details(id: any) {
    this.route.navigate(['admin/detailsformateur/' + id]);
  }

}
