import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookm-mdel',
  templateUrl: './bookm-mdel.component.html',
  styleUrls: ['./bookm-mdel.component.css'],
})
export class BookmMdelComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BookmMdelComponent>,
    private ds: DataService
  ) {}

  ngOnInit() {
    console.log(this.data.propertyData);
    console.log(this.data.agentTimeSlot);
  }

  fname: any = '';
  lname: any = '';
  email: any = '';
  phone: any = '';
  purpose: any = 3;

  closeModel() {
    this.dialogRef.close();
  }

  handelSubmit() {
    let data = '';
    if (this.fname.value == undefined) {
      data += '<div class="errorName">First Name Required</div>';
    }
    if (this.lname.value == undefined) {
      data += '<div class="errorName">Last Name Required</div>';
    }
    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.email.value)) {
    } else {
      data += '<div class="errorName">Invalid Email Address</div>';
    }
    if (this.phone.value == undefined) {
      data += '<div class="errorName">Invalid Phone</div>';
    } else {
      if (this.phone.value.length >= 8 && this.phone.value.length <= 13) {
      } else {
        data += '<div class="errorName">Invalid Phone</div>';
      }
    }
    if (this.purpose == 0) {
      data += '<div class="errorName">Select Purpose</div>';
    }

    if (data == '') {
      let data = new FormData();
      data.append('fname', this.fname.value);
      data.append('lname', this.lname.value);
      data.append('email', this.email.value);
      data.append('phone', this.phone.value);
      data.append('purpose', this.purpose);
      this.ds.saveBookVisit(data).subscribe((response: any) => {
        this.fname = '';
        this.lname = '';
        this.email = '';
        this.phone = '';
        this.purpose = '';
        this.closeModel();
        Swal.fire('Submitted Successfully', '', 'success');
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
