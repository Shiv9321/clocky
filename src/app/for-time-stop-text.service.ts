import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ForTimeStopTextService{


  constructor() { }

  private StoptextSubject = new BehaviorSubject<string>('');
  Stoptext$ = this.StoptextSubject.asObservable();

  private RTtextSubject = new BehaviorSubject<string>('');
  RTtext$ = this.RTtextSubject.asObservable();

  private ATtextSubject = new BehaviorSubject<string>('');
  ATtext$ = this.ATtextSubject.asObservable();

  private runningtextSubject = new BehaviorSubject<string>('');
  runningtext$ = this.runningtextSubject.asObservable();

  private adjustedtextSubject = new BehaviorSubject<string>('');
  adjustedtext$ = this.adjustedtextSubject.asObservable();

  updateStoptext(text: string)
  {
    this.StoptextSubject.next(text);
  }

  updateRTtext(text: string)
  {
    this.RTtextSubject.next(text);
  }

  updateATtext(text: string)
  {
    this.ATtextSubject.next(text);
  }

  updaterunningtext(text: string)
  {
    this.RTtextSubject.next(text);
  }

  updateadjustedtext(text: string)
  {
    this.ATtextSubject.next(text);
  }

}
