import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { Title } from '@angular/platform-browser';
import { constants } from 'buffer';
@Component({
  selector: 'app-sale-order-list',
  templateUrl: './sale-order-list.component.html',
  styleUrls: ['./sale-order-list.component.scss']
})
export class SaleOrderListComponent implements OnInit {
  saleOrderList: any = '';
  isLoadingBool: boolean = true;
  pagination: any = [];
  baseUrl: any = '';
  invoice_number: any = '';
  selectedIndex: any = 0;
  saleOrderValue: any = '';

  constructor(public service: ServicesService, public title: Title, public router: Router, public sanitizer: DomSanitizer) {
    this.baseUrl = this.service.baseurl;
  }

  ngOnInit(): void {
    this.saleOrderValue = localStorage.getItem('saleOrderValue');
    if (this.saleOrderValue == 1) {
      this.filterDataPage('');
    }
    else {
      this.getSaleOrderList();
    }
    this.title.setTitle('Sale-order-list | Ksolves-store');
    this.paymentFunction();
  }

  paymentFunction() {
    const dynamicScripts = [
      'assets/option.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  getSaleOrderList() {
    this.service.getAllData('my/orders').subscribe(res => {
      this.saleOrderList = res;
      this.pagination = res.pager;
      this.isLoadingBool = false;
    })
  }

  sortBy(data: any) {
    this.isLoadingBool = true;
    this.service.get5('my/orders?sortby=' + data,).subscribe(res => {
      this.saleOrderList = res;
      this.isLoadingBool = false;
    })
  }

  filterDataPage(item: any) {
    if (item) {
      this.isLoadingBool = true;
      this.selectedIndex = item.num - 1;
      let str = item.url;
      str = str.substring(1);
      localStorage.setItem('sale_page_number',this.selectedIndex)
      localStorage.setItem('sale_link',str)
      this.service.get3(str).subscribe(res => {
        this.isLoadingBool = false;
        this.saleOrderList = res;
        this.pagination = res.pager;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
    }

    else {
      this.isLoadingBool = true;
      this.selectedIndex = Number(localStorage.getItem('sale_page_number'))
      var str = localStorage.getItem('sale_link')
      this.service.get3(str).subscribe(res => {
        this.isLoadingBool = false;
        this.saleOrderList = res;
        this.pagination = res.pager;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
    }
  }

  previousPage() {
    this.isLoadingBool = true;
    this.selectedIndex = this.pagination.page_previous.num - 1
    let str = this.pagination.page_previous.url;
    str = str.substring(1);
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool = false;
      this.saleOrderList = res;
      this.pagination = res.pager;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }

  nextPage() {
    this.isLoadingBool = true;
    this.selectedIndex = this.pagination.page_next.num - 1
    let str = this.pagination.page_next.url;
    str = str.substring(1);
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool = false;
      this.saleOrderList = res;
      this.pagination = res.pager;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }

  salesFormView(item: any) {
    localStorage.setItem('saleOrderValue','1');
    let str = item.href;
    str = str.substring(1);
    this.router.navigateByUrl(str);
  }
}
