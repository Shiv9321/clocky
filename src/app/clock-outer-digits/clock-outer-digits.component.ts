import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-outer-digits',
  templateUrl: './clock-outer-digits.component.html',
  styleUrl: './clock-outer-digits.component.sass'
})

export class ClockOuterDigitsComponent implements OnInit
{
    numbers!: { value: number, style: any }[];

    constructor()
    { }

    ngOnInit(): void
    {
      const width = 65;
      const height = 65;

      const radius = Math.min(width, height) / 2;
      const centerX = -radius + 1.3; // center X coordinate in vmin
      const centerY = -1.2; // center Y coordinate in vmin
      const numPoints = 60; // number of points

      this.numbers = Array.from({ length: numPoints }, (_, i) => {
        const angle = (360 / numPoints) * i;
        const radians = angle * Math.PI / 180 - 84 * Math.PI / 180;
        const x = centerX + radius * Math.cos(radians);
        const y = centerY + radius * Math.sin(radians);
        return {
          value: i + 1,
          style: {
            left: `${x}vmin`,
            top: `${y}vmin`
          }
        };
      });
    }
  }
