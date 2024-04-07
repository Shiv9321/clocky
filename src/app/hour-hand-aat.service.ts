import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HourHandAatService
{

  private hourAngleSource = new BehaviorSubject<number>(0);
  hourAngle$ = this.hourAngleSource.asObservable();

  constructor() { }

  updateHourAngle(hourangleT: number)
  {
    this.hourAngleSource.next(hourangleT);
  }

}
