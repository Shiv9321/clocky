import { Component , OnDestroy, OnInit} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { ForHourHandAngleTextService } from '../for-hour-hand-angle-text.service';
import { ForMinuteHandAngleTextService } from '../for-minute-hand-angle-text.service';

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
            )
  { }

  ngOnInit(): void
  {
    this.updateTime();

    this.subscription = interval(1000).subscribe(() =>
    {
      this.updateTime();
    });

    this.ClockHourHandStopService.stopClock$.subscribe(() =>
    {
      this.stopClockRotation();
    });

  }

  stopClockRotation()
  {
    this.stopClock = true; // Set stopClock flag to true to stop clock rotation
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
