import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class SecondHandAatService
{

  private hourAngleSource = new BehaviorSubject<number>(0);
  hourAngle$ = this.hourAngleSource.asObservable();

  constructor() { }

  updateHourAngle(hourangleT: number)
  {
    this.hourAngleSource.next(hourangleT);
  }

}
