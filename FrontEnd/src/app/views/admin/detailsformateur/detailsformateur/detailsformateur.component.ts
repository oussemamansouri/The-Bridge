import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-detailsformateur',
  templateUrl: './detailsformateur.component.html',
  styleUrls: ['./detailsformateur.component.scss']
})
export class DetailsformateurComponent implements OnInit {
  id: string = '';
  cv:any;
  dataobject:any
  messageerr=''
  imagepath:any='http://localhost:3000/'
  cvpathe:any='http://localhost:3000/'
  constructor(private route:ActivatedRoute,private ds:DataService) {
    this.route.params.subscribe((params: Params) => this.id = params['id']);

    this.ds.getoneformateur(this.id).subscribe(response=>this.dataobject=response,(err:HttpErrorResponse)=>{
      console.log(err)
      this.messageerr="we dont't found this student in our database"})
    
   }

  ngOnInit(): void {
  }

  openCV() {
    window.open(this.cvpathe + this.dataobject.cv, '_blank');
  }
  downloadCV() {
    const link = document.createElement('a');
    link.href = this.cvpathe + this.dataobject.cv;
    link.download = this.dataobject.cv;  // Ici, nous mettons juste le nom du fichier
    link.click();
  }
}
