import { Component } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ace-ang';

  constructor(public ds: DataService) {}

  ngOnInit(): void {
    this.getData();
    // $('<script>alert("hi");</' + 'script>').appendTo(document.head);
  }

  onSlideChange() {
    // console.log('ok');
  }

  getData() {
    this.ds.getHomeData().subscribe((response: any) => {
      $(response[0].header_code).appendTo(document.head);
      $(response[0].footer_code).appendTo(document.body);
      $('#forJsonLd').html(response[0].page_schema);
    });
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
