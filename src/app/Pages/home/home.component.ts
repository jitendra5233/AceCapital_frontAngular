import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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

  homeData: any = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.ds.getHomeData().subscribe((response: any) => {
      this.homeData = response[0];
    });
  }
}
