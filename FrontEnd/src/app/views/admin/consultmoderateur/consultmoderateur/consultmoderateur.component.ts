import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-consultmoderateur',
  templateUrl: './consultmoderateur.component.html',
  styleUrls: ['./consultmoderateur.component.scss']
})
export class ConsultmoderateurComponent implements OnInit {

  dataArray:any=[]
  datamoderateur={
    username:'',
    firstname:'',
    lastname:'',
    tel:0,
    email:'',
    id:''
  }
  successMessage: string = '';
errorMessage: string = '';
  messagesuccess=''
  imagepath:any='http://localhost:3000/'
  constructor(private ds:DataService,private route:Router) {

    this.ds.getAllmoderateur().subscribe(data=>{
      this.dataArray=data
    })

  }


  ngOnInit(): void {
  }


  delete(id: any, i: number) {
    this.ds.deletemoderateur(id).subscribe(
      () => {
        this.successMessage = "Le moderateur a été supprimé avec succès.";
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.dataArray.splice(i, 1);
      },
      (error: any) => {
        this.errorMessage = "Une erreur s'est produite lors de la suppression du moderateur : " + error;
        this.successMessage = ''; // Réinitialiser le message de succès
      }
    );
  }

  getdata(username:string,firstname:string,lastname:string,tel:number,email:string,id:any){
    this.messagesuccess=''
    this.datamoderateur.username=username
    this.datamoderateur.firstname=firstname
    this.datamoderateur.lastname=lastname
    this.datamoderateur.tel=tel
    this.datamoderateur.email=email
    this.datamoderateur.id=id
   console.log(this.datamoderateur)
  }

  updatenewmoderateur(f: any) {
    let data = f.value;
    this.ds.updatemoderateur(this.datamoderateur.id, data).subscribe(
      (response) => {
        console.log(response);
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.datamoderateur.id);

        this.dataArray[indexId].username = data.username;
        this.dataArray[indexId].firstname = data.firstname;
        this.dataArray[indexId].lastname = data.lastname;
        this.dataArray[indexId].tel = data.tel;
        this.dataArray[indexId].email = data.email;

        this.messagesuccess = `Les informations du moderateur ${this.dataArray[indexId].firstname} ont été mises à jour avec succès.`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }



  details(id:any){
    this.route.navigate(['admin/detailsmoderateur/'+id])
  }



}
