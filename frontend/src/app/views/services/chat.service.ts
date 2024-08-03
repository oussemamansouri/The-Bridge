import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

// import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:3000'; // Modifier selon l'URL de votre serveur

  constructor(private http: HttpClient) { }

  getAllMessages(recipientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/chat/get-all-messages/${recipientId}`);
  }

  sendMessage(message: string, senderId: number, recipientId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat/send-message`, { message, senderId, recipientId });
  }
}

