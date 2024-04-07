import { Component,  ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { filter } from 'rxjs/operators';
import { ForHourHandAngleTextService } from '../for-hour-hand-angle-text.service';
import {ForHandsStopTextChangeService} from '../for-hands-stop-text-change.service';
import { Subscription } from 'rxjs';
import { HandClickedHideAngleTextService } from '../hand-clicked-hide-angle-text.service';
import { HourHandAatService } from '../hour-hand-aat.service';

@Component({
  selector: 'app-clock-hour-hand',
  templateUrl: './clock-hour-hand.component.html',
  styleUrl: './clock-hour-hand.component.sass'
})

export class ClockHourHandComponent implements OnInit
{
  hourRotation: string = 'rotate(0deg)';
  hourRotationDegrees : number = 0;

  stopClock: boolean = false;

  onStopClockClicked:boolean = false;

  buttonText:string = 'STOP';
  private subscription: Subscription = new Subscription;

  isDragging: boolean = false;

  hourangleT:number = 0;

  @ViewChild('draggable') draggable!: ElementRef;

  hourAngle: number = 0;

  handClicked: boolean = false;

  hourXPos:number = 0 ;
  hourYPos: number = 0 ;

  hourRadius: number = 10;

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private router: Router,
                private ForHourHandAngleTextService: ForHourHandAngleTextService,
                private ForHandsStopTextChangeService: ForHandsStopTextChangeService,
                private HandClickedHideAngleTextService:HandClickedHideAngleTextService,
                private HourHandAatService:HourHandAatService
              )
  {  }

  ngOnInit(): void
  {

    this.router.events.pipe
    (
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() =>
    {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.updateClock(); // Call updateClock function initially
    setInterval(() =>
    {
      this.updateClock(); // Update clock every minute
    }, 1000);

    this.ClockHourHandStopService.stopClock$.subscribe(() =>
    {
      this.stopClockRotation();
    });

    this.subscription.add(
      this.ForHandsStopTextChangeService.buttonText$.subscribe((text) => {
        this.buttonText = text;
      })
    );

  }

  stopClockRotation()
  {
    this.stopClock = true;
    this.onStopClockClicked = true;
  }

  updateClock()
  {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (!this.stopClock)
    {
      const hourFraction = hours % 12 + minutes / 60 + seconds / 3600;
      const HourrotationDegrees = (hourFraction / 12) * 360;
      this.hourRotation = `rotate(${HourrotationDegrees}deg) scale(0.9)`;
    }

    if (!this.stopClock)
    {
      const hourFraction = hours % 12 + minutes / 60 + seconds / 3600;
      const HourrotationDegrees = (hourFraction / 12) * 360;
      this.ForHourHandAngleTextService.updateHourRotationDegrees(HourrotationDegrees);
    }

  }

  onStopClockClick()
  {

    if (this.buttonText === 'STOP')
    {
      this.ClockHourHandStopService.stopClock();
      this.scrollToTop();
      this.ForHandsStopTextChangeService.updateButtonText('RESET'); // Update the text through the service
    }

  }

  scrollToTop()
  {
    const topPos = 0;
    window.scrollTo
    ({
      top: topPos,
      behavior: 'smooth'
    });

    const divElement = document.querySelector('.center-dot');
      if (divElement)
      {
        divElement.classList.add('red-color');
        setTimeout(() => {
          divElement.classList.remove('red-color');
        }, 1250);
      }
  }

  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: MouseEvent)
  {
    this.handClicked = true;
    this.isDragging = true;
    this.updateHourPosition(event);
    this.onStopClockClick();
    this.onClickHand();
    this.updatePositions();
  }

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent)
  {
      if (this.isDragging)
      {
        this.updateHourPosition(event);
        this.updatePositions();
      }
  }

  @HostListener('document:mouseup', ['$event'])
  handleMouseUp(event: MouseEvent)
  {
    this.isDragging = false;
  }

  private updateHourPosition(event: MouseEvent)
  {
      const rect = this.draggable.nativeElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI) + 90;
      this.hourAngle = angle;

      this.HourHandAatService.updateHourAngle(this.hourangleT);
  }

  calculateTime()
  {

      this.hourangleT = this.hourAngle;

      if (this.hourangleT <= 0)
      {
        this.hourangleT += 360;
      }

      let hour = Math.floor(this.hourAngle / 30) % 12;

      if (hour <= 0)
      {
        hour += 12;
      }

      this.HourHandAatService.updateHourAngle(this.hourangleT);

      return { hour: hour === 0 ? 12 : hour };

  }

  get hourValue()
  {
    return this.calculateTime().hour;
  }

  onClickHand()
  {
    this.HandClickedHideAngleTextService.setHandClicked(true);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  updatePositions()
  {
      let deltaAngle = this.hourAngle;

      deltaAngle %= 360;
      if (deltaAngle < 0)
      {
          deltaAngle += 360;
      }

      deltaAngle -= 180;

      const deltaX = (this.hourRadius * Math.cos(deltaAngle * Math.PI / 180) - 6);
      const deltaY = (this.hourRadius * Math.sin(deltaAngle * Math.PI / 180));

      this.hourXPos = deltaX;
      this.hourYPos = deltaY;
  }

}

