import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss']
})
export class SuccessStoriesComponent implements OnInit {

  constructor(public title: Title) { 
    this.title.setTitle('Success-stories | Ksolves-store');
  }

  ngOnInit(): void {
  }

}
