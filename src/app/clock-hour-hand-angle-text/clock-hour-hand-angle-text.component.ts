import { Component, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service'
import { ForHourHandAngleTextService } from '../for-hour-hand-angle-text.service'
import { HandClickedHideAngleTextService } from '../hand-clicked-hide-angle-text.service'
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-clock-hour-hand-angle-text',
  templateUrl: './clock-hour-hand-angle-text.component.html',
  styleUrl: './clock-hour-hand-angle-text.component.sass'
})

export class ClockHourHandAngleTextComponent implements OnInit
{
  hourRadius: number = 10;
  hourSpeed: number = (2 * Math.PI) / 43200;
  hourXPos: number = 0;
  hourYPos: number = 0;
  hourAngle: number = 0;

  handClicked:boolean = false;

  stopClock: boolean = false;
  stopTextAnimation: boolean = false;
  stopHourHandUpdate: boolean = false;


  hourRotationDegrees!: number;

  private subscription!: Subscription;

  constructor(
              private ClockHourHandStopService: ClockHourHandStopService,
              private ForHourHandAngleTextService: ForHourHandAngleTextService,
              private HandClickedHideAngleTextService:HandClickedHideAngleTextService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private ngZone: NgZone
            )
  {
    this.subscription = this.HandClickedHideAngleTextService.handClicked$.subscribe(clicked => {
      this.handClicked = clicked;
    });
  }

  ngOnInit()
  {
    if (isPlatformBrowser(this.platformId))
    {
      this.ngZone.runOutsideAngular(() =>
      {
        this.updatePositions();
        this.animate();
        setInterval(() => {
          this.ngZone.run(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            if (!this.stopHourHandUpdate) {
              this.hourAngle = (hours % 12) * 30 + (minutes / 60) * 30 +
                (seconds / 60 / 60) * 30;
            }
          });
        }, 1000);
      });
    }

    this.ClockHourHandStopService.stopClock$.subscribe(() => {
      this.stopClockRotation(); // Stop clock rotation when the stopClock$ event is emitted
    });

    this.ForHourHandAngleTextService.hourRotationDegrees$.subscribe(degrees => {
      this.hourRotationDegrees = degrees;
    });

  }

  stopClockRotation()
  {
    this.stopClock = true;
    this.stopTextAnimation = true;
    this.stopHourHandUpdate = true;
  }

  updatePositions()
  {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const hourAngle = ((hours % 12) / 12) * 2 * Math.PI +
                     ((minutes % 60) / 60) * (2 * Math.PI / 12) +
                     ((seconds % 60) / 60) * (2 * Math.PI / 720) -
                     (65 * Math.PI / 180);

    if (!this.stopClock)
    {
      this.hourXPos = this.hourRadius * Math.cos(hourAngle) - 1.4;
      this.hourYPos = this.hourRadius * Math.sin(hourAngle) - 0.8;
    }

  }

  animate()
  {
    if (isPlatformBrowser(this.platformId))
    {
      this.ngZone.runOutsideAngular(() =>
      {
        setInterval(() => {
          this.ngZone.run(() => {
            this.updatePositions();
          });
        }, 10);
      });
    }
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}

