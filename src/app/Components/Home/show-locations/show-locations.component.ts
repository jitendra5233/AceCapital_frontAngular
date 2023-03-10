import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-show-locations',
  templateUrl: './show-locations.component.html',
  styleUrls: ['./show-locations.component.css'],
})
export class ShowLocationsComponent {
  constructor(public ds: DataService, private router: Router) {}
  allPropertyTypes: any = [];
  ngOnInit(): void {
    this.getPropertyType();
  }

  @Input() homeData: any;

  getPropertyType() {
    this.ds.getProjects().subscribe((response: any) => {
      let Arr: any = [];

      let length = response.length;

      let maxCount = 3;

      if (length >= 9) {
        maxCount = 9;
      } else if (length >= 6 && length < 9) {
        maxCount = 6;
      } else if (length >= 3 && length < 6) {
        maxCount = 3;
      } else {
        maxCount = 3;
      }

      response.map((x: any, i: any) => {
        if (i < maxCount) {
          Arr.push(x);
        }
      });

      this.allPropertyTypes = Arr;
    });
  }

  openProject(data: any) {
    this.router.navigateByUrl('project-view/' + data.id);
  }
}
