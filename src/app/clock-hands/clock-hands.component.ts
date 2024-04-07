import { Component, OnInit } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service'
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-clock-hands',
  templateUrl: './clock-hands.component.html',
  styleUrl: './clock-hands.component.sass'
})

export class ClockHandsComponent implements OnInit
{
  stopClock: boolean = false;

  onStopClockClicked:boolean = false;

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private router: Router
              )
  { }

  ngOnInit(): void
  {

    this.router.events.pipe
    (
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() =>
    {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.ClockHourHandStopService.stopClock$.subscribe(() =>
    {
      this.stopClockRotation();
    });

  }

  stopClockRotation()
  {
    this.stopClock = true;
    this.onStopClockClicked = true;
  }

  onStopClockClick()
  {
    this.ClockHourHandStopService.stopClock();
    this.scrollToTop();
    this.onStopClockClicked = true;
  }

  scrollToTop()
  {
    const topPos = 0;

    window.scrollTo({
      top: topPos,
      behavior: 'smooth'
    });

    const divElement = document.querySelector('.center-dot');
      if (divElement)
      {
        divElement.classList.add('red-color');
        setTimeout(() =>
        {
          divElement.classList.remove('red-color');
        }, 1250);
      }
  }
}
