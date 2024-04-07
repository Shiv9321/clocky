import { Component, OnInit, OnDestroy,
  ElementRef, AfterViewInit , EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-clock-inner-circle',
  templateUrl: './clock-inner-circle.component.html',
  styleUrl: './clock-inner-circle.component.sass'
})

export class ClockInnerCircleComponent implements OnInit, OnDestroy , AfterViewInit
{
  radius!: string;
  isRed: boolean = false;
  isGreen: boolean = false;

  constructor(private elementRef: ElementRef)
  { }

  ngOnInit(): void
  {
    this.makeGreenForTwoSeconds();
  }

  ngAfterViewInit(): void
  {
    setTimeout(() => {
      this.calculateDynamicRadius();
    });
  }

  private calculateDynamicRadius(): void
  {
    const width = 60;
    const height= 60;
    this.radius = `min(${width}vw, ${height}vh)`;
  }

  ngOnDestroy(): void
  {

  }

  makeRed()
  {
    this.isRed = true;
    setTimeout(() => {
      this.isRed = false;
    }, 1000);
  }

  makeGreenForTwoSeconds()
  {
    this.isGreen = true;

    setTimeout(() =>
    {
      this.isGreen = false;
    }, 1250);

  }

}

