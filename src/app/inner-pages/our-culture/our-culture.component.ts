import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-our-culture',
  templateUrl: './our-culture.component.html',
  styleUrls: ['./our-culture.component.scss']
})
export class OurCultureComponent implements OnInit {

  constructor(public title: Title) { }
  second_office_image: boolean = true;
  second_set_sportsimg: boolean = true;

  ngOnInit(): void {
    this.title.setTitle('Our-culture | Ksolves-store');
  }

  load_more() {
    this.second_office_image = !this.second_office_image;
  }
  load_more_sports() {
    this.second_set_sportsimg = !this.second_set_sportsimg;
  }
}
