import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moderator-layout',
  templateUrl: './moderator-layout.component.html',
  styleUrls: ['./moderator-layout.component.scss']
})
export class ModeratorLayoutComponent implements OnInit {

  constructor(private route:Router) { }
 
  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('token')
    this.route.navigate(['/loginuser'])
  }
}
