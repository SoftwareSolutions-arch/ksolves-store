import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-support-and-maintenance',
  templateUrl: './support-and-maintenance.component.html',
  styleUrls: ['./support-and-maintenance.component.scss']
})
export class SupportAndMaintenanceComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Support-and-maintanince | Ksolves-store');
  }

}
