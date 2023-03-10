import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css'],
})
export class SingleProjectComponent {
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
  iframeUrl: any = '';

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

  options: google.maps.MapOptions = {
    center: { lat: 31.634, lng: 74.8723 },
    zoom: 13,
  };

  id: any = 0;
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

    this.ds.getProjectsSingle(data).subscribe((response: any) => {
      this.OpendProject = response[0];
      console.log(this.OpendProject);
      // $(this.OpendProject.page_schema).appendTo('#forJsonLd');
      this.iframeUrl = this.getSafeUrl(
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyAoyZ_yVsI5N8KhjbWRyQeme1Pfz2DRYYc&q=${this.OpendProject.location}`
      );
      this.titleService.setTitle(this.OpendProject.page_title);
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
    this.ds.getSubProjects(data).subscribe((response: any) => {
      this.subProjects = response;
    });
  }

  openUrl(data: any) {
    this.router.navigateByUrl('project-view-sub/' + data.id);
  }
}
