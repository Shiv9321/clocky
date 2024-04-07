import { Component,OnInit } from '@angular/core';
import { ClockHourHandStopService } from '../clock-hour-hand-stop.service';
import {ForHandsStopTextChangeService} from '../for-hands-stop-text-change.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {ForTimeStopTextService} from '../for-time-stop-text.service';
import { HandClickedHideAngleTextService } from '../hand-clicked-hide-angle-text.service';

@Component({
  selector: 'app-show-adjustment-info-block',
  templateUrl: './show-adjustment-info-block.component.html',
  styleUrl: './show-adjustment-info-block.component.sass'
})

export class ShowAdjustmentInfoBlockComponent implements OnInit {

  stopClock: boolean = false;
  buttonText:string = 'STOP';
  private subscription: Subscription = new Subscription;

  stoptext:string = '';
  RTtext:string= '';
  ATtext:string='';

  handClicked: boolean = false;

  constructor(
                private ClockHourHandStopService: ClockHourHandStopService,
                private ForTimeStopTextService:ForTimeStopTextService,
              )
  { }

  ngOnInit(): void
  {
    this.ClockHourHandStopService.stopClock$.subscribe(() => {
      this.stopClockRotation();
    });


    this.subscription.add(
      this.ForTimeStopTextService.Stoptext$.subscribe((text) => {
        this.stoptext = text;
      })
    );

  }

  scrollToBottom()
  {
    const fullHeight = document.body.scrollHeight;

    window.scrollTo
    ({
      top: fullHeight,
      behavior: 'smooth'
    });

  }


  stopClockRotation()
  {
    this.stopClock = true;

    setTimeout(() =>
      {
      this.stopClock = false; // After 3 seconds, hide the arrow
    }, 3000);

  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

}

