import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';
declare var $: any;


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  dataArray:any=[]
  dataformation={
    titre:'',
    description:'',
    pointsf:0,
    modeformation:'',
    besoin:'',
    domaine:'',
    id:'',
    FormateurId:''
  }

  messagesuccess=''
  imagepath:any='http://localhost:3000/'
  constructor(private ds:DataService,private route:Router) {

    this.ds.getAllformation().subscribe(data=>{
      this.dataArray=data
    })

  }

  ngOnInit(): void {
  }


  }


