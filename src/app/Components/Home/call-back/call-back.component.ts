import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-call-back',
  templateUrl: './call-back.component.html',
  styleUrls: ['./call-back.component.css'],
})
export class CallBackComponent {
  constructor(private ds: DataService) {}

  ngOnInit() {}

  name: any = '';
  lname: any = '';
  email: any = '';
  phone: any = '';
  purpose: any = 0;

  handleSubmit() {
    if (
      this.name != '' &&
      this.lname != '' &&
      this.email != '' &&
      this.phone != '' &&
      this.purpose != 0
    ) {
      let data = new FormData();
      data.append('name', this.name);
      data.append('lname', this.lname);
      data.append('email', this.email);
      data.append('phone', this.phone);
      data.append('purpose', this.purpose);
      this.ds.addCallback(data).subscribe((response: any) => {
        Swal.fire('Request Submited', '', 'success');
        this.name = '';
        this.lname = '';
        this.email = '';
        this.phone = '';
        this.purpose = 0;
      });
    } else {
      let data = '';
      if (this.name == '') {
        data += '<div class="errorName">First Name Required</div>';
      }
      if (this.lname == '') {
        data += '<div class="errorName">Last Name Required</div>';
      }
      if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.email)) {
      } else {
        data += '<div class="errorName">Invalid Email Address</div>';
      }
      if (
        this.phone.length >= 8 &&
        this.phone.length <= 13 &&
        Number.isInteger(this.phone)
      ) {
      } else {
        data += '<div class="errorName">Invalid Phone</div>';
      }
      if (this.purpose == 0) {
        data += '<div class="errorName">Select Purpose</div>';
      }
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
