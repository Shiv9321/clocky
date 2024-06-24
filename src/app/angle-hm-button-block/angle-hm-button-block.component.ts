import { Component , OnDestroy, OnInit,  PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { ForHourHandAngleTextService } from '../for-hour-hand-angle-text.service';
import { ForMinuteHandAngleTextService } from '../for-minute-hand-angle-text.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-angle-hm-button-block',
  templateUrl: './angle-hm-button-block.component.html',
  styleUrl: './angle-hm-button-block.component.sass'
})

export class AngleHmButtonBlockComponent implements OnInit,OnDestroy
{

  private subscription!: Subscription;

  stopClock: boolean = false;

  hourRotationDegrees!: number;
  minuteRotationDegrees:number = 0;

  difference:number = 0;
  difference2:number = 0;

  constructor(
              private ClockHourHandStopService: ClockHourHandStopService,
              private ForMinuteHandAngleTextService: ForMinuteHandAngleTextService,
              private ForHourHandAngleTextService: ForHourHandAngleTextService,
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

  }

  stopClockRotation()
  {
    this.stopClock = true;
  }

  ngOnDestroy(): void
  {
    if (this.subscription)
    {
      this.subscription.unsubscribe();
    }
  }

  updateTime()
  {
    this.calculateAngles();
  }

  calculateAngles()
  {

    if (!this.stopClock)
    {

      this.ForMinuteHandAngleTextService.minuteRotationDegrees$.subscribe(degrees =>
      {
        this.minuteRotationDegrees = degrees;
      });

      this.ForHourHandAngleTextService.hourRotationDegrees$.subscribe(degrees =>
      {
        this.hourRotationDegrees = degrees;
      });

      this.difference =  Math.abs(this.hourRotationDegrees - this.minuteRotationDegrees);

      this.difference2 =  360 - this.difference;

    }
  }

}
