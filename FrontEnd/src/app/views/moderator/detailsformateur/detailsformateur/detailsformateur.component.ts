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
  cv: any; // Holds the CV data of the formateur (instructor)
  id: string = ''; // Stores the ID of the formateur fetched from the route parameters
  dataobject: any; // Holds the formateur's detailed data
  messageerr = ''; // Error message in case the formateur is not found
  imagepath: any = 'http://localhost:3000/'; // Base URL for images
  cvpathe: any = 'http://localhost:3000/'; // Base URL for CV files

  constructor(private route: ActivatedRoute, private ds: DataService) {
    // Subscribe to route parameters to get the formateur's ID
    this.route.params.subscribe((params: Params) => this.id = params['id']);

    // Fetch the formateur's details using the ID
    this.ds.getoneformateur(this.id).subscribe(
      response => this.dataobject = response, // Assign the fetched data to dataobject
      (err: HttpErrorResponse) => {
        console.log(err); // Log any errors
        this.messageerr = "We don't found this student in our database"; // Display error message if formateur is not found
      }
    );
  }

  ngOnInit(): void {
    // Additional initialization tasks can be performed here
  }

  // Method to open the CV in a new browser tab
  openCV() {
    window.open(this.cvpathe + this.dataobject.cv, '_blank');
  }

  // Method to download the CV
  downloadCV() {
    const link = document.createElement('a'); // Create an anchor element
    link.href = this.cvpathe + this.dataobject.cv; // Set the href to the CV's URL
    link.download = this.dataobject.cv; // Set the download attribute with the CV's filename
    link.click(); // Programmatically click the link to trigger the download
  }
}
