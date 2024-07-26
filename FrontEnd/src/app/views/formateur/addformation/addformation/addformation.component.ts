import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-addformation',
  templateUrl: './addformation.component.html',
  styleUrls: ['./addformation.component.scss']
})
export class AddformationComponent implements OnInit {

  constructor(private ds:DataService,private route:Router) { }

  ngOnInit(): void {
  }

  addformation(f:any){
    let data=f.value 
    console.log(data)
    this.ds.addformation(data).subscribe(data=>{
      this.route.navigate(['/formateur/formation'])

    })

  }

}
