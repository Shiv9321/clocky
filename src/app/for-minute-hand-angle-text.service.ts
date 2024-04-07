import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ForMinuteHandAngleTextService
{

  constructor() { }

  private minuteRotationDegreesSubject = new BehaviorSubject<number>(0);
  minuteRotationDegrees$ = this.minuteRotationDegreesSubject.asObservable();

  updateMinuteRotationDegrees(degrees: number)
  {
    this.minuteRotationDegreesSubject.next(degrees);
  }

}
