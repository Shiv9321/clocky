import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ForSecondHandAngleTextService
{
  constructor() { }

  private secondRotationDegreesSubject = new BehaviorSubject<number>(0);
  secondRotationDegrees$ = this.secondRotationDegreesSubject.asObservable();

  updateSecondRotationDegrees(degrees: number)
  {
    this.secondRotationDegreesSubject.next(degrees);
  }

}
