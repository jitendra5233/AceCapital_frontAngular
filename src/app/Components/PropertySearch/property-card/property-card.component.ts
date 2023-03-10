import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent implements OnInit {
  constructor(public ds: DataService, private router: Router) {}
  @Input() cardData: any;
  currentActiveState: any = 0;

  nearbyJson: any = [
    {
      name: 'no data available',
    },
  ];

  ngOnInit() {
    if (this.cardData.nearbyJson != 'no') {
      this.nearbyJson = JSON.parse(this.cardData.nearbyJson);
    }

    this.currentActiveState = localStorage.getItem('currentActiveState');

    if (this.cardData.propertyImages[1] == undefined) {
      this.cardData.propertyImages[1] = this.cardData.propertyImages[0];
    }
    if (this.cardData.propertyImages[2] == undefined) {
      this.cardData.propertyImages[2] = this.cardData.propertyImages[0];
    }
    if (this.cardData.imgType == 'url') {
      this.cardData.propertyImages = JSON.parse(
        this.cardData.propertyImages[0]
      );
    }
  }
  openPropery() {
    this.router.navigateByUrl('/property-detail/' + this.cardData.id);
  }

  openMap() {
    window.open(
      'https://www.google.com/maps/place/' + this.cardData.address,
      '_blank'
    );
  }
}
