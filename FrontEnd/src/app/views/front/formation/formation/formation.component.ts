import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  openmodal() {
    const modalDiv = document.getElementById('mymodal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
      document.body.classList.add('modal-open'); // Ajouter la classe au corps de la page
    }
  }

  closemodal() {
    const modalDiv = document.getElementById('mymodal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      document.body.classList.remove('modal-open'); // Retirer la classe du corps de la page
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
  constructor() { }

  ngOnInit(): void {
  }

}
