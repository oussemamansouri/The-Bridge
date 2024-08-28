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
  id: string = ''; // Variable to store the formation's ID from the route parameters
  dataobject: any; // Variable to hold the formation's data
  messageerr: string = ''; // Variable to hold error messages
  imagepath: string = 'http://localhost:3000/'; // Base URL for image paths

  constructor(private route: ActivatedRoute, private ds: DataService) {
    // Subscribe to route parameters to get the formation's ID
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // Extract the ID from route parameters
      console.log('ID from route params:', this.id); // Log the ID for debugging

      // Fetch the formation details using the ID
      this.ds.getoneformation(this.id).subscribe(
        response => {
          this.dataobject = response; // On success, assign response data to dataobject
          console.log('Data object received:', this.dataobject); // Log the received data for debugging
        },
        (err: HttpErrorResponse) => {
          console.error('Error occurred:', err); // Log the error for debugging
          this.messageerr = "We don't find this formation in our database"; // Error message
        }
      );
    });
  }

  ngOnInit(): void {
    // Component initialization logic if needed
  }
}
