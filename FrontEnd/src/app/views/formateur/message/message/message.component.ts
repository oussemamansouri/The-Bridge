import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initializeChat();
  }

  initializeChat(): void {
  // Première ligne
(document.querySelector('.chat[data-chat=person2]') as HTMLElement).classList.add('active-chat');

// Deuxième ligne
(document.querySelector('.person[data-chat=person2]') as HTMLElement).classList.add('active');


    let friends = {
      list: document.querySelector('ul.people'),
      all: document.querySelectorAll('.left .person'),
      name: ''
    };

    let chat = {
      container: document.querySelector('.container .right'),
      current: null,
      person: null,
      name: document.querySelector('.container .right .top .name')
    };
    friends.all.forEach((f) => {
      const element = f as HTMLElement;
      element.addEventListener('mousedown', () => {
        if (!element.classList.contains('active')) {
          this.setActiveChat(element, friends, chat);
        }
      });
    });
    
    
    
    
    
    
  }

  setActiveChat(friend: HTMLElement, friends: any, chat: any): void {
    friends.list.querySelector('.active').classList.remove('active');
    friend.classList.add('active');
    chat.current = chat.container.querySelector('.active-chat');
    chat.person = friend.getAttribute('data-chat');
    chat.current.classList.remove('active-chat');
    chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat');
    friends.name = friend.querySelector('.name')!.textContent ?? '';

    chat.name.innerHTML = friends.name;
  }
}
