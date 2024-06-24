import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { ForMinuteHandAngleTextService } from '../for-minute-hand-angle-text.service';
import { ForSecondHandAngleTextService } from '../for-second-hand-angle-text.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-angle-ms-button-block',
  templateUrl: './angle-ms-button-block.component.html',
  styleUrl: './angle-ms-button-block.component.sass'
})

export class AngleMsButtonBlockComponent implements OnInit, OnDestroy
{
  private subscription!: Subscription;

  stopClock: boolean = false;

  minuteRotationDegrees!: number;
  secondRotationDegrees:number = 0;

  difference:number = 0;
  difference2:number = 0;

  constructor(
              private ClockHourHandStopService: ClockHourHandStopService,
              private ForSecondHandAngleTextService: ForSecondHandAngleTextService,
              private ForMinuteHandAngleTextService: ForMinuteHandAngleTextService,
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
      this.ForMinuteHandAngleTextService.minuteRotationDegrees$.subscribe
      (degrees =>
        {
          this.minuteRotationDegrees = degrees;
        }
      );

      this.ForSecondHandAngleTextService.secondRotationDegrees$.subscribe
      ( degrees=>
        {
          this.secondRotationDegrees = degrees;
        }
      );

      this.difference =  Math.abs(this.minuteRotationDegrees -
                                            this.secondRotationDegrees);
      this.difference2 =  360 - this.difference;
    }
  }
}
