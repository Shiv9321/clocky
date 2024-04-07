import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-inner-digits',
  templateUrl: './clock-inner-digits.component.html',
  styleUrl: './clock-inner-digits.component.sass'
})
export class ClockInnerDigitsComponent implements OnInit
{
  numbers!: { value: number, style: any }[];

  constructor() { }

  ngOnInit(): void
  {
    const width = 55;
    const height = 55;
    const radius = Math.min(width, height) / 2;
    const centerX = -0.9; // center X coordinate in %
    const centerY = -1.25; // center Y coordinate in %
    const numPoints = 12;

    this.numbers = Array.from({ length: numPoints }, (_, i) =>
    {
      const angle = (360 / numPoints) * i;
      const radians = angle * Math.PI / 180 - (60.5 * Math.PI / 180);
      const x = centerX + radius * Math.cos(radians);
      const y = centerY + radius * Math.sin(radians);

    return{

        value: i + 1,

        style: {
          left: `${x}vmin`,
          top: `${y}vmin`
        }

      };

    });

  }
}
