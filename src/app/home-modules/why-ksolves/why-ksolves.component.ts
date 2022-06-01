import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-ksolves',
  templateUrl: './why-ksolves.component.html',
  styleUrls: ['./why-ksolves.component.scss']
})
export class WhyKsolvesComponent implements OnInit {
  isMobile = false;

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 769;
    if (w < breakpoint) {
        return true;
    } else {
        return false;
  
    }}

  constructor() { }

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
        this.isMobile = this.getIsMobile();
    };
  }

  ngAfterContentInit() { 
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
        this.isMobile = this.getIsMobile();
    };
  }
}
