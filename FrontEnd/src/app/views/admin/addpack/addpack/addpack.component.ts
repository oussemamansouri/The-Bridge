import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-addpack',
  templateUrl: './addpack.component.html',
  styleUrls: ['./addpack.component.scss']
})
export class AddpackComponent implements OnInit {

  // Constructor: Injects DataService for handling data operations and Router for navigation
  constructor(private ds: DataService, private route: Router) { }

  // Lifecycle hook: Executes when the component is initialized
  ngOnInit(): void {
  }

  // Method to add a new pack
  addpack(f: any) {
    // Extract the form data
    let data = f.value;

    // Log the data to the console (for debugging purposes)
    console.log(data);

    // Call the addpack method from the DataService and navigate to the 'consult pack' page upon success
    this.ds.addpack(data).subscribe(data => {
      this.route.navigate(['/admin/consultpack']);
    });
  }
}
