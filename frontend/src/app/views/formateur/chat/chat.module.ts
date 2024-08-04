import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { UsernameComponent } from '../username/username/username.component';

@NgModule({
  declarations: [
    ChatComponent,
    UsernameComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }
// export interface Message {
//   sender: string;
//   content: string;
//   timestamp: Date;
// }


