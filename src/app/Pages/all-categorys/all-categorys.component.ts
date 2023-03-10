import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-all-categorys',
  templateUrl: './all-categorys.component.html',
  styleUrls: ['./all-categorys.component.css'],
})
export class AllCategorysComponent {
  constructor(
    public ds: DataService,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private metaService: Meta
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
    this.metaService.updateTag({
      name: 'description',
      content: this.route.snapshot.data['description'],
    });
  }

  allPropertyTypes: any = [];
  allPropertyTypes2: any = [];
  allSubProjects: any = [];

  filterArr: any = [];

  curentDevloper = 'Developer';

  ngOnInit(): void {
    this.getPropertyType();
  }

  getPropertyType() {
    this.ds.getPropertType().subscribe((response: any) => {
      this.allPropertyTypes = response;
    });
  }

  // openUrl(data: any) {
  //   this.router.navigateByUrl('project-view/' + data.id);
  // }

  openUrl(id: any) {
    let url = 'property-search';
    let purpose: any = 1;
    let currentActiveState: any = 1;

    console.log('ok');

    localStorage.setItem('currentActiveState', currentActiveState);
    localStorage.setItem('purpose', purpose);
    localStorage.setItem('propertyType', id.id);
    localStorage.setItem('propertyLocation', '');
    localStorage.setItem('currentRoute', url);

    this.router.navigateByUrl(url);
  }

  openProject(data: any) {
    this.router.navigateByUrl('project-view/' + data.id);
  }
}
