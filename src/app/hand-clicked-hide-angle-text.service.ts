import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HandClickedHideAngleTextService
{

  private handClickedSource = new Subject<boolean>();
  handClicked$ = this.handClickedSource.asObservable();

  constructor() { }

  setHandClicked(clicked: boolean)
  {
    this.handClickedSource.next(clicked);
  }

}
