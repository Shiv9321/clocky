import { Component, Inject, PLATFORM_ID, NgZone  } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service'
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {ForHandsStopTextChangeService} from '../for-hands-stop-text-change.service';
import { Subscription } from 'rxjs';
import {ForTimeStopTextService} from '../for-time-stop-text.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-stop-button-block',
  templateUrl: './stop-button-block.component.html',
  styleUrl: './stop-button-block.component.sass'
})

export class StopButtonBlockComponent
{
  currentTime!: string;

  buttonText:string = 'STOP';
  private subscription: Subscription = new Subscription;
  private intervalId: any;

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private router: Router,
                private ForHandsStopTextChangeService: ForHandsStopTextChangeService,
                private ForTimeStopTextService: ForTimeStopTextService,
                @Inject(PLATFORM_ID) private platformId: Object,
                private ngZone: NgZone
              )
  { }

  ngOnInit(): void
  {

    this.updateTime();

    if (isPlatformBrowser(this.platformId))
    {
      this.ngZone.runOutsideAngular(() => {
        this.intervalId = setInterval(() => {
          this.ngZone.run(() => {
            this.updateTime();
          });
        }, 1000);
      });

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    this.subscription.add(
      this.ForHandsStopTextChangeService.buttonText$.subscribe((text) =>
      {
        this.buttonText = text;

        const Stoptext = this.buttonText === 'STOP' ? '' : ' Stopped Time -';
        this.ForTimeStopTextService.updateStoptext(Stoptext);

        const RTtext = this.buttonText === 'STOP' ? '' : 'Running Time -';
        this.ForTimeStopTextService.updateRTtext(RTtext);

        const ATtext = this.buttonText === 'STOP' ? '' : ': Adjusted Time -';
        this.ForTimeStopTextService.updateATtext(ATtext);

        const runningtext = this.buttonText === 'STOP' ? '' : '-';
        this.ForTimeStopTextService.updateRTtext(RTtext);

        const adjustedtext = this.buttonText === 'STOP' ? '' : '-';
        this.ForTimeStopTextService.updateATtext(ATtext);

      })
    );

  }

  updateTime()
  {
    const now = new Date();

    this.currentTime = now.toLocaleTimeString();

  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
    if (this.intervalId)
    {
      clearInterval(this.intervalId);
    }
  }

  onStopClockClick()
  {

    if (this.buttonText === 'STOP')
    {
      this.ClockHourHandStopService.stopClock();
      this.scrollToTop();
      this.ForHandsStopTextChangeService.updateButtonText('RESET'); // Update the text through the service
    }
    else
    {
      this.ForHandsStopTextChangeService.updateButtonText('STOP'); // Update the text through the service
      location.reload();
    }

  }

  scrollToTop()
  {
    if (isPlatformBrowser(this.platformId))
    {
      const topPos = 0;
      window.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });

      const divElement = document.querySelector('.center-dot');
        if (divElement) {
          divElement.classList.add('red-color');
          setTimeout(() => {
            divElement.classList.remove('red-color');
          }, 1250);
        }

    }
  }
}
