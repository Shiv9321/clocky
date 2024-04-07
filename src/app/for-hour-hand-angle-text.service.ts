import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ForHourHandAngleTextService
{

  constructor() { }

  private hourRotationDegreesSubject = new BehaviorSubject<number>(0);
  hourRotationDegrees$ = this.hourRotationDegreesSubject.asObservable();

  updateHourRotationDegrees(degrees: number)
  {
    this.hourRotationDegreesSubject.next(degrees);
  }

}
