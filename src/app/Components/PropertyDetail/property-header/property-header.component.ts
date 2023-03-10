import { OnInit, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Lightbox } from 'ngx-lightbox';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-property-header',
  templateUrl: './property-header.component.html',
  styleUrls: ['./property-header.component.css'],
})
export class PropertyHeaderComponent implements OnInit {
  @Input() propertyDetaildata: any;

  constructor(
    private titleService: Title,
    private router: ActivatedRoute,
    public ds: DataService,
    private _lightBox: Lightbox,
    private metaService: Meta
  ) {
    // let name = this.propertyDetaildata.name;
    // console.log(name);
    // this.titleService.setTitle(name);
  }

  // constructor(
  //   private titleService: Title,
  //   private router: ActivatedRoute,
  //   public ds: DataService,
  //   private route: Router
  // ) {
  //   this.titleService.setTitle(this.router.snapshot.data['title']);
  // }

  propertyId: any = 0;

  propertyDetail: any = [];
  encodedURL = encodeURIComponent(this.ds.frontendurl) + '/property-detail/85';
  shareMessage: any = `Hi%0aCheck out This Property on Ace Capital%0a${this.encodedURL}
  `;

  ngOnInit(): void {
    this.propertyId = this.router.snapshot.params['id'];

    this.getPropertyDetails();
  }

  name = 'Angular ';
  settings = {
    counter: false,
    plugins: [lgZoom],
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  getPropertyDetails() {
    let data = new FormData();
    data.append('id', this.propertyId);
    this.ds.getPropertyDetails(data).subscribe((response: any) => {
      this.propertyDetail = response[0];

      $('#forJsonLd').html(this.propertyDetail.page_schema);

      this.titleService.setTitle(this.propertyDetail.page_title);
      this.metaService.updateTag({
        name: 'description',
        content: this.propertyDetail.page_description,
      });

      // console.log(this.propertyDetail.page_schema)


      if (this.propertyDetail.propertyImages[1] == undefined) {
        this.propertyDetail.propertyImages[1] =
          this.propertyDetail.propertyImages[0];
      }
      if (this.propertyDetail.propertyImages[2] == undefined) {
        this.propertyDetail.propertyImages[2] =
          this.propertyDetail.propertyImages[0];
      }
      if (this.propertyDetail.imgType == 'url') {
        this.propertyDetail.propertyImages = JSON.parse(
          this.propertyDetail.propertyImages[0]
        );
      }
    });
  }

  open(e: number): void {
    let imgArr: any = [];
    if (this.propertyDetail.imgType == 'url') {
      this.propertyDetail.propertyImages.map((x: any) => {
        imgArr.push({
          id: 1,
          src: x,
        });
      });
    } else {
      this.propertyDetail.propertyImages.map((x: any) => {
        imgArr.push({
          id: 1,
          src: this.ds.baseurl + '/media/images/' + x,
        });
      });
    }

    this._lightBox.open(imgArr, e);
  }

  close(): void {
    // close lightbox programmatically
    this._lightBox.close();
  }
}
