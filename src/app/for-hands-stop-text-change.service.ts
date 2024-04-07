import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForHandsStopTextChangeService {

  constructor() { }

  private buttonTextSubject = new BehaviorSubject<string>('STOP');
  buttonText$ = this.buttonTextSubject.asObservable();

  updateButtonText(text: string)
  {
    this.buttonTextSubject.next(text);
  }

}
