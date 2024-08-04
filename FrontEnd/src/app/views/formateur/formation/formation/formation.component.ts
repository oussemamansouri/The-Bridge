import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  profile: any;
  img: any;
  imagepath: any = 'http://localhost:3000/';
  detailsf: any;
  dataArray: any;
  dataformation = {
    titre: '',
    description: '',
    pointsf: 0,
    modeformation: '',
    besoin: '',
    domaine: '',
    id: '',
    FormateurId: ''
  };
  
  id: any;

  messagesuccess = '';
  deleteMessage: string = '';
  helper = new JwtHelperService();
  
  constructor(private ds: DataService, private route: Router) {}

  ngOnInit(): void {
    const id = this.getId(); // Récupérer l'ID du formateur à partir du token
    this.ds.getAllFormationByFormateur(id).subscribe(data => {
      this.dataArray = data;
      console.log(this.dataArray);
    });
  }



  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }



  delete(id: any, i: number) {
    this.ds.deleteformation(id).subscribe(response => {
      console.log(response);
      this.dataArray.splice(i, 1);
      // Assigner le message de suppression réussie à la variable
      this.deleteMessage = "La formation a été supprimée avec succès.";
    });
  }


  getdata(titre:string,description:string,pointsf:number,modeformation:string,besoin:string,domaine:string,id:any,FormateurId:any){
    this.messagesuccess=''
    this.dataformation.titre=titre
    this.dataformation.description=description
    this.dataformation.pointsf=pointsf
    this.dataformation.modeformation=modeformation
    this.dataformation.besoin=besoin
    this.dataformation.domaine=domaine
    this.dataformation.id=id
    this.dataformation.FormateurId=FormateurId
   console.log(this.dataformation)
  }

  updatenewformation(f: any) {
    let data = f.value;
    this.ds.updateformation(this.dataformation.id, data).subscribe(
      (response) => {
        console.log(response);
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.dataformation.id);

        this.dataArray[indexId].titre = data.titre;
        this.dataArray[indexId].description = data.description;
        this.dataArray[indexId].pointsf = data.pointsf;
        this.dataArray[indexId].modeformation = data.modeformation;
        this.dataArray[indexId].besoin = data.besoin;
        this.dataArray[indexId].domaine = data.domaine;

        this.messagesuccess = `Les informations du Formation ${this.dataArray[indexId].titre} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }



  details(id:any){
    this.route.navigate(['formateur/detailsformation/'+id])
  }



}







// constructor(private ds:DataService,private route:Router) {
//   // // Récupérer l'ID du formateur à partir de la session ou de tout autre endroit approprié
//   // const FormateurId = 'id'; // Remplacez 'ID_DU_FORMATEUR' par l'ID réel du formateur
//   // this.ds.getAllFormationByFormateur(FormateurId).subscribe(data=>{
//   //   this.dataArray=data;
//   // });
// }