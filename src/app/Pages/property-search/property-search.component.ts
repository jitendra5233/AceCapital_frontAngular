import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css'],
})
export class PropertySearchComponent implements OnInit {
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    public ds: DataService,
    private metaService: Meta
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
    this.metaService.updateTag({
      name: 'description',
      content: this.route.snapshot.data['description'],
    });
  }

  breadcurmName = '';

  ngOnInit(): void {
    let currentRoute = localStorage.getItem('currentRoute');
    if (currentRoute == 'buy') {
      this.breadcurmName = 'Buy';
    }
    if (currentRoute == 'rent') {
      this.breadcurmName = 'Rent';
    }

    if (currentRoute == 'off-plan') {
      this.breadcurmName = 'Off-Plan';
    }

    if (currentRoute == 'property-search') {
      this.breadcurmName = 'Property Search';
    }
  }

  callMyChild() {}

  dataPass: any = 'ok';

  inc(response: any) {
    console.log(response);
  }
}
