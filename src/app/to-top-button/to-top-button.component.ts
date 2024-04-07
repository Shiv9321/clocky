import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-to-top-button',
  templateUrl: './to-top-button.component.html',
  styleUrl: './to-top-button.component.sass'
})

export class ToTopButtonComponent implements OnInit
{
  constructor( @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void
  {

  }

  scrollToTop()
  {
    // // Get the top position of the page
    // const topPos = 0;

    // // Use smooth scrolling behavior
    // window.scrollTo({
    //   top: topPos,
    //   behavior: 'smooth'
    // });

    if (isPlatformBrowser(this.platformId))
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

}
