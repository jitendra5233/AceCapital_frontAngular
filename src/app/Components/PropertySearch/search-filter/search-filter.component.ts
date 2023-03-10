import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent {
  constructor(
    public ds: DataService,
    private router: Router,
    private aroute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  currentDataMin: any = [];
  currentDataMax: any = [];

  buyDataSetMin: any = [];
  buyDataSetMax: any = [];

  rentDataSetMin = [];
  rentDataSetMax = [];

  name = "I'm child";

  showResult = false;

  @Input() childInc: any;

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

  activeBtn1 = 'ace-btn-primary-n';
  activeBtn2 = '';
  activeBtn3 = '';
  sortOption = 1;

  currentActiveState1 = false;
  currentActiveState2 = true;
  currentActiveState3 = false;

  fullwidth = true;

  fullbtn2 = 'active';
  fullbtn1 = '';

  minSize: any = 0;
  maxValue: any = 7500;

  // options: Options = {
  //   floor: 0,
  //   ceil: 7500,
  // };

  value7: number = 0;
  highValue7: number = 5000;
  options7: Options = {
    floor: 0,
    ceil: 5000,
  };

  value8: number = 0;
  highValue8: number = 5000;
  options8: Options = {
    floor: 0,
    ceil: 5000,
  };

  value2: number = 10;
  highValue2: number = 100000;
  options2: Options = {
    floor: 0,
    ceil: 100000000,
    step: 1000,
  };

  differValue:any = 0

  pType: any = '0';
  purpose: any = '1';
  minPrice = 0;
  maxPrice = 100;
  beds = '00';

  allPropertyTypes: any = [];
  allPropertys: any = [];
  propertyLocation: any = '';
  currentPropertyType: any = 0;
  currentPropertyPurpose: any = 'Buy';

  homeData: any = [];

  ngOnInit(): void {
    this.spinner.show();
    this.setData();
    this.getData();
  }

  getData() {
    this.ds.getHomeData().subscribe((response: any) => {
      this.homeData = response[0];

      let min = JSON.parse(this.homeData.min_price_buy);
      let max = JSON.parse(this.homeData.max_price_buy);
      let diff = JSON.parse(this.homeData.diff_val_buy);

      this.minPrice = min;
      this.maxPrice = max;
      this.value2 = min;
      this.highValue2 = max;
      this.differValue = diff;

      this.getPropertyType();
      this.handleSubmitFilter();
      let minArr: any = [];
      let maxArr: any = [];

      diff -= 1;

      for (let i = min; i <= max; i++) {
        if (i != max) {
          minArr.push({ value: i, name: 'AED ' + i });
        }
        i = i + diff;
      }

      for (let i = min; i <= max; i++) {
        if (i != 0) {
          maxArr.push({ value: i, name: 'AED ' + i });
        }
        i = i + diff;
      }

      this.buyDataSetMin = minArr;
      this.buyDataSetMax = maxArr;

      let minR = JSON.parse(this.homeData.min_price_rent);
      let maxR = JSON.parse(this.homeData.max_price_rent);
      let diffR = JSON.parse(this.homeData.diff_val_rent);

      let minArrR: any = [];
      let maxArrR: any = [];

      diff -= 1;

      for (let i = minR; i <= maxR; i++) {
        if (i != maxR) {
          minArrR.push({ value: i, name: 'AED ' + i });
        }
        i = i + diffR;
      }

      for (let i = minR; i <= maxR; i++) {
        if (i != 0) {
          maxArrR.push({ value: i, name: 'AED ' + i });
        }
        i = i + diffR;
      }

      this.rentDataSetMin = minArrR;
      this.rentDataSetMax = maxArrR;

      if (this.purpose == 1) {
        this.currentDataMin = this.buyDataSetMin;
        this.currentDataMax = this.buyDataSetMax;
      }

      if (this.purpose == 2) {
        this.currentDataMin = this.rentDataSetMin;
        this.currentDataMax = this.rentDataSetMax;
      }
    });
  }

  setData() {
    this.propertyLocation = localStorage.getItem('propertyLocation');
    this.pType = localStorage.getItem('propertyType');
    this.pType = this.pType == '' ? 0 : this.pType;
    this.purpose = localStorage.getItem('purpose');

    let currentActiveState: any = localStorage.getItem('currentActiveState');
    if (currentActiveState == 1) {
      this.currentActiveState1 = true;
      this.currentActiveState2 = false;
      this.currentActiveState3 = false;
    }
    if (currentActiveState == 2) {
      this.currentActiveState2 = true;
      this.currentActiveState1 = false;
      this.currentActiveState3 = false;
    }
    if (currentActiveState == 3) {
      this.currentActiveState3 = true;
      this.currentActiveState1 = false;
      this.currentActiveState2 = false;
    }
  }

  getPropertyType() {
    this.ds.getPropertType().subscribe((response: any) => {
      response.map((x: any) => {
        this.allPropertyTypes.push(x);
      });
      this.spinner.hide();
      this.showResult = true;
    });
  }

  getFilterData() {
    // console.log('ok');
  }

  AddressChange(address: any) {
    this.propertyLocation = address.formatted_address;
    console.log(address.formatted_address);
  }

  handleSubmitFilter(click: any = false) {
    if (this.purpose == 1) {
      this.currentDataMin = this.buyDataSetMin;
      this.currentDataMax = this.buyDataSetMax;
    }

    if (this.purpose == 2) {
      this.currentDataMin = this.rentDataSetMin;
      this.currentDataMax = this.rentDataSetMax;
    }

    let check1: any = this.currentActiveState1 == true ? 1 : 0;
    let check2: any = this.currentActiveState2 == true ? 1 : 0;
    let check3: any = this.currentActiveState3 == true ? 1 : 0;

    let btnFilter: any = document.getElementById('btnFilter');

    if (click) {
      btnFilter.click();
    }

    let location: any = document.getElementById('locationTextField2');
    this.propertyLocation = location.value;

    let data: any = new FormData();
    data.append('propertyLocation', this.propertyLocation);
    data.append('pType', this.pType);
    data.append('purpose', this.purpose);
    data.append('minPrice', this.minPrice);
    data.append('maxPrice', this.maxPrice);
    data.append('beds', this.beds);
    data.append('minSize', this.value7);
    data.append('minValue', this.highValue7);
    data.append('check1', check1);
    data.append('check2', check2);
    data.append('check3', check3);

    this.ds.getPropertBySearchFilter(data).subscribe((response: any) => {
      this.allPropertys = [];
      response.map((x: any) => {
        this.allPropertys.push(x);
      });
      this.allPropertys = this.allPropertys.sort((a: any, b: any) => {
        let na = parseInt(a.price.replace(',', ''), 10);
        let nb = parseInt(b.price.replace(',', ''), 10);
        return Number(na) - Number(nb);
      });
    });
  }

  getAllProperty() {
    let currentActiveState: any = localStorage.getItem('currentActiveState');
    if (currentActiveState == 1) {
      this.currentActiveState1 = true;
      this.currentActiveState2 = false;
      this.currentActiveState3 = false;
    }
    if (currentActiveState == 2) {
      this.currentActiveState2 = true;
      this.currentActiveState1 = false;
      this.currentActiveState3 = false;
    }
    if (currentActiveState == 3) {
      this.currentActiveState3 = true;
      this.currentActiveState1 = false;
      this.currentActiveState2 = false;
    }
    let purpose: any = localStorage.getItem('purpose');
    let propertyType: any = localStorage.getItem('propertyType');
    let propertyLocation: any = localStorage.getItem('propertyLocation');

    let data = new FormData();
    data.append('currentActiveState', currentActiveState);
    data.append('purpose', purpose);
    data.append('propertyType', propertyType);
    data.append('propertyLocation', propertyLocation);

    this.ds.getPropertBySearch(data).subscribe((response: any) => {
      console.log(response);
      response.map((x: any) => {
        this.allPropertys.push(x);
      });
    });
  }
  openPropery(row: any) {
    this.router.navigateByUrl('/property-detail/' + row.id);
  }
  upadatefilterCheck(num: any) {
    if (num == 1) {
      this.currentActiveState1 = true;
      this.currentActiveState2 = false;
      this.currentActiveState3 = false;
    }
    if (num == 2) {
      this.currentActiveState2 = true;
      this.currentActiveState1 = false;
      this.currentActiveState3 = false;
    }
    if (num == 3) {
      this.currentActiveState3 = true;
      this.currentActiveState2 = false;
      this.currentActiveState1 = false;
    }
    localStorage.setItem('currentActiveState', num);
  }

  filterSort() {
    if (this.sortOption == 1) {
      this.allPropertys = this.allPropertys.sort((a: any, b: any) => {
        let na = parseInt(a.price.replace(',', ''), 10);
        let nb = parseInt(b.price.replace(',', ''), 10);
        return Number(na) - Number(nb);
      });
    }
    if (this.sortOption == 2) {
      this.allPropertys = this.allPropertys.sort((a: any, b: any) => {
        let na = parseInt(a.price.replace(',', ''), 10);
        let nb = parseInt(b.price.replace(',', ''), 10);
        return Number(nb) - Number(na);
      });
      // this.allPropertys = this.allPropertys.reverse();
    }
    console.log(this.allPropertys);
  }

  changeGrid(i: number) {
    if (i == 2) {
      this.fullwidth = true;
      this.fullbtn2 = 'active';
      this.fullbtn1 = '';
    } else {
      this.fullwidth = false;
      this.fullbtn1 = 'active';
      this.fullbtn2 = '';
    }
  }
}
