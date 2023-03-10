import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-two-type-card',
  templateUrl: './two-type-card.component.html',
  styleUrls: ['./two-type-card.component.css'],
})
export class TwoTypeCardComponent {
  constructor(private router: Router, public ds: DataService) {}

  homeData: any = [];

  imgcard1 = '';
  imgcard2 = '';

  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData() {
    this.ds.getHomeData().subscribe((response: any) => {
      this.homeData = response[0];
      this.imgcard1 = JSON.stringify(
        this.ds.baseurl + '/media/images/' + this.homeData.img1
      );
      this.imgcard2 = JSON.stringify(
        this.ds.baseurl + '/media/images/' + this.homeData.img2
      );
    });
  }

  openUrl(url: string) {
    let purpose: any = '';
    let currentActiveState: any = 1;

    if (url == 'buy') {
      purpose = 1;
    }

    if (url == 'rent') {
      purpose = 2;
    }

    if (url == 'off-plan') {
      currentActiveState = 3;
      purpose = 1;
    }

    if (url == 'propertySsearch') {
      purpose = 1;
      url = 'property-search';
    }
    localStorage.setItem('currentActiveState', currentActiveState);
    localStorage.setItem('purpose', purpose);
    localStorage.setItem('propertyType', '');
    localStorage.setItem('propertyLocation', '');
    localStorage.setItem('currentRoute', url);

    this.router.navigateByUrl(url);
  }

  opencustomlink(link: any) {
    window.location.href = link;
  }
}
