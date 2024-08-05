import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-addpack',
  templateUrl: './addpack.component.html',
  styleUrls: ['./addpack.component.scss']
})
export class AddpackComponent implements OnInit {

  constructor(private ds:DataService,private route:Router) { }

  ngOnInit(): void {
  }

  addpack(f:any){
    let data=f.value 
    console.log(data)
    this.ds.addpack(data).subscribe(data=>{
      this.route.navigate(['/moderator/consultpack'])

    })

  }

}
