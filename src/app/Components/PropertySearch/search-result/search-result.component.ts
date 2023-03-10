import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent {
  constructor(private ds: DataService) {}

  activeBtn1 = 'ace-btn-primary-n';
  activeBtn2 = '';
  activeBtn3 = '';

  @Input() dataPassAr: any;

  allPropertyTypes: any = [];

  currentActiveState: any = '';
  purpose: any = '';
  propertyType: any = '';
  propertyLocation: any = '';

  ngOnInit(): void {
    // this.getPropertyType();
    this.getAllProperty();
    // console.log(this.dataPassAr);
  }

  callMe(value: string) {
    console.log('Called : ' + value);
  }

  callMethod() {
    console.log('successfully executed.');
  }

  getPropertyType() {
    this.ds.getProperts('ok').subscribe((response: any) => {
      response.map((x: any) => {
        this.allPropertyTypes.push(x);
      });
    });
  }

  getAllProperty() {
    this.currentActiveState = localStorage.getItem('currentActiveState');
    this.purpose = localStorage.getItem('purpose');
    this.propertyType = localStorage.getItem('propertyType');
    this.propertyLocation = localStorage.getItem('propertyLocation');

    let data = new FormData();
    data.append('currentActiveState', this.currentActiveState);
    data.append('purpose', this.purpose);
    data.append('propertyType', this.propertyType);
    data.append('propertyLocation', this.propertyLocation);

    this.ds.getPropertBySearch(data).subscribe((response: any) => {
      response.map((x: any) => {
        this.allPropertyTypes.push(x);
      });
    });
  }
}
