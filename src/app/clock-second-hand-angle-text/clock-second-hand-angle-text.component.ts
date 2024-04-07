import { Component, OnInit } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { ForSecondHandAngleTextService } from '../for-second-hand-angle-text.service';
import { HandClickedHideAngleTextService } from '../hand-clicked-hide-angle-text.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clock-second-hand-angle-text',
  templateUrl: './clock-second-hand-angle-text.component.html',
  styleUrl: './clock-second-hand-angle-text.component.sass'
})

export class ClockSecondHandAngleTextComponent implements OnInit
{
  secondHandAngle: number = 0;

  radius: number = 20;
  speed: number = (2 * Math.PI) / 60;
  xPos: number = 0;
  yPos: number = 0;

  stopClock: boolean = false;
  stopTextAnimation: boolean = false;
  stopSecondHandUpdate: boolean = false; // New flag to control second hand update

  secondRotationDegrees!: number;

  private subscription: Subscription = new Subscription;

  handClicked:boolean = false;

  constructor(
              private ClockHourHandStopService: ClockHourHandStopService,
              private ForSecondHandAngleTextService: ForSecondHandAngleTextService,
              private HandClickedHideAngleTextService:HandClickedHideAngleTextService
             )
  {
    this.subscription = this.HandClickedHideAngleTextService.handClicked$.subscribe(clicked => {
      this.handClicked = clicked;
    });
  }

ngOnInit(): void
{
    this.updatePosition();
    this.animate();

    setInterval(() =>
    {
      const now = new Date();
      const seconds = now.getSeconds();

      if (!this.stopSecondHandUpdate)
      {
        this.secondHandAngle = seconds * 6;
      }
    }, 1000);

    this.ClockHourHandStopService.stopClock$.subscribe(() => {
      this.stopClockRotation(); // Stop clock rotation when the stopClock$ event is emitted
    });

    this.ForSecondHandAngleTextService.secondRotationDegrees$.subscribe(degrees => {
      this.secondRotationDegrees = degrees;
    });

  }

  stopClockRotation()
  {
    this.stopClock = true;
    this.stopTextAnimation = true;
    this.stopSecondHandUpdate = true;
  }

  updatePosition()
  {
    const currentDate = new Date();
    const seconds = currentDate.getSeconds();
    const angle = ((seconds - 13) / 60) * 2 * Math.PI;

    if (!this.stopClock) {
      this.xPos = this.radius * Math.cos(angle) - 1.4;
      this.yPos = this.radius * Math.sin(angle) - 0.8;
    }
  }

  animate()
  {
    setInterval(() =>
    {
      this.updatePosition();
    }, 1000);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
