import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  myAccountData: any = '';
  isLoadingBool: boolean = true;

  constructor(public service: ServicesService, public title: Title,public router: Router) {
    this.getMyaccountDetails()
  }

  ngOnInit(): void {
    this.title.setTitle('My-account | Ksolves-store');
  }

  getMyaccountDetails() {
    this.service.getAllData('my/home').subscribe(res => {
      this.isLoadingBool = false
      this.myAccountData = res.data;
    })
  }
}