import { Component,OnInit } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import {ForHandsStopTextChangeService} from '../for-hands-stop-text-change.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {ForTimeStopTextService} from '../for-time-stop-text.service';
import { HandClickedHideAngleTextService } from '../hand-clicked-hide-angle-text.service';

@Component({
  selector: 'app-running-time-block',
  templateUrl: './running-time-block.component.html',
  styleUrl: './running-time-block.component.sass'
})

export class RunningTimeBlockComponent implements OnInit
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

  handClicked: boolean = false;

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private router: Router,
                private ForHandsStopTextChangeService: ForHandsStopTextChangeService,
                private ForTimeStopTextService:ForTimeStopTextService,
                private HandClickedHideAngleTextService:HandClickedHideAngleTextService
              )
  { }

  ngOnInit(): void
  {
    this.updateTime();
    setInterval(() =>
    {
      this.updateTime();
    }, 1000);

    this.ClockHourHandStopService.stopClock$.subscribe(() => {
      this.stopClockRotation();
    });

    this.subscription.add(
      this.ForTimeStopTextService.Stoptext$.subscribe((text) => {
        this.stoptext = text;
      })
    );

    this.subscription.add(
      this.ForTimeStopTextService.RTtext$.subscribe((text) => {
        this.RTtext = text;
      })
    );

    this.subscription.add(
      this.ForTimeStopTextService.ATtext$.subscribe((text) => {
        this.ATtext = text;
      })
    );

    this.subscription.add(
      this.ForTimeStopTextService.runningtext$.subscribe((text) => {
        this.runningtime = text;
      })
    );

    this.subscription.add(
      this.ForTimeStopTextService.adjustedtext$.subscribe((text) => {
        this.adjustedtime = text;
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

    this.runningtime = now.toLocaleTimeString();

    if (!this.stopClock)
    {
      this.adjustedtime = now.toLocaleTimeString();
    }

  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

}

