import { Component, OnInit } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import {ForHandsStopTextChangeService} from '../for-hands-stop-text-change.service';
import { Subscription, interval} from 'rxjs';
import { Router } from '@angular/router';
import {ForTimeStopTextService} from '../for-time-stop-text.service';
import { NgZone } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-time-button-b',
  templateUrl: './time-button-b.component.html',
  styleUrl: './time-button-b.component.sass'
})

export class TimeButtonBComponent
{

  stoptext:string = '';

  currentTime!: string;
  runningtime:string= '';
  adjustedtime:string= '';

  stopClock: boolean = false;

  buttonText:string = 'STOP';
  private subscription: Subscription = new Subscription;

  RTtext:string= '';
  ATtext:string='';

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private router: Router,
                private ForHandsStopTextChangeService: ForHandsStopTextChangeService,
                private ForTimeStopTextService:ForTimeStopTextService,
                private zone: NgZone,
              )
  { }


  ngOnInit(): void
  {
    this.updateTime();

    // setInterval(() =>
    // {
    //   this.updateTime();
    // }, 1000);

    // this.zone.runOutsideAngular(() =>
    // {
    //   setInterval(() =>
    //   {
    //     this.updateTime();
    //   }, 1000);
    // });

    // this.subscription.add(interval(1000).subscribe(() => {
    //   this.zone.run(() => {
    //     this.updateTime();
    //   });
    // }));

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

    // if (!this.stopClock)
    // {
    //   this.currentTime = now.toLocaleTimeString();
    // }
    this.currentTime = now.toLocaleTimeString();

  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

}
