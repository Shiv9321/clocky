import { Component, OnDestroy, OnInit,PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { ForHourHandAngleTextService } from '../for-hour-hand-angle-text.service';
import { ForSecondHandAngleTextService } from '../for-second-hand-angle-text.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-angle-hs-button-block',
  templateUrl: './angle-hs-button-block.component.html',
  styleUrl: './angle-hs-button-block.component.sass'
})

export class AngleHsButtonBlockComponent implements OnInit,OnDestroy
{

  private subscription!: Subscription;

  hourRotationDegrees!: number;
  secondRotationDegrees:number = 0;

  stopClock: boolean = false;

  difference:number = 0;
  difference2:number = 0;

  constructor(
              private ClockHourHandStopService: ClockHourHandStopService,
              private ForSecondHandAngleTextService: ForSecondHandAngleTextService,
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
          setInterval(() => {
            this.ngZone.run(() => {
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
      this.ForHourHandAngleTextService.hourRotationDegrees$.subscribe
      (degrees =>
      {
          this.hourRotationDegrees = degrees;
      });

      this.ForSecondHandAngleTextService.secondRotationDegrees$.subscribe
      (degrees=>
      {
        this.secondRotationDegrees = degrees;
      });

      this.difference =  Math.abs(this.hourRotationDegrees -
                                      this.secondRotationDegrees);

      this.difference2 =  360 - this.difference;
    }
  }

}
