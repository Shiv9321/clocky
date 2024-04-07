import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClockHourHandStopService
{

  constructor() { }

  private stopClockSubject = new Subject<void>();

  stopClock$ = this.stopClockSubject.asObservable();

  stopClock()
  {
    this.stopClockSubject.next();
  }

}
