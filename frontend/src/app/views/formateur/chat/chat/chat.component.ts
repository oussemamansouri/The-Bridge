// import { Component, OnInit } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { io } from 'socket.io-client';
// import { ChatService } from 'src/app/views/services/chat.service';
// import { DataService } from 'src/app/views/services/data.service';


// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.scss']
// })
// export class ChatComponent implements OnInit {
//   myParticipation: any = [];
// recipientId = 2; // Example recipient ID
// messages: any[] = [];
// newMessage: string = '';
// myId: any;
// profile : any
//   id:any
//   img:any
//   imagepath:any='http://localhost:3000/'
//   helper= new JwtHelperService
//   dataArray: any = [];
// constructor(private chatService: ChatService,private ds:DataService) { 
//   this.ds.getAllformateur().subscribe(data => {
//     console.log(data);
//     this.dataArray = data;
//   });
// }



// ngOnInit(): void {
//   this.myId = this.getId();
//   const id = this.getId();
//   this.ds.getoneformateur(id).subscribe(data => {
//     this.profile = data;
//     console.log(this.profile);
//   });

//   this.loadMessages();
//   this.loadParticipations();
// }




// loadMessages() {
//   this.chatService.getAllMessages(this.recipientId).subscribe(
//     (response) => {
//       this.messages = response.messages;
//     },
//     (error) => {
//       console.error('Error loading messages:', error);
//     }
//   );
// }

// sendMessage() {
//   if (this.newMessage.trim() === '') {
//     return; // Don't send empty messages
//   }
//   this.chatService.sendMessage(this.newMessage, this.getId() /* Example sender ID */, this.recipientId).subscribe(
//     (response) => {
//       this.messages.push(response.message);
//       this.newMessage = ''; // Clear the input field after sending
//     },
//     (error) => {
//       console.error('Error sending message:', error);
//     }
//   );
// }


// getId():number{
//   let token:any=localStorage.getItem('token')
//  let decodedtoken:any=this.helper.decodeToken(token)
//   return decodedtoken.id
// }


// loadParticipations() {
//   this.ds.getParticipation(this.myId).subscribe(data => {
//     this.myParticipation = data;
//     console.log(this.myParticipation)
//   });
// }
// }

import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatService } from 'src/app/views/services/chat.service';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  myParticipation: any = [];
  recipientId = 9; // Exemple d'ID de destinataire, peut être mis à jour lorsqu'un participant est sélectionné
  messages: any[] = [];
  newMessage: string = '';
  myId: any;
  profile: any;
  imagepath: string = 'http://localhost:3000/';
  helper = new JwtHelperService();
  dataArray: any = [];
  acceptedFriends: any[] = [];
  selectedFriend: any = {};

  constructor(private chatService: ChatService, private ds: DataService) { }

  ngOnInit(): void {
    this.myId = this.getId();
    this.ds.getoneformateur(this.myId).subscribe(data => {
      this.profile = data;
    });

    this.loadMessages();
    this.loadParticipations();

    this.ds.getAcceptedFriends(this.getId()).subscribe(
      (data) => {
        this.acceptedFriends = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des amis acceptés :', error);
      }
    );
  }

  loadMessages() {
    this.chatService.getAllMessages(this.recipientId).subscribe(
      (response) => {
        this.messages = response.messages;
      },
      (error) => {
        console.error('Erreur lors du chargement des messages :', error);
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return; // Ne pas envoyer de messages vides
    }
    console.log('Envoi du message :', this.newMessage); // Débogage
    this.chatService.sendMessage(this.newMessage, this.myId, this.recipientId).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response); // Débogage
        this.messages.push(response.message);
        this.newMessage = ''; // Effacer le champ de saisie après l'envoi
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du message :', error);
      }
    );
  }

  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id;
  }

  loadParticipations() {
    this.ds.getParticipation(this.myId).subscribe(data => {
      this.myParticipation = data;
    });
  }

  selectParticipant(friendid: number) {
    this.recipientId = friendid;
    this.loadMessages();
  }
}

