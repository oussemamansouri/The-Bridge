import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-addformateur',
  templateUrl: './addformateur.component.html',
  styleUrls: ['./addformateur.component.scss']
})
export class AddformateurComponent implements OnInit {

  // Constructor: Injects DataService for handling data operations and Router for navigation
  constructor(private ds: DataService, private route: Router) { }

  // Lifecycle hook: Executes when the component is initialized
  ngOnInit(): void {
  }

  // Method to add a new formateur (instructor)
  addformateur(f: any) {
    // Extract the form data
    let data = f.value;

    // Log the data to the console (for debugging purposes)
    console.log(data);

    // Call the addformateur method from the DataService and navigate to the 'consult formateur' page upon success
    this.ds.addformateur(data).subscribe(data => {
      this.route.navigate(['/admin/consultformateur']);
    });
  }
}
