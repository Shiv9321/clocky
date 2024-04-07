import { Component,ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ForSecondHandAngleTextService } from '../for-second-hand-angle-text.service';
import {ForHandsStopTextChangeService} from '../for-hands-stop-text-change.service';
import { Subscription } from 'rxjs';
import { HandClickedHideAngleTextService } from '../hand-clicked-hide-angle-text.service';
import { SecondHandAatService } from '../second-hand-aat.service';

@Component({
  selector: 'app-clock-second-hand',
  templateUrl: './clock-second-hand.component.html',
  styleUrl: './clock-second-hand.component.sass'
})
export class ClockSecondHandComponent implements OnInit
{
  secondRotation: string = 'rotate(0deg) scale(1.5)'; // Initial rotation angle
  secondRotationDegrees : number = 0;

  stopClock: boolean = false;

  isDragging: boolean = false;

  onStopClockClicked:boolean = false;

  buttonText:string = 'STOP';
  private subscription: Subscription = new Subscription;
  @ViewChild('draggable') draggable!: ElementRef;

  secondAngle: number = 0;

  handClicked: boolean = false;
  secondangleT :number = 0;

  secondRadius:number = 20;
  secXPos:number = 0;
  secYPos:number = 0;

  constructor(
              private ClockHourHandStopService: ClockHourHandStopService,
              private router: Router,
              private ForSecondHandAngleTextService: ForSecondHandAngleTextService,
              private ForHandsStopTextChangeService: ForHandsStopTextChangeService,
              private HandClickedHideAngleTextService:HandClickedHideAngleTextService,
              private SecondHandAatService:SecondHandAatService
            )
  { }

  ngOnInit(): void
  {

    this.router.events.pipe
    (
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() =>
    {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.updateClock();
    setInterval(() =>
    {
      this.updateClock();
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
    const seconds = now.getSeconds();

    if (!this.stopClock)
    {
      const secondRotationDegrees = (seconds / 60) * 360 - 180;
      if (seconds === 0)
      {
        this.secondRotationDegrees = 0;
      }

      this.secondRotation = `rotate(${secondRotationDegrees}deg) scale(1.3)`;
    }

    if (!this.stopClock)
    {
      const secondRotationDegrees = seconds*6;
      if (seconds === 0)
      {
        this.secondRotationDegrees = 0;
      }
      this.ForSecondHandAngleTextService.updateSecondRotationDegrees(secondRotationDegrees);

    }
  }

  onStopClockClick()
  {

    if (this.buttonText === 'STOP')
    {
      this.ClockHourHandStopService.stopClock();
      this.scrollToTop();
      this.ForHandsStopTextChangeService.updateButtonText('RESET');
    }

  }

  scrollToTop()
  {
    const topPos = 0;

    window.scrollTo({
      top: topPos,
      behavior: 'smooth'
    });

    const divElement = document.querySelector('.center-dot');
      if (divElement) {
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
      const angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI);
      this.secondAngle = angle;
  }

  calculateTime()
  {
      this.secondangleT = this.secondAngle + 180 -1;

      if (this.secondangleT <= 0)
      {
        this.secondangleT += 360;
      }

      let seconds = Math.floor(this.secondAngle / 6) - 30;
        // If seconds is negative, add 60 to make it positive
      seconds = (seconds < 0) ? seconds + 60 : seconds;
        // If seconds is 0, set it to 60
      seconds = (seconds === 0) ? 60 : seconds;
        // If seconds is greater than 60, take modulus to make it between 1 to 60
      seconds = seconds % 60;

      this.SecondHandAatService.updateHourAngle(this.secondangleT);

      return { seconds };
  }

  get secondValue()
  {
    return this.calculateTime().seconds;
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
      let deltaAngle = this.secondAngle;

      deltaAngle %= 360;
      if (deltaAngle < 0)
      {
          deltaAngle += 360;
      }

      // Calculate the change in position based on the normalized delta angle
      const deltaX = (this.secondRadius * Math.cos(deltaAngle * Math.PI / 180) - 4);
      const deltaY = (this.secondRadius * Math.sin(deltaAngle * Math.PI / 180) - 3.2);

      this.secXPos = deltaX;
      this.secYPos = deltaY;
  }


}

