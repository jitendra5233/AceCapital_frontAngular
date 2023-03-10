import { Component } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-off-plan',
  templateUrl: './off-plan.component.html',
  styleUrls: ['./off-plan.component.css'],
})
export class OffPlanComponent {
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    public ds: DataService,
    private router: Router,
    private metaService: Meta
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
    this.metaService.updateTag({
      name: 'description',
      content: this.route.snapshot.data['description'],
    });
  }

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

  allPropertyTypes: any = [];
  allPropertyTypes2: any = [];
  allSubProjects: any = [];

  filterArr: any = [];

  homeData: any = [];

  curentDevloper = 'Developer';

  ngOnInit(): void {
    this.getPropertyType();
    this.getData();
    this.metaService.addTag({
      name: 'description',
      content: 'description1',
    });
  }

  getData() {
    this.ds.getHomeData().subscribe((response: any) => {
      this.homeData = response[0];
      console.log(this.homeData);
    });
  }

  getPropertyType() {
    this.ds.getProjects().subscribe((response: any) => {
      this.ds.getAllSubProject().subscribe((response2: any) => {
        this.allPropertyTypes = response;
        this.allPropertyTypes2 = response;
        this.allSubProjects = response2;
        this.filterData({ id: 0, name: 'all' });
      });
    });
  }

  openUrl(data: any) {
    this.router.navigateByUrl('project-view/' + data.id);
  }

  filterData(data: any) {
    if (data.id == 0) {
      this.filterArr = [];

      this.allPropertyTypes.map((x: any) => {
        this.filterArr.push(x);
      });

      this.allSubProjects.map((x: any) => {
        this.filterArr.push(x);
      });
    } else {
      this.filterArr = [];

      this.allSubProjects.map((x: any) => {
        if (x.projectId == data.id) {
          this.filterArr.push(x);
        }
      });
    }
  }

  openProject(data: any) {
    this.router.navigateByUrl('project-view/' + data.id);
  }
}
