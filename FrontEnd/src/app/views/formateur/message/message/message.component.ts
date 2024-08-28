import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Initialize the chat functionality when the component is loaded
    this.initializeChat();
  }

  initializeChat(): void {
    // Activate the chat for a specific person (person2) by adding 'active-chat' class
    (document.querySelector('.chat[data-chat=person2]') as HTMLElement).classList.add('active-chat');

    // Set the 'active' class for the specific person (person2) to highlight them in the list
    (document.querySelector('.person[data-chat=person2]') as HTMLElement).classList.add('active');

    // Define objects to manage friends and chat state
    let friends = {
      list: document.querySelector('ul.people'), // The list of all friends
      all: document.querySelectorAll('.left .person'), // All friend elements
      name: '' // Placeholder for friend's name
    };

    let chat = {
      container: document.querySelector('.container .right'), // The chat container
      current: null, // Currently active chat
      person: null, // The person currently being chatted with
      name: document.querySelector('.container .right .top .name') // The name display element in chat
    };

    // Add event listeners to each friend element
    friends.all.forEach((f) => {
      const element = f as HTMLElement;
      element.addEventListener('mousedown', () => {
        // If the friend is not already active, set them as the active chat
        if (!element.classList.contains('active')) {
          this.setActiveChat(element, friends, chat);
        }
      });
    });
  }

  // Method to set a specific friend as the active chat
  setActiveChat(friend: HTMLElement, friends: any, chat: any): void {
    // Remove 'active' class from the currently active friend
    friends.list.querySelector('.active')?.classList.remove('active');

    // Add 'active' class to the selected friend
    friend.classList.add('active');

    // Get the currently active chat and the data-chat attribute of the selected friend
    chat.current = chat.container.querySelector('.active-chat');
    chat.person = friend.getAttribute('data-chat');

    // Deactivate the currently active chat
    chat.current?.classList.remove('active-chat');

    // Activate the chat corresponding to the selected friend
    chat.container.querySelector('[data-chat="' + chat.person + '"]')?.classList.add('active-chat');

    // Update the chat name with the selected friend's name
    friends.name = friend.querySelector('.name')!.textContent ?? '';
    chat.name.innerHTML = friends.name;
  }
}
