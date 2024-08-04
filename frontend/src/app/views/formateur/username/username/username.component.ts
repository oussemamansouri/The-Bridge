import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent  {
@Output() usernameEvent = new EventEmitter<string>()

username='';
  constructor() { }

 
  setusername():void{
this.usernameEvent.emit(this.username);
  }

}
