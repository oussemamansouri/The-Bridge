import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';
@Component({
  selector: 'app-detailsmoderateur',
  templateUrl: './detailsmoderateur.component.html',
  styleUrls: ['./detailsmoderateur.component.scss']
})
export class DetailsmoderateurComponent implements OnInit {
  id: string = '';
  dataobject:any
  messageerr=''
  imagepath:any='http://localhost:3000/'
  constructor(private route:ActivatedRoute,private ds:DataService) {
    this.route.params.subscribe((params: Params) => this.id = params['id']);

    this.ds.getonemoderateur(this.id).subscribe(response=>this.dataobject=response,(err:HttpErrorResponse)=>{
      console.log(err)
      this.messageerr="we dont't found this moderateur in our database"})
    
   }
  ngOnInit(): void {
  }

}
