import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';


@Component({
  selector: 'app-addmoderateur',
  templateUrl: './addmoderateur.component.html',
  styleUrls: ['./addmoderateur.component.scss']
})
export class AddmoderateurComponent implements OnInit {

  constructor(private ds:DataService,private route:Router) { }

  ngOnInit(): void {
  }

  addmoderateur(f:any){
    let data=f.value 
    console.log(data)
    this.ds.addmoderateur(data).subscribe(data=>{
      this.route.navigate(['/admin/consultmoderateur'])

    })

  }
}
