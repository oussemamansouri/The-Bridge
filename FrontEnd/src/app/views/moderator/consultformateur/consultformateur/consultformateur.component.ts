import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-consultformateur',
  templateUrl: './consultformateur.component.html',
  styleUrls: ['./consultformateur.component.scss']
})
export class ConsultformateurComponent implements OnInit {
  dataArray:any=[]
  dataformateur={
    firstname:'',
    lastname:'',
    dob:0,
    address:'',
    tel:0,
    portfolio:'',
    statu:'',
    linkedin:'',
    niveau:'',
    experience:'',
    id:''
  }
  imagepath:any='http://localhost:3000/'
  messagesuccess=''
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private ds:DataService,private route:Router) {

    this.ds.getAllformateur().subscribe(data=>{
      console.log(data)
      this.dataArray=data
    })
      
  }
   

  ngOnInit(): void {
  }

  delete(id: any, i: number) {
    this.ds.deleteformateur(id).subscribe(
      () => {
        this.successMessage = "Le formateur a été supprimé avec succès.";
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.dataArray.splice(i, 1);
      },
      (error: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la suppression du formateur : " + error;
        this.successMessage = ''; // Réinitialiser le message de succès
      }
    );
  }


  getdata(firstname:string,lastname:string,dob:number,address:string,tel:number,portfolio:string,statu:string,linkedin:string,niveau:string,experience:string,id:any){
    this.messagesuccess=''
    this.dataformateur.firstname=firstname
    this.dataformateur.lastname=lastname
    this.dataformateur.dob=dob
    this.dataformateur.address=address
    this.dataformateur.tel=tel
    this.dataformateur.portfolio=portfolio
    this.dataformateur.statu=statu
    this.dataformateur.linkedin=linkedin
    this.dataformateur.niveau=niveau
    this.dataformateur.experience=experience
    this.dataformateur.id=id
   console.log(this.dataformateur)
  }

  updatenewformateur(f: any) {
    let data = f.value;
    this.ds.updateformateur(this.dataformateur.id, data).subscribe(
      (response) => {
        console.log(response);
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.dataformateur.id);
  
        this.dataArray[indexId].firstname = data.firstname;
        this.dataArray[indexId].lastname = data.lastname;
        this.dataArray[indexId].dob = data.dob;
        this.dataArray[indexId].address = data.address;
        this.dataArray[indexId].tel = data.tel;
        this.dataArray[indexId].portfolio = data.portfolio;
        this.dataArray[indexId].statu = data.statu;
        this.dataArray[indexId].linkedin = data.linkedin;
        this.dataArray[indexId].niveau = data.niveau;
        this.dataArray[indexId].experience = data.experience;
  
        this.messagesuccess = `Les informations du formateur ${this.dataArray[indexId].firstname} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  


  details(id:any){
    this.route.navigate(['moderator/detailsformateur/'+id])
  }

}
