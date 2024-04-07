import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { Subscription } from 'rxjs';
import {ForTimeStopTextService} from '../for-time-stop-text.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-to-down-button',
  templateUrl: './to-down-button.component.html',
  styleUrl: './to-down-button.component.sass'
})

export class ToDownButtonComponent  implements OnInit
{
  stopClock: boolean = false;
  buttonText:string = 'STOP';
  private subscription: Subscription = new Subscription;

  stoptext:string = '';
  RTtext:string= '';
  ATtext:string='';

  handClicked: boolean = false;

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private ForTimeStopTextService:ForTimeStopTextService,
                @Inject(PLATFORM_ID) private platformId: Object
              )
  { }

  ngOnInit(): void
  {
    this.ClockHourHandStopService.stopClock$.subscribe(() => {
      this.stopClockRotation();
    });

    this.subscription.add(
      this.ForTimeStopTextService.Stoptext$.subscribe((text) => {
        this.stoptext = text;
      })
    );

  }

  scrollToBottom()
  {
    // const topPos = 0;
    // const fullHeight = document.body.scrollHeight;

    // window.scrollTo
    // ({
    //   top: fullHeight,
    //   behavior: 'smooth'
    // });

    if (isPlatformBrowser(this.platformId)) {
      const fullHeight = document.body.scrollHeight;

      window.scrollTo({
        top: fullHeight,
        behavior: 'smooth'
      });
    }

  }

  stopClockRotation()
  {
    this.stopClock = true;
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

}
