import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-detailsmoderateur',
  templateUrl: './detailsmoderateur.component.html',
  styleUrls: ['./detailsmoderateur.component.scss']
})
export class DetailsmoderateurComponent implements OnInit {
  id: string = ''; // Variable to store the moderator's ID from route parameters
  dataobject: any; // Variable to hold the moderator's data
  messageerr: string = ''; // Variable to hold error messages
  imagepath: any = 'http://localhost:3000/'; // Base URL for image paths

  constructor(private route: ActivatedRoute, private ds: DataService) {
    // Subscribe to route parameters to get the moderator's ID
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // Extract the ID from route parameters
      // Fetch the moderator details using the ID
      this.ds.getonemoderateur(this.id).subscribe(
        response => {
          this.dataobject = response; // On success, assign response data to dataobject
        },
        (err: HttpErrorResponse) => {
          console.log(err); // Log the error for debugging
          this.messageerr = "We don't find this moderator in our database"; // Error message
        }
      );
    });
  }

  ngOnInit(): void {
    // Component initialization logic if needed
  }
}
