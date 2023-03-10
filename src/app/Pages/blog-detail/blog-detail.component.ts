import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent {
  constructor(
    private router: ActivatedRoute,
    public ds: DataService,
    private router2: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  blogId: any = 0;
  singleBlog: any = '';
  allBlogs: any = '';

  ngOnInit(): void {
    // this.blogId = this.router.snapshot.params['id'];
    this.router.params.subscribe((params: any) => {
      this.blogId = params.id;
      console.log(params.id);
    });
    this.getBlog(this.blogId);
    this.getBlogs();
  }

  getBlog(id: any) {
    let data = new FormData();
    data.append('id', id);
    this.ds.getAllBlogsSingle(data).subscribe((response: any) => {
      this.singleBlog = response[0];

      this.titleService.setTitle(this.singleBlog.title);
      this.metaService.updateTag({
        name: 'description',
        content: this.singleBlog.page_description,
      });
      $('#forJsonLd').html(this.singleBlog.page_schema);
      let date: any = new Date(this.singleBlog.created_at);

      var formatedDate =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ';

      var formatedTime =
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

      // this.singleBlog.fdate = `${date.getDate()}/${
      //   date.getMonth() + 1
      // }/${date.getFullYear()}`;

      this.singleBlog.fdate = formatedDate;
      this.singleBlog.ftime = formatedTime;
    });
  }

  getBlogs() {
    this.ds.getAllBlogs().subscribe((response: any) => {
      this.allBlogs = response;
      this.allBlogs.map((x: any) => {
        let date = new Date(x.created_at);

        var formatedDate =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate() +
          ' ';

        var formatedTime =
          date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        // x.fDate = `${date.getDate()}/${
        //   date.getMonth() + 1
        // }/${date.getFullYear()}`;

        x.fDate = formatedDate;
        x.fTime = formatedTime;
      });
      console.log(this.allBlogs);
    });
  }
  openBlog(i: any) {
    this.router2.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router2.onSameUrlNavigation = 'reload';
    this.router2.navigateByUrl('blog-detail/' + i.id);
    // this.router2.navigate(['./'], { relativeTo: this.router });
  }
}
