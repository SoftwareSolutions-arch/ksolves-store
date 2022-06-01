import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})
export class PressComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Press | Ksolves-store');
  }

}
