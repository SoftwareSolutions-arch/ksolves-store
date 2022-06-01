import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'


@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private history: string[] = []

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.urlAfterRedirects!='/'){
          this.history.push(event.urlAfterRedirects)
        }
      }
    })
  }

  // This back() method is used to redirect to previous route/home
  // If any routes in history, it redirects to previous route
  // If no routes in history, it redirects to home
  back(): void {
    this.history.pop()
    if (this.history.length > 0) {
      this.location.back()
    } else {
      this.router.navigateByUrl('/')
    }
  }
}
