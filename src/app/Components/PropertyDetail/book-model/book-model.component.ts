import { Component, Inject, Pipe } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-book-model',
  templateUrl: './book-model.component.html',
  styleUrls: ['./book-model.component.css'],
})
export class BookModelComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BookModelComponent>,
    public ds: DataService,
    private sanitizer: DomSanitizer
  ) {}

  frameUrl = this.getSafeUrl(
    `https://nrx.sag.mybluehost.me/dashboard-acecapitalrealty-com/front_book?id=${this.data.propertyData.userId}&pid=${this.data.propertyData.id}`
  );

  ngOnInit() {
    // console.log(this.frameUrl);
    // console.log(this.data.propertyData);
    // console.log(this.data.agentTimeSlot);
  }

  getSafeUrl(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  fname: any = '';
  lname: any = '';
  email: any = '';
  phone: any = '';
  a_date: any = '';
  a_time: any = '';

  newformated = new Date().toISOString().split('T')[0];

  closeModel() {
    this.dialogRef.close();
  }

  okDone() {
    Swal.fire('Submitted Successfully', '', 'success');
    this.closeModel();
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
      data +=
        '<div class="errorName">Invalid Email Address or Use Small Letters</div>';
    }
    if (this.phone.value == undefined) {
      data += '<div class="errorName">Invalid Phone</div>';
    } else {
      if (this.phone.value.length >= 8 && this.phone.value.length <= 13) {
      } else {
        data += '<div class="errorName">Invalid Phone</div>';
      }
    }
    if (this.a_date.value == undefined) {
      data += '<div class="errorName">Date Required</div>';
    }
    if (this.a_time.value == undefined) {
      data += '<div class="errorName">Time Required</div>';
    }

    if (data == '') {
      let data = new FormData();

      data.append('fname', this.fname.value);
      data.append('lname', this.lname.value);
      data.append('email', this.email.value);
      data.append('phone', this.phone.value);
      data.append('a_date', this.a_date.value);
      data.append('a_time', this.a_time.value);
      data.append('propertyId', this.data.propertyData.id);
      data.append('userId', this.data.propertyData.userId);
      this.ds.saveAppointmeant(data).subscribe((response: any) => {
        this.fname = '';
        this.lname = '';
        this.email = '';
        this.phone = '';
        this.a_date = '';
        this.a_time = '';
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
