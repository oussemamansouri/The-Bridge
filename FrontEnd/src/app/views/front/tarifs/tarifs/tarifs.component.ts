import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-tarifs',
  templateUrl: './tarifs.component.html',
  styleUrls: ['./tarifs.component.scss']
})
export class TarifsComponent implements OnInit {
  dataArray:any=[]

  constructor(private ds:DataService,private route:Router) {

    this.ds.getAllpack().subscribe(data=>{
      this.dataArray=data
    })
  }

  ngOnInit(): void {
  }

}

