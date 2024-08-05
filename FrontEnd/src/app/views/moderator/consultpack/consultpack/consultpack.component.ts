import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-consultpack',
  templateUrl: './consultpack.component.html',
  styleUrls: ['./consultpack.component.scss']
})
export class ConsultpackComponent implements OnInit {

  dataArray:any=[]
  datapack={
    titre:'',
    description:'',
    description1:'',
    description2:'',
    description3:'',
    prix:0,
    points:0,
    id:''
  }
  successMessage: string = '';
  errorMessage: string = '';
  messagesuccess=''
  imagepath:any='http://localhost:3000/'
  constructor(private ds:DataService,private route:Router) {

    this.ds.getAllpack().subscribe(data=>{
      this.dataArray=data
    })

  }


  ngOnInit(): void {
  }


  delete(id: any, i: number) {
    this.ds.deletepack(id).subscribe(
      () => {
        this.successMessage = "Le pack a été supprimé avec succès.";
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.dataArray.splice(i, 1);
      },
      (error: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la suppression du pack : " + error;
        this.successMessage = ''; // Réinitialiser le message de succès
      }
    );
  }


  getdata(titre:string,description:string,description1:string,description2:string,description3:string,prix:number,points:number,id:any){
    this.messagesuccess=''
    this.datapack.titre=titre
    this.datapack.description=description
    this.datapack.description1=description1
    this.datapack.description2=description2
    this.datapack.description3=description3
    this.datapack.prix=prix
    this.datapack.points=points
    this.datapack.id=id
   console.log(this.datapack)
  }

  updatenewpack(f: any) {
    let data = f.value;
    this.ds.updatepack(this.datapack.id, data).subscribe(
      (response) => {
        console.log(response);
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.datapack.id);

        this.dataArray[indexId].titre = data.titre;
        this.dataArray[indexId].description = data.description;
        this.dataArray[indexId].description1 = data.description1;
        this.dataArray[indexId].description2 = data.description2;
        this.dataArray[indexId].description3 = data.description3;
        this.dataArray[indexId].prix = data.prix;
        this.dataArray[indexId].points = data.points;

        this.messagesuccess = `Les informations du pack ${this.dataArray[indexId].titre} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
