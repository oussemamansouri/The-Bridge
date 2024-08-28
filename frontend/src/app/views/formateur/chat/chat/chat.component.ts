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
  myParticipation: any = []; // Array to hold the list of my participations
  recipientId = 9; // Default recipient ID, can be updated when a participant is selected
  messages: any[] = []; // Array to store chat messages
  newMessage: string = ''; // Variable to hold the new message input
  myId: any; // Variable to store the current user's ID
  profile: any; // Variable to store user profile information
  imagepath: string = 'http://localhost:3000/'; // Base URL for image paths
  helper = new JwtHelperService(); // JWT helper for decoding tokens
  dataArray: any = []; // Variable to store additional data (not used in current code)
  acceptedFriends: any[] = []; // Array to store accepted friends
  selectedFriend: any = {}; // Variable to store selected friend information (not used in current code)

  constructor(private chatService: ChatService, private ds: DataService) { }

  ngOnInit(): void {
    this.myId = this.getId(); // Retrieve the current user's ID
    // Load the user's profile information
    this.ds.getoneformateur(this.myId).subscribe(data => {
      this.profile = data;
    });

    // Load chat messages and participation data
    this.loadMessages();
    this.loadParticipations();

    // Load accepted friends
    this.ds.getAcceptedFriends(this.getId()).subscribe(
      (data) => {
        this.acceptedFriends = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des amis acceptés :', error);
      }
    );
  }

  // Method to load chat messages with the current recipient
  loadMessages() {
    this.chatService.getAllMessages(this.recipientId).subscribe(
      (response) => {
        this.messages = response.messages; // Assign received messages to the messages array
      },
      (error) => {
        console.error('Erreur lors du chargement des messages :', error);
      }
    );
  }

  // Method to send a new chat message
  sendMessage() {
    if (this.newMessage.trim() === '') {
      return; // Do not send empty messages
    }
    console.log('Envoi du message :', this.newMessage); // Debugging
    this.chatService.sendMessage(this.newMessage, this.myId, this.recipientId).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response); // Debugging
        this.messages.push(response.message); // Add the new message to the messages array
        this.newMessage = ''; // Clear the input field after sending
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du message :', error);
      }
    );
  }

  // Method to retrieve the current user's ID from the JWT token
  getId(): number {
    let token: any = localStorage.getItem('token');
    let decodedtoken: any = this.helper.decodeToken(token);
    return decodedtoken.id; // Return the ID from the decoded token
  }

  // Method to load participation data
  loadParticipations() {
    this.ds.getParticipation(this.myId).subscribe(data => {
      this.myParticipation = data; // Assign the participation data to the myParticipation array
    });
  }

  // Method to select a participant and load messages with them
  selectParticipant(friendid: number) {
    this.recipientId = friendid; // Set the recipient ID to the selected participant's ID
    this.loadMessages(); // Load messages with the newly selected recipient
  }
}
