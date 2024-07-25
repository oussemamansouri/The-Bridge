import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formateur-layout',
  templateUrl: './formateur-layout.component.html',
  styleUrls: ['./formateur-layout.component.scss']
})
export class FormateurLayoutComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token')
    this.route.navigate(['/loginuser'])
  }
}
