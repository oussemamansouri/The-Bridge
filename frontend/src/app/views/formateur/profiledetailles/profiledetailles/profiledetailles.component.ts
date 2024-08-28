import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-profiledetailles',
  templateUrl: './profiledetailles.component.html',
  styleUrls: ['./profiledetailles.component.scss']
})
export class ProfiledetaillesComponent implements OnInit {
  id: string = ''; // ID of the formateur to fetch
  cv: any; // CV file information (not used directly in this component)
  dataobject: any; // Object to store formateur details
  messageerr: string = ''; // Error message in case of an error
  imagepath: any = 'http://localhost:3000/'; // Base URL for images
  cvpathe: any = 'http://localhost:3000/'; // Base URL for CV files

  constructor(private route: ActivatedRoute, private ds: DataService) {
    // Retrieve the formateur ID from the route parameters
    this.route.params.subscribe((params: Params) => this.id = params['id']);

    // Fetch the formateur details using the ID from the route
    this.ds.getoneformateur(this.id).subscribe(
      response => this.dataobject = response, // Assign the response data to dataobject
      (err: HttpErrorResponse) => {
        console.log(err); // Log the error to the console
        this.messageerr = "We don't find this student in our database"; // Set the error message
      }
    );
  }

  ngOnInit(): void {
    // Initialization logic can be added here if needed
  }

  // Method to open the CV in a new tab
  openCV() {
    window.open(this.cvpathe + this.dataobject.cv, '_blank');
  }

  // Method to download the CV
  downloadCV() {
    const link = document.createElement('a'); // Create an <a> element
    link.href = this.cvpathe + this.dataobject.cv; // Set the href to the CV file path
    link.download = this.dataobject.cv; // Set the download attribute to the CV file name
    link.click(); // Programmatically click the <a> element to trigger the download
  }
}
