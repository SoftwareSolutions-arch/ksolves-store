import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-invoices-list-view',
  templateUrl: './invoices-list-view.component.html',
  styleUrls: ['./invoices-list-view.component.scss']
})
export class InvoicesListViewComponent implements OnInit {
  invoiceList: any = '';
  isLoadingBool: boolean = true;
  pagination: any = [];
  baseUrl: any = '';
  url: any = ''
  selectedIndex: any = 0;
  invoiceValue: any = '';

  constructor(public service: ServicesService,public title: Title, public router: Router, public sanitizer: DomSanitizer) {
   
    this.baseUrl = this.service.baseurl;
  }

  ngOnInit(): void {
    this.invoiceValue = localStorage.getItem('invoiceValue');
    if(this.invoiceValue==1){
      this.filterDataPage('');
    }
    else{
      this.getInvoiceList();
    }

    this.title.setTitle('Invoice-list | Ksolves-store');
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

  getInvoiceList() {
    this.service.getAllData('my/invoices').subscribe(res => {
      this.isLoadingBool = false;
      this.invoiceList = res;
      this.pagination = res.pager;
    })
  }

  sortBy(data: any) {
    this.isLoadingBool = true;
    this.service.get5('my/invoices?sortby=' + data,).subscribe(res => {
      this.isLoadingBool = false;
      this.invoiceList = res;
    })
  }


  filterDataPage(item: any) {
    if(item){
      this.isLoadingBool=true;
      this.selectedIndex = item.num-1;
      let str = item.url;
      str = str.substring(1);
      localStorage.setItem('invoice_page_number',this.selectedIndex)
      localStorage.setItem('invoice_link',str)
      this.service.get3(str).subscribe(res => {
        this.isLoadingBool=false;
        this.invoiceList = res;
        this.pagination = res.pager;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
    }

    else{
      this.isLoadingBool=true;
      this.selectedIndex = Number(localStorage.getItem('invoice_page_number'))
      var str = localStorage.getItem('invoice_link')
      this.service.get3(str).subscribe(res => {
        this.isLoadingBool=false;
        this.invoiceList = res;
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
    this.isLoadingBool=true;
    this.selectedIndex = this.pagination.page_previous.num-1
    let str = this.pagination.page_previous.url;
    str = str.substring(1);
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool=false;
      this.invoiceList = res;
      this.pagination = res.pager;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }

  nextPage() {
    this.isLoadingBool=true;
    this.selectedIndex = this.pagination.page_next.num-1
    let str = this.pagination.page_next.url;
    str = str.substring(1);
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool=false;
      this.invoiceList = res;
      this.pagination = res.pager;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }

  invoiceFormView(item: any) {
    localStorage.setItem('invoiceValue','1');
    let str = item.href;
    str = str.substring(1);
    this.router.navigateByUrl(str)
  }
}
