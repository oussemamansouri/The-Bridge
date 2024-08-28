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

  id: string = ''; // ID of the formation to be displayed
  dataobject: any; // Object to hold formation details
  messageerr: string = ''; // Error message if formation is not found
  imagepath: string = 'http://localhost:3000/'; // Base path for images

  constructor(private route: ActivatedRoute, private ds: DataService) { }

  ngOnInit(): void {
    // Subscribe to route parameters to get the formation ID
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // Extract the ID from route parameters
      this.loadFormation(); // Load the formation details
    });
  }

  // Method to load formation details from the server
  loadFormation(): void {
    this.ds.getoneformation(this.id).subscribe(
      response => {
        this.dataobject = response; // Assign formation details to dataobject
      },
      (err: HttpErrorResponse) => {
        console.log(err); // Log error for debugging
        this.messageerr = "We couldn't find this formation in our database"; // Set error message
      }
    );
  }
}
