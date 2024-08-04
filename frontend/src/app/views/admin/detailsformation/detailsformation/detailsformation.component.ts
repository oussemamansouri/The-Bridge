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
  id: string = '';
  dataobject: any;
  messageerr: string = '';
  imagepath: string = 'http://localhost:3000/';

  constructor(private route: ActivatedRoute, private ds: DataService) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log('ID from route params:', this.id); // Log the ID from route parameters

      this.ds.getoneformation(this.id).subscribe(
        response => {
          this.dataobject = response;
          console.log('Data object received:', this.dataobject); // Log the received data object
        },
        (err: HttpErrorResponse) => {
          console.error('Error occurred:', err); // Log the error
          this.messageerr = "we don't found this formation in our database";
        }
      );
    });
  }

  ngOnInit(): void {}
}
