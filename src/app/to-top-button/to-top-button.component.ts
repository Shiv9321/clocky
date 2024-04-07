import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-top-button',
  templateUrl: './to-top-button.component.html',
  styleUrl: './to-top-button.component.sass'
})

export class ToTopButtonComponent implements OnInit
{
  constructor() { }

  ngOnInit(): void
  {

  }

  scrollToTop()
  {
    // Get the top position of the page
    const topPos = 0;

    // Use smooth scrolling behavior
    window.scrollTo({
      top: topPos,
      behavior: 'smooth'
    });
  }

}
