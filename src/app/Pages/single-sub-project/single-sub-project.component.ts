import { Component } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-single-sub-project',
  templateUrl: './single-sub-project.component.html',
  styleUrls: ['./single-sub-project.component.css'],
})
export class SingleSubProjectComponent {
  constructor(
    public ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private sanitizer: DomSanitizer
  ) {}

  OpendProject: any = '';
  subProjects: any = [];

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

  id: any = 0;
  iframeUrl: any = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
    });

    this.getSingleProject();
    this.getAllSubProject();
  }

  getSafeUrl(url: any) {
    // console.log(this.propertyDetail);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getSingleProject() {
    let data = new FormData();

    data.append('id', this.id);

    this.ds.getProjectsSingleSub(data).subscribe((response: any) => {
      this.OpendProject = response[0];
      this.titleService.setTitle(this.OpendProject.page_title);
      this.iframeUrl = this.getSafeUrl(
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyAoyZ_yVsI5N8KhjbWRyQeme1Pfz2DRYYc&q=${this.OpendProject.location}`
      );
      this.metaService.updateTag({
        name: 'description',
        content: this.OpendProject.page_description,
      });
      $('#forJsonLd').html(this.OpendProject.page_schema);
    });
  }

  getAllSubProject() {
    let data = new FormData();

    data.append('id', this.id);
    this.ds.getSubProperty(data).subscribe((response: any) => {
      response.map((x: any) => {
        if (x.imgType == 'url') {
          x.propertyImages = JSON.parse(x.propertyImages[0]);
        }
      });
      this.subProjects = response;
    });
  }

  openUrl(data: any) {
    this.router.navigateByUrl('property-detail/' + data.id);
  }
}
