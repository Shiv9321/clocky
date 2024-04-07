import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-clock-circle-outer',
  templateUrl: './clock-circle-outer.component.html',
  styleUrl: './clock-circle-outer.component.sass'
})

export class ClockCircleOuterComponent implements OnInit, AfterViewInit
{
  radius!: string;
  numbers!: number[];
  angleIncrement!: number;

  constructor()
  { }

  ngOnInit()
  {

  }

  ngAfterViewInit(): void
  {
    setTimeout(() => {
      this.calculateDynamicRadius();
    });
  }

  private calculateDynamicRadius(): void
  {
    const width = 70;
    const height = 70;
    this.radius = `min(${width}vw, ${height}vh)`;
  }

}
