import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(public ds: DataService, private router: Router) {}

  homeData: any = [];

  ngOnInit(): void {
    this.getPropertyType();
    this.getData();
  }

  getData() {
    this.ds.getHomeData().subscribe((response: any) => {
      this.homeData = response[0];

      this.homeData.ameneties = JSON.parse(this.homeData.ameneties);
    });
  }

  allPropertyTypes: any = [];
  fullyear = new Date().getFullYear();
  getPropertyType() {
    this.ds.getPropertType().subscribe((response: any) => {
      let Arr: any = [];
      response.map((x: any, i: any) => {
        if (i <= 4) {
          Arr.push(x);
        }
      });
      this.allPropertyTypes = Arr;
    });
  }

  openUrl(id: string) {
    let url = 'property-search';
    let purpose: any = 1;
    let currentActiveState: any = 1;

    console.log('ok');

    localStorage.setItem('currentActiveState', currentActiveState);
    localStorage.setItem('purpose', purpose);
    localStorage.setItem('propertyType', id);
    localStorage.setItem('propertyLocation', '');
    localStorage.setItem('currentRoute', url);

    // this.router.navigateByUrl(url);
    window.location.href = url;
  }

  openUrl2(url: string) {
    let purpose: any = '';
    let currentActiveState: any = 1;

    if (url == 'buy') {
      purpose = 1;
    }

    if (url == 'rent') {
      purpose = 2;
    }

    if (url == 'International') {
      currentActiveState = 1;
      purpose = 1;
      url = 'property-search';
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

    window.location.href = url;
  }
}
