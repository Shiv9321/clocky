import { Component, OnInit,PLATFORM_ID, Inject, NgZone  } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { Subscription } from 'rxjs';
import {ForTimeStopTextService} from '../for-time-stop-text.service';
import { HourHandAatService } from '../hour-hand-aat.service';
import { MinuteHandAatService } from '../minute-hand-aat.service';
import { SecondHandAatService } from '../second-hand-aat.service';
import { isPlatformBrowser } from '@angular/common';

@Component
({
  selector: 'app-adjusted-angles-block',
  templateUrl: './adjusted-angles-block.component.html',
  styleUrl: './adjusted-angles-block.component.sass'
})

export class AdjustedAnglesBlockComponent implements OnInit
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

  hourangleT: number = 0;
  minuteangleT:number = 0;
  secondangleT:number = 0 ;
  differenceangleHMT:number=0;
  differenceangleHST:number=0;
  differenceangleMST:number=0;

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private ForTimeStopTextService:ForTimeStopTextService,
                private HourHandAatService:HourHandAatService,
                private MinuteHandAatService:MinuteHandAatService,
                private SecondHandAatService:SecondHandAatService,
                @Inject(PLATFORM_ID) private platformId: Object,
                private ngZone: NgZone
              )
  { }

  ngOnInit(): void
  {
    this.updateTime();

    if (isPlatformBrowser(this.platformId))
    {
      this.ngZone.runOutsideAngular(() =>
      {
        setInterval(() =>
        {
          this.ngZone.run(() =>
          {
            this.updateTime();
          });
        }, 1000);
      });
    }

    this.ClockHourHandStopService.stopClock$.subscribe(() =>
    {
      this.stopClockRotation();
    });

    this.subscription.add(
      this.ForTimeStopTextService.Stoptext$.subscribe((text) =>
        {
        this.stoptext = text;
      })
    );

    this.subscription.add(
      this.ForTimeStopTextService.RTtext$.subscribe((text) =>
      {
        this.RTtext = text;
      })
    );

    this.subscription.add(
      this.ForTimeStopTextService.ATtext$.subscribe((text) =>
      {
        this.ATtext = text;
      })
    );

    this.subscription.add(
      this.ForTimeStopTextService.runningtext$.subscribe((text) =>
      {
        this.runningtime = text;
      })
    );

    this.subscription.add(
      this.ForTimeStopTextService.adjustedtext$.subscribe((text) =>
      {
        this.adjustedtime = text;
      })
    );

    this.HourHandAatService.hourAngle$.subscribe(hourangleT =>
    {
      this.hourangleT = hourangleT;
      this.calculateDifferenceHM();
      this.calculateDifferenceHS();
    });

    this.MinuteHandAatService.hourAngle$.subscribe(hourangleT =>
    {
      this.minuteangleT = hourangleT;
      this.calculateDifferenceHM();
      this.calculateDifferenceMS();
    });

    this.SecondHandAatService.hourAngle$.subscribe(hourangleT =>
    {
      this.secondangleT = hourangleT;
      this.calculateDifferenceHS();
      this.calculateDifferenceMS();
    });

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

  calculateDifferenceHM()
  {
    let rawDifference = Math.abs(this.hourangleT - this.minuteangleT) % 360;
      // If difference is greater than 180, subtract it from 360
    this.differenceangleHMT = rawDifference > 180 ? 360 - rawDifference : rawDifference;
  }

  calculateDifferenceHS()
  {
    let rawDifference = Math.abs(this.hourangleT - this.secondangleT) % 360;
      // If difference is greater than 180, subtract it from 360
    this.differenceangleHST = rawDifference > 180 ? 360 - rawDifference : rawDifference;
  }

  calculateDifferenceMS()
  {
    let rawDifference = Math.abs(this.secondangleT - this.minuteangleT) % 360;
      // If difference is greater than 180, subtract it from 360
    this.differenceangleMST = rawDifference > 180 ? 360 - rawDifference : rawDifference;
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

}

