import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog } from '@angular/material/dialog';
import { BookModelComponent } from '../book-model/book-model.component';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

import { FormGroup, FormControl } from '@angular/forms';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent {
  @Input() propertyDetaildata: any;

  constructor(
    private router: ActivatedRoute,
    public ds: DataService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  propertyId: any = 0;

  propertyDetail: any = [];

  agentTimeSlot: any = [];

  nearBy: any = [];

  Ameneties: any = [];

  fname: any = '';

  active1 = 'active';
  active2 = '';
  active3 = '';

  iframeUrl: any = '';

  getSafeUrl(url: any) {
    // console.log(this.propertyDetail);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnInit(): void {
    this.propertyId = this.router.snapshot.params['id'];
    this.getPropertyDetails();
    this.getHolidays();
  }

  getDistence(l1: any, l2: any) {
    let directionsService = new google.maps.DirectionsService();

    let directionsRenderer = new google.maps.DirectionsRenderer();
    const route: any = {
      origin: l1,
      destination: l2,
      travelMode: 'DRIVING',
    };

    directionsService.route(route, function (response: any, status) {
      // anonymous function to capture directions
      if (status !== 'OK') {
        return;
      } else {
        directionsRenderer.setDirections(response); // Add route to the map
        var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
        if (!directionsData) {
          return;
        } else {
          return directionsData;
        }
      }
    });
  }

  getAgentTimeSloat() {
    let data = new FormData();
    data.append('id', this.propertyDetail.userId);
    this.ds.getAgentTimesloat(data).subscribe((response: any) => {
      this.agentTimeSlot = response;
    });
  }

  getPropertyDetails() {
    let data = new FormData();
    data.append('id', this.propertyId);
    this.ds.getPropertyDetails(data).subscribe((response: any) => {
      this.propertyDetail = response[0];

      console.log('ok 1')
      if (this.propertyDetail.nearbyJson != '' && this.propertyDetail.nearbyJson != 'no') {
        let nearbyJson = JSON.parse(this.propertyDetail.nearbyJson);
        this.nearBy = nearbyJson;
      }

      if (this.propertyDetail.Ameneties != '' && this.propertyDetail.nearbyJson != undefined) {
        let Ameneties = JSON.parse(this.propertyDetail.ameneties);
        this.Ameneties = Ameneties;
      }
      
      console.log('ok 2')
      this.iframeUrl = this.getSafeUrl(
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyAoyZ_yVsI5N8KhjbWRyQeme1Pfz2DRYYc&q=${this.propertyDetail.address}`
      );

      this.getAgentTimeSloat();

      this.nearBy.map((x: any) => {
        x.places.map((z: any) => {
          let directionsService = new google.maps.DirectionsService();

          let directionsRenderer = new google.maps.DirectionsRenderer();
          const route: any = {
            origin: this.propertyDetail.address,
            destination: z.name,
            travelMode: 'DRIVING',
          };

          directionsService.route(route, function (response: any, status) {
            // anonymous function to capture directions
            if (status !== 'OK') {
              console.log('error');
            } else {
              directionsRenderer.setDirections(response); // Add route to the map
              var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
              if (!directionsData) {
                console.log('error');
              } else {
                z.distance = directionsData.distance.text;
                z.duration = directionsData.duration.text;
              }
            }
          });
        });
      });
    });
  }

  BookTour() {
    const dialogRef = this.dialog.open(BookModelComponent, {
      data: {
        propertyData: this.propertyDetail,
        agentTimeSlot: this.agentTimeSlot,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Swal.fire('Request Submited', '', 'success');
    });
  }

  changeActive(no: number) {
    if (no == 1) {
      this.active1 = 'active';
      this.active2 = '';
      this.active3 = '';
    }
    if (no == 2) {
      this.active2 = 'active';
      this.active1 = '';
      this.active3 = '';
    }
    if (no == 3) {
      this.active3 = 'active';
      this.active2 = '';
      this.active1 = '';
    }
  }

  getHolidays() {
    this.ds.getHolidays().subscribe((response: any) => {
      // console.log(response);
    });
  }
}
