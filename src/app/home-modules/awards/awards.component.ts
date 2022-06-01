import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  
  customOptions: OwlOptions = {
    loop: true,
    margin: 15,
    autoplay: false,
    dots: false,
    navText: ["<img src='../../../assets/images/suggested-app/left.svg' width='40' height='40' alt='left arrow'>","<img src='../../../assets/images/suggested-app/right.svg' width='40' height='40' alt='right arrow'>"],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1100: {
        items: 4
      },
      1400: {
        items: 4
      }
    },
    nav: true
  }
  awards:any=[
    {
      'awardsImgpath':'assets/images/award/award-nse.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/award-good-firm.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/award-nasscom.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/award-silicon.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/selected-firms-mobile.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/award-top-developement.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/award-isv.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/selected-firms-ecommerce.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/award-salesforce.webp',
      'awards_link':'#'
    },

    {
      'awardsImgpath':'assets/images/award/award-top-developement.webp',
      'awards_link':'#'
    },
    {
      'awardsImgpath':'assets/images/award/award-isv.webp',
      'awards_link':'#'
    },
 ]
  constructor(private metaService: Meta) {
    this.metaService.addTag({ name: 'description', content: 'Article Description' });
    this.metaService.addTag({ name: 'robots', content: 'index,follow' });
    this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' });
   }

  ngOnInit(): void {
  }

}
