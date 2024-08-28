import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-consultmoderateur',
  templateUrl: './consultmoderateur.component.html',
  styleUrls: ['./consultmoderateur.component.scss']
})
export class ConsultmoderateurComponent implements OnInit {

  // Array to hold the list of moderators fetched from the service
  dataArray: any = []

  // Object to store the current moderator's details
  datamoderateur = {
    username: '',
    firstname: '',
    lastname: '',
    tel: 0,
    email: '',
    id: ''
  }

  // Messages to display success or error feedback to the user
  successMessage: string = '';
  errorMessage: string = '';
  messagesuccess: string = '';

  // Base path for the images associated with moderators
  imagepath: any = 'http://localhost:3000/'

  // Injecting the DataService and Router services
  constructor(private ds: DataService, private route: Router) {

    // Fetch all moderators on component initialization
    this.ds.getAllmoderateur().subscribe(data => {
      this.dataArray = data
    })

  }

  // Lifecycle hook that gets called after the component's view has been initialized
  ngOnInit(): void {
  }

  // Method to delete a moderator by ID
  delete(id: any, i: number) {
    this.ds.deletemoderateur(id).subscribe(
      () => {
        this.successMessage = "Le moderateur a été supprimé avec succès.";
        this.errorMessage = ''; // Reset the error message
        this.dataArray.splice(i, 1); // Remove the deleted moderator from the array
      },
      (error: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la suppression du moderateur : " + error;
        this.successMessage = ''; // Reset the success message
      }
    );
  }

  // Method to populate the form with the selected moderator's details
  getdata(username: string, firstname: string, lastname: string, tel: number, email: string, id: any) {
    this.messagesuccess = '' // Reset success message
    this.datamoderateur.username = username
    this.datamoderateur.firstname = firstname
    this.datamoderateur.lastname = lastname
    this.datamoderateur.tel = tel
    this.datamoderateur.email = email
    this.datamoderateur.id = id
    console.log(this.datamoderateur) // Log the moderator data for debugging
  }

  // Method to update the moderator with the new data
  updatenewmoderateur(f: any) {
    let data = f.value;
    this.ds.updatemoderateur(this.datamoderateur.id, data).subscribe(
      (response) => {
        console.log(response); // Log the response for debugging

        // Find the index of the moderator to be updated in the array
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.datamoderateur.id);

        // Update the moderator's details in the array
        this.dataArray[indexId].username = data.username;
        this.dataArray[indexId].firstname = data.firstname;
        this.dataArray[indexId].lastname = data.lastname;
        this.dataArray[indexId].tel = data.tel;
        this.dataArray[indexId].email = data.email;

        // Show success message after the update
        this.messagesuccess = `Les informations du moderateur ${this.dataArray[indexId].firstname} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message); // Log the error message for debugging
      }
    );
  }

  // Method to navigate to the details page of the selected moderator
  details(id: any) {
    this.route.navigate(['admin/detailsmoderateur/' + id])
  }

}
