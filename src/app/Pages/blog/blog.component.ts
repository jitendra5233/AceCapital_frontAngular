import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
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

  allBlogs: any = [];
  allBlogsfilter: any = [];
  allBlogsC: any = [];
  allShow = true;

  ngOnInit(): void {
    this.getBlogs();
    this.getBlogsC();
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
          date.getDate();

        var formatedTime =
          date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        // x.fDate = `${date.getDate()}/${
        //   date.getMonth() + 1
        // }/${date.getFullYear()}`;

        x.fDate = formatedDate;
        x.fTime = formatedTime;

        console.log(formatedDate);
      });

      this.allBlogsfilter = this.allBlogs;

      this.allBlogsfilter.map((x: any) => {
        x.postContent = x.postContent.replace(/(<([^>]+)>)/gi, '');
        x.postContent = x.postContent.substring(0, 200);
      });
    });
  }
  getBlogsC() {
    this.ds.getAllBlogsC().subscribe((response: any) => {
      let newData = response;
      this.allBlogsC.push({
        created_at: '2022-11-14T09:37:44.000000Z',
        id: 0,
        name: 'All',
        updated_at: '2022-11-14T09:37:44.000000Z',
        status: true,
      });
      newData.map((x: any) => {
        x.status = false;
        this.allBlogsC.push(x);
      });
    });
  }

  openBlog(i: any) {
    this.router.navigateByUrl('blog-detail/' + i.id);
  }

  filterByCategory(i: any) {
    this.allBlogsC.map((x: any) => {
      if (x.no != 0) {
        this.allBlogsfilter = [];
        if (i.id == x.id) {
          x.status = !x.status;
        }
      }
    });
    this.allBlogsC.map((x: any) => {
      if (x.no != 0) {
        this.allBlogs.map((y: any) => {
          if (x.status == true) {
            if (x.id == y.categoryId) {
              this.allBlogsC[0].status = false;
              this.allBlogsfilter.push(y);
            }
            if (i.id == 0) {
              this.allBlogsfilter = this.allBlogs;
              this.allBlogsC.map((z: any) => {
                if (z.id != 0) {
                  z.status = false;
                }
              });
            }
          }
        });
      }
    });
    console.log(this.allBlogsfilter);
  }

  filterByCategoryAll() {
    if (this.allShow == true) {
      console.log('ok');
      this.allBlogsfilter = this.allBlogs;
    }
    this.allShow = !this.allShow;
  }
}
