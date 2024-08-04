import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-consultformation',
  templateUrl: './consultformation.component.html',
  styleUrls: ['./consultformation.component.scss']
})
export class ConsultformationComponent implements OnInit {

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
  successMessage: string = '';
errorMessage: string = '';

  messagesuccess=''
  imagepath:any='http://localhost:3000/'
  constructor(private ds:DataService,private route:Router) {

    this.ds.getAllformation().subscribe(data=>{
      this.dataArray=data
    })

  }


  ngOnInit(): void {
  }

  delete(id: any, i: number) {
    this.ds.deleteformation(id).subscribe(
      () => {
        this.successMessage = "La formation a été supprimé avec succès.";
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.dataArray.splice(i, 1);
      },
      (error: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la suppression du formation : " + error;
        this.successMessage = ''; // Réinitialiser le message de succès
      }
    );
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
    this.route.navigate(['admin/detailsformation/'+id])
  }



}
