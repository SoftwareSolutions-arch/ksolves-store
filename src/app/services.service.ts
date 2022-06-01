import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ToasterPosition } from './positionClass';
import { privateKey } from './config';
import { environment } from '../environments/environment';
const sign = require('jwt-encode');

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseurl = environment.base_url;
  front_end_url = environment.front_end_url;

  constructor(public http: HttpClient, private toastr: ToastrService) { }

  // post method
  post(endPoint: any, data: any): Observable<any> {
    return this.http.post(this.baseurl + endPoint, data, {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + localStorage.getItem('sessionId') ?? []
      }), observe: "response"
    });
  }

  // get method
  get(endPoint: any): Observable<any> {
    const requestOptions: Object = {
      observe: 'response',
    }
    return this.http.get(this.baseurl + endPoint, requestOptions);
  }

  getAllData(endPoint: any): Observable<any> {
    var httpOptions
    if (localStorage.getItem('sessionId') != null) {
      httpOptions = {
        headers: new HttpHeaders({
          authorization: 'Bearer ' + localStorage.getItem('sessionId') ?? []
        })
      }
    } else {
      httpOptions = {

        headers: new HttpHeaders({
          authorization: 'Bearer ' + this.encodingData({ "public_user": 'true' })
        })
      }
    }

    return this.http.get(this.baseurl + endPoint, httpOptions);
  }

  get3(endPoint: any, paramObj?: any): Observable<any> {
    let httpOptions = {
      params: paramObj,
      headers: new HttpHeaders({
        authorization: 'Bearer ' + localStorage.getItem('sessionId')
      })
    }
    return this.http.get(this.baseurl + endPoint, httpOptions);
  }

  get4(endPoint: any, paramObj?: any): Observable<any> {
    var httpOptions
    if (localStorage.getItem('sessionId') != null) {
      httpOptions = {
        observe: paramObj,
        headers: new HttpHeaders({
          authorization: 'Bearer ' + localStorage.getItem('sessionId') ?? []
        })
      }
    } else {
      httpOptions = {
        observe: paramObj,
        headers: new HttpHeaders({
          authorization: 'Bearer ' + this.encodingData({ "public_user": 'true' })
        })
      }
    }
    return this.http.get(this.baseurl + endPoint, httpOptions);
  }

  get5(endPoint: any, paramObj?: any): Observable<any> {
    var httpOptions
    if (localStorage.getItem('sessionId') != null) {
      httpOptions = {
        params: paramObj,
        headers: new HttpHeaders({
          authorization: 'Bearer ' + localStorage.getItem('sessionId') ?? []
        })
      }
    } else {
      httpOptions = {
        params: paramObj,
        headers: new HttpHeaders({
          authorization: 'Bearer ' + this.encodingData({ "public_user": 'true' })
        })
      }
    }
    return this.http.get(this.baseurl + endPoint, httpOptions);
  }

  encodingData(token: any) {
    return sign(token, privateKey, { alg: "HS256" });
  }

  // success toast message
  success(title: string, message: string, positionClass: ToasterPosition) {
    this.toastr.success(message, title, { positionClass });
  }

  // error toast message
  error(title: string, message: string, positionClass: ToasterPosition) {
    this.toastr.error(message, title, { positionClass });
  }
}
