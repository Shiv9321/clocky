import { Component, OnInit } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { ForMinuteHandAngleTextService } from '../for-minute-hand-angle-text.service';
import { HandClickedHideAngleTextService } from '../hand-clicked-hide-angle-text.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clock-minute-hand-angle-text',
  templateUrl: './clock-minute-hand-angle-text.component.html',
  styleUrl: './clock-minute-hand-angle-text.component.sass'
})

export class ClockMinuteHandAngleTextComponent implements OnInit
{
  minuteRadius: number = 15;
  minuteSpeed: number = (2 * Math.PI) / 3600;
  minuteXPos: number = 0;
  minuteYPos: number = 0;
  minuteAngle: number = 0;

  minuteRotationDegrees:number = 0;

  stopClock: boolean = false;
  stopTextAnimation: boolean = false;
  stopSecondHandUpdate: boolean = false;

  private subscription!: Subscription;

  handClicked:boolean = false;

  constructor
  (
    private ClockHourHandStopService: ClockHourHandStopService,
    private ForMinuteHandAngleTextService: ForMinuteHandAngleTextService,
    private HandClickedHideAngleTextService:HandClickedHideAngleTextService
  )
  {
    this.subscription = this.HandClickedHideAngleTextService.handClicked$.subscribe(clicked => {
      this.handClicked = clicked;
    });
  }

 ngOnInit()
 {

    this.updatePositions();
    this.animate();
    setInterval(() => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      if (!this.stopSecondHandUpdate)
      {
        this.minuteAngle = minutes * 6 + (seconds * (6 / 60));
      }

    }, 1000);

    this.ClockHourHandStopService.stopClock$.subscribe(() => {
      this.stopClockRotation(); // Stop clock rotation when the stopClock$ event is emitted
    });

    this.ForMinuteHandAngleTextService.minuteRotationDegrees$.subscribe(degrees => {
      this.minuteRotationDegrees = degrees;
    });

  }

  stopClockRotation()
  {
    this.stopClock = true;
    this.stopTextAnimation = true;
    this.stopSecondHandUpdate = true;
  }


  updatePositions()
  {
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    let minuteHandAngle = ((minutes * 60 + seconds) / 3600) * 2 * Math.PI
                            -(78 * Math.PI / 180);

    minuteHandAngle %= 2 * Math.PI;

    if (!this.stopClock)
    {
      this.minuteXPos = this.minuteRadius * Math.cos(minuteHandAngle) - 1.8;
      this.minuteYPos = this.minuteRadius * Math.sin(minuteHandAngle) - 0.4;
    }
  }

  animate()
  {
    setInterval(() =>
    {
      this.updatePositions();
    }, 1000);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
