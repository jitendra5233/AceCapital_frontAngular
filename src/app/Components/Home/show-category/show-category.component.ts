import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

// install Swiper modules
// SwiperCore.use([Navigation, Pagination]);

declare var $: any;

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css'],
})
export class ShowCategoryComponent {
  constructor(public ds: DataService, private router: Router) {}
  allPropertyTypes: any = [];

  @Input() homeData: any;

  customOptions: OwlOptions = {
    loop: false,
    dots: true,
    autoplay: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  ngOnInit(): void {
    this.getPropertyType();
    this.runSlider();
  }

  runSlider() {}

  getPropertyType() {
    this.ds.getPropertType().subscribe((response: any) => {
      let a = false;
      response.map((x: any) => {
        if (a) {
          x.status = 'py-5';
        } else {
          x.status = a;
        }
        this.allPropertyTypes.push(x);
        a = !a;
      });
    });
  }

  openUrl(id: string) {
    let url = 'property-search';
    let purpose: any = 1;
    let currentActiveState: any = 1;

    localStorage.setItem('currentActiveState', currentActiveState);
    localStorage.setItem('purpose', purpose);
    localStorage.setItem('propertyType', id);
    localStorage.setItem('propertyLocation', '');
    localStorage.setItem('currentRoute', url);

    this.router.navigateByUrl(url);
  }
}
