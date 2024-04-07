import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-to-support-block',
  templateUrl: './go-to-support-block.component.html',
  styleUrl: './go-to-support-block.component.sass'
})

export class GoToSupportBlockComponent implements OnInit
{
  showBox: boolean = false;

  constructor() { }

  ngOnInit(): void
  {

  }


  openBox() {
    this.showBox = true;
  }

  closeBox() {
    this.showBox = false;
  }

}

