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


  // selectedFormation: any;

  // showDetails(formationTitle: string) {
  //   // Récupérer les détails de la formation en fonction du titre
  //   this.selectedFormation = this.getFormationDetails(formationTitle);

  //   // Afficher la boîte modale
  //   $('#formationModal').modal('show');

  // }

  // getFormationDetails(formationTitle: string): any {
    
  //   if (formationTitle === 'Développement Web') {
  //     return {
  //       title: 'Développement Web',
  //       image: 'assets/formation/dev.jpg',
  //       description: 'Formation sur le développement web.',
  //       price: '$99'
  //     };
  //   } else if (formationTitle === 'Formation en Cyber Sécurité') {
  //     return {
  //       title: 'Formation en Cyber Sécurité',
  //       image: 'assets/formation/cyber-securite.jpeg',
  //       description: 'Formation sur la cybersécurité.',
  //       price: '$149'
  //     };
  //   } else {
  //     return null;
  //   }
  // }


