import { Component, ElementRef, HostListener, OnInit, ViewChild,
          Inject,PLATFORM_ID, NgZone  } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ForMinuteHandAngleTextService } from '../for-minute-hand-angle-text.service';
import {ForHandsStopTextChangeService} from '../for-hands-stop-text-change.service';
import { Subscription } from 'rxjs';
import { HandClickedHideAngleTextService } from '../hand-clicked-hide-angle-text.service';
import { MinuteHandAatService } from '../minute-hand-aat.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-clock-minute-hand',
  templateUrl: './clock-minute-hand.component.html',
  styleUrl: './clock-minute-hand.component.sass'
})
export class ClockMinuteHandComponent implements OnInit
{

  minuteRotation: string = 'rotate(0deg) scale(1.5)'; // Initial rotation angle
  minuteRotationDegrees : number = 0;

  stopClock: boolean = false;

  isDragging: boolean = false;

  onStopClockClicked:boolean = false;

  buttonText:string = 'STOP';
  private subscription: Subscription = new Subscription;
  @ViewChild('draggable') draggable!: ElementRef;

  minuteAngle: number = 0;

  handClicked: boolean = false;

  minuteangleT: number = 0;

  minRadius: number = 15;

  minXPos:number = 0;
  minYPos:number = 0;

  constructor(
              private ClockHourHandStopService: ClockHourHandStopService,
              private router: Router,
              private ForMinuteHandAngleTextService: ForMinuteHandAngleTextService,
              private ForHandsStopTextChangeService: ForHandsStopTextChangeService,
              private elementRef: ElementRef,
              private HandClickedHideAngleTextService:HandClickedHideAngleTextService,
              private MinuteHandAatService:MinuteHandAatService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private ngZone: NgZone
            )
  { }

  ngOnInit(): void
  {

    if (isPlatformBrowser(this.platformId))
    {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.ngZone.run(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        });
    }

    this.updateClock();

    if (isPlatformBrowser(this.platformId))
    {
      this.ngZone.runOutsideAngular(() => {
        setInterval(() => {
          this.ngZone.run(() => {
            this.updateClock();
          });
        }, 1000);
      });
    }

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
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (!this.stopClock)
    {
      const minuteRotationDegrees = (minutes / 60) * 360 + ((seconds*6)/60);
      this.minuteRotation = `rotate(${minuteRotationDegrees}deg) scale(1.2)`;
    }

    if (!this.stopClock)
    {
      const minuteRotationDegrees = (minutes *6) + ((seconds*6)/60);

      this.ForMinuteHandAngleTextService.updateMinuteRotationDegrees(minuteRotationDegrees);
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
    if (isPlatformBrowser(this.platformId))
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

  }

  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: MouseEvent)
  {
    event.preventDefault();
    this.handClicked = true;
    this.isDragging = true;
    this.updateHourPosition(event);
    this.onStopClockClick();
    this.onClickHand();
    this.updatePositions();
  }

  @HostListener('touchstart', ['$event'])
  handleTouchDown(event: TouchEvent)
  {
    if (event.cancelable)
    {
      event.preventDefault();
    }
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
  @HostListener('document:touchend', ['$event'])
  handleMouseUp(event: MouseEvent| TouchEvent)
  {
    this.isDragging = false;
  }

  @HostListener('document:touchmove', ['$event'])
  handleTouchMove(event: TouchEvent)
  {
    if (this.isDragging)
    {
      this.updateHourPosition(event);
      this.updatePositions();
    }
  }

  private updateHourPosition(event: MouseEvent | TouchEvent)
  {
    const rect = this.draggable.nativeElement.getBoundingClientRect();
    let clientX, clientY;

    if (event instanceof MouseEvent)
    {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    else if (event instanceof TouchEvent && event.touches.length > 0)
    {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }
    else
    {
      return;
    }

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI);
    this.minuteAngle = angle;
  }


  calculateTime()
  {

    this.minuteangleT = this.minuteAngle + 1;

    if (this.minuteangleT <= 0)
    {
      this.minuteangleT += 360;
    }


    let minute = Math.floor(this.minuteAngle / 6);
      // If minute is negative, add 60 to make it positive
    minute = (minute < 0) ? minute + 60 : minute;
      // If minute is 0, set it to 60
    minute = (minute === 0) ? 60 : minute;
      // If minute is greater than 60, take modulus to make it between 1 to 60
    minute = minute % 60;

    this.MinuteHandAatService.updateHourAngle(this.minuteangleT);

    return { minute };

  }

  get minuteValue()
  {
    return this.calculateTime().minute;
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
      let deltaAngle = this.minuteAngle;

      deltaAngle %= 360;
      if (deltaAngle < 0)
      {
          deltaAngle += 360;
      }

      // Calculate the change in position based on the normalized delta angle
      // const deltaX = (this.minRadius * Math.cos(deltaAngle * Math.PI / 180) );
      // const deltaY = (this.minRadius * Math.sin(deltaAngle * Math.PI / 180) );

      const deltaX = 0;
      const deltaY = -15;

      this.minXPos = deltaX;
      this.minYPos = deltaY;
  }

}
