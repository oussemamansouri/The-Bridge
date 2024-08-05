import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setupSlideshow();
  }

  setupSlideshow(): void {
    const slideTrack = document.querySelector('.slide-track') as HTMLElement;
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;

    if (slides.length === 0) return;

    const slideWidth = slides[0].offsetWidth;
    const trackWidth = slideWidth * slides.length;
  
    slideTrack.style.width = `${trackWidth}px`;

    let currentSlideIndex = 0;
    let direction = 1; // Direction du défilement (1 pour aller vers la droite, -1 pour aller vers la gauche)

    setInterval(() => {
      currentSlideIndex += direction;

      if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0; // Si nous atteignons la dernière diapositive, revenons à la première
      } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1; // Si nous atteignons la première diapositive depuis la fin, revenons à la dernière
      }

      const newPosition = -1 * slideWidth * currentSlideIndex;
      slideTrack.style.transform = `translateX(${newPosition}px)`;
    }, 5000); // Changez ce délai pour ajuster la vitesse du slider
  }
}
