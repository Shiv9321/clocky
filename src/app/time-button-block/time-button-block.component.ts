import { Component, OnInit, PLATFORM_ID, Inject, NgZone} from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import {ForHandsStopTextChangeService} from '../for-hands-stop-text-change.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {ForTimeStopTextService} from '../for-time-stop-text.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-time-button-block',
  templateUrl: './time-button-block.component.html',
  styleUrl: './time-button-block.component.sass'
})

export class TimeButtonBlockComponent implements OnInit
{
  currentTime!: string;
  runningtime:string= '';
  adjustedtime:string= '';

  stopClock: boolean = false;

  buttonText:string = 'STOP';
  private subscription: Subscription = new Subscription;

  stoptext:string = '';
  RTtext:string= '';
  ATtext:string='';

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private router: Router,
                private ForHandsStopTextChangeService: ForHandsStopTextChangeService,
                private ForTimeStopTextService:ForTimeStopTextService,
                @Inject(PLATFORM_ID) private platformId: Object,
                private zone: NgZone
              )
  { }

  ngOnInit(): void
  {
    this.updateTime();

    if (isPlatformBrowser(this.platformId))
    {
      this.zone.runOutsideAngular(() => {
        setInterval(() => {
          this.zone.run(() => {
            this.updateTime();
          });
        }, 1000);
      });
    }

    this.ClockHourHandStopService.stopClock$.subscribe(() => {
      this.stopClockRotation();
    });

    this.subscription.add(
      this.ForTimeStopTextService.Stoptext$.subscribe((text) => {
        this.stoptext = text;
      })
    );

  }

  stopClockRotation()
  {
    this.stopClock = true;
  }

  updateTime()
  {
    const now = new Date();

    if (!this.stopClock)
    {
      this.currentTime = now.toLocaleTimeString();
    }

  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

}

