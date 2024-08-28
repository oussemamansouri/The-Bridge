import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-addmoderateur',
  templateUrl: './addmoderateur.component.html',
  styleUrls: ['./addmoderateur.component.scss']
})
export class AddmoderateurComponent implements OnInit {

  // Constructor: Injects DataService for handling data operations and Router for navigation
  constructor(private ds: DataService, private route: Router) { }

  // Lifecycle hook: Executes when the component is initialized
  ngOnInit(): void {
  }

  // Method to add a new moderator
  addmoderateur(f: any) {
    // Extract the form data
    let data = f.value;

    // Log the data to the console (for debugging purposes)
    console.log(data);

    // Call the addmoderateur method from the DataService and navigate to the 'consult moderator' page upon success
    this.ds.addmoderateur(data).subscribe(data => {
      this.route.navigate(['/admin/consultmoderateur']);
    });
  }
}
