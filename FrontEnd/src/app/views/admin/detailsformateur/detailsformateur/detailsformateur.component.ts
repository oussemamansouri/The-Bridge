import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-detailsformateur',
  templateUrl: './detailsformateur.component.html',
  styleUrls: ['./detailsformateur.component.scss']
})
export class DetailsformateurComponent implements OnInit {
  id: string = ''; // Variable to store the formateur's ID from the route parameters
  cv: any; // Variable to hold the CV data
  dataobject: any; // Variable to hold the formateur's data
  messageerr = ''; // Variable to hold error messages
  imagepath: any = 'http://localhost:3000/'; // Base URL for image paths
  cvpathe: any = 'http://localhost:3000/'; // Base URL for CV paths

  constructor(private route: ActivatedRoute, private ds: DataService) {
    // Subscribe to route parameters to get the formateur's ID
    this.route.params.subscribe((params: Params) => this.id = params['id']);

    // Fetch the formateur's details using the ID
    this.ds.getoneformateur(this.id).subscribe(
      response => this.dataobject = response, // On success, assign response data to dataobject
      (err: HttpErrorResponse) => {
        console.log(err); // Log error for debugging
        this.messageerr = "We don't find this formateur in our database"; // Error message
      }
    );
  }

  ngOnInit(): void {
    // Component initialization logic if needed
  }

  // Method to open the CV in a new tab
  openCV() {
    window.open(this.cvpathe + this.dataobject.cv, '_blank');
  }

  // Method to download the CV file
  downloadCV() {
    const link = document.createElement('a'); // Create a new link element
    link.href = this.cvpathe + this.dataobject.cv; // Set the URL for the CV file
    link.download = this.dataobject.cv; // Set the filename for the download
    link.click(); // Programmatically click the link to trigger the download
  }
}
