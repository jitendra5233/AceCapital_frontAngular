import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
})
export class CareersComponent {
  constructor(
    public ds: DataService,
    private spinner: NgxSpinnerService,
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

  name: any = '';
  email: any = '';
  phone: any = '';
  file: any = '';
  message: any = '';
  fileNametest: any = '';

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  handleSubmit() {
    let data = '';
    if (this.name == undefined || this.name == '') {
      data += '<div class="errorName">Name Required</div>';
    }

    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.email)) {
    } else {
      data += '<div class="errorName">Invalid Email Address</div>';
    }

    if (this.phone == undefined || this.phone == '') {
      data += '<div class="errorName">Invalid Phone</div>';
    } else {
      if (this.phone.length >= 8 && this.phone.length <= 13) {
      } else {
        data += '<div class="errorName">Invalid Phone</div>';
      }
    }

    if (this.message == undefined || this.message == '') {
      data += '<div class="errorName">Message Required</div>';
    }

    if (data == '') {
      this.spinner.show();
      let data2 = new FormData();
      data2.append('name', this.name);
      data2.append('email', this.email);
      data2.append('file', this.file);
      data2.append('phone', this.phone);
      data2.append('message', this.message);

      this.ds.submitCareersForm(data2).subscribe((response: any) => {
        this.spinner.hide();
        Swal.fire('Request Submited', '', 'success');
        this.name = '';
        this.email = '';
        this.file = '';
        this.phone = '';
        this.message = '';
        this.fileNametest = '';
      });
    } else {
      Swal.fire({
        title: '',
        icon: 'error',
        html: `<div>${data}</div>`,
        showCloseButton: true,
        confirmButtonText: 'close',
      });
    }
  }
}
