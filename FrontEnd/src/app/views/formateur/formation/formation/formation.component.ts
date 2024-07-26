import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {

  dataArray:any=[]
  dataformation={
    username:'',
    firstname:'',
    lastname:'',
    tel:0,
    email:'',
    id:''
  }

  messagesuccess=''
  constructor(private ds:DataService,private route:Router) {

    this.ds.getAllformation().subscribe(data=>{
      console.log(data)
      this.dataArray=data
    })
      
  }
   

  ngOnInit(): void {
  }

  delete(id:any,i:number){
    this.ds.deleteformation(id).subscribe(response=>{
      console.log(response)
      this.dataArray.splice(i,1)
    })
  }


  getdata(username:string,firstname:string,lastname:string,tel:number,email:string,id:any){
    this.messagesuccess=''
    this.dataformation.username=username
    this.dataformation.firstname=firstname
    this.dataformation.lastname=lastname
    this.dataformation.tel=tel
    this.dataformation.email=email
    this.dataformation.id=id
   console.log(this.dataformation)
  }

  updatenewformation(f: any) {
    let data = f.value;
    this.ds.updateformation(this.dataformation.id, data).subscribe(
      (response) => {
        console.log(response);
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.dataformation.id);
  
        this.dataArray[indexId].username = data.username;
        this.dataArray[indexId].firstname = data.firstname;
        this.dataArray[indexId].lastname = data.lastname;
        this.dataArray[indexId].tel = data.tel;
        this.dataArray[indexId].email = data.email;
  
        this.messagesuccess = `Les informations du formation ${this.dataArray[indexId].firstname} ont été mises à jour avec succès.`;
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
