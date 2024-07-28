import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-addformateur',
  templateUrl: './addformateur.component.html',
  styleUrls: ['./addformateur.component.scss']
})
export class AddformateurComponent implements OnInit {

  constructor(private ds:DataService,private route:Router) { }

  ngOnInit(): void {
  }

  addformateur(f:any){
    let data=f.value 
    console.log(data)
    this.ds.addformateur(data).subscribe(data=>{
      this.route.navigate(['/moderator/consultformateur'])

    })

  }

}
