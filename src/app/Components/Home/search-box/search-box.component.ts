import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  constructor(private ds: DataService, private router: Router) {}

  activeBtn1 = 'green-active';
  activeBtn2 = '';
  activeBtn3 = '';

  currentActiveState: any = 1;

  allPropertyTypes: any = [];

  purpose: any = 1;
  propertyType: any = 0;
  propertyLocation: any = '';

  ngOnInit(): void {
    this.getPropertyType();
  }

  getPropertyType() {
    this.ds.getPropertType().subscribe((response: any) => {
      response.map((x: any) => {
        this.allPropertyTypes.push(x);
      });
    });
  }

  cahngeTab(n: number) {
    this.currentActiveState = n;
    if (n == 1) {
      this.activeBtn1 = 'green-active ';
      this.activeBtn2 = '';
      this.activeBtn3 = '';
    }
    if (n == 2) {
      this.activeBtn2 = 'green-active ';
      this.activeBtn1 = '';
      this.activeBtn3 = '';
    }
    if (n == 3) {
      this.activeBtn3 = 'green-active ';
      this.activeBtn2 = '';
      this.activeBtn1 = '';
    }
  }

  handleSearch() {
    let location: any = document.getElementById('locationTextField');
    this.propertyLocation = location.value;
    localStorage.setItem('currentActiveState', this.currentActiveState);
    localStorage.setItem('purpose', this.purpose);
    localStorage.setItem('propertyType', this.propertyType);
    localStorage.setItem('propertyLocation', this.propertyLocation);
    localStorage.setItem('currentRoute', 'property-search');
    this.router.navigateByUrl('/property-search');
  }

  AddressChange(address: any) {
    this.propertyLocation = address.formatted_address;
    console.log(address.formatted_address)
  }
}
