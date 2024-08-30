import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-detailsformation',
  templateUrl: './detailsformation.component.html',
  styleUrls: ['./detailsformation.component.scss']
})
export class DetailsformationComponent implements OnInit {

  id: string = ''; // Stores the ID of the formation fetched from the route parameters
  dataobject: any; // Holds the detailed data of the formation
  messageerr = ''; // Error message in case the formation is not found
  imagepath: any = 'http://localhost:3000/'; // Base URL for images

  constructor(private route: ActivatedRoute, private ds: DataService) {
    // Subscribe to route parameters to get the formation's ID
    this.route.params.subscribe((params: Params) => this.id = params['id']);

    // Fetch the formation's details using the ID
    this.ds.getoneformation(this.id).subscribe(
      response => this.dataobject = response, // Assign the fetched data to dataobject
      (err: HttpErrorResponse) => {
        console.log(err); // Log any errors
        this.messageerr = "We don't found this formation in our database"; // Display error message if formation is not found
      }
    );
  }

  ngOnInit(): void {
    // Additional initialization tasks can be performed here if needed
  }
}
