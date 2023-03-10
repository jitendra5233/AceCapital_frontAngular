import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { BookModelComponent } from '../../Components/PropertyDetail/book-model/book-model.component';
import { BookmMdelComponent } from '../bookm-mdel/bookm-mdel.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  MenuArr = [
    {
      id: 1,
      name: 'Buy',
      link: 'buy',
      active: false,
    },
    {
      id: 2,
      name: 'Rent',
      link: 'rent',
      active: false,
    },

    {
      id: 4,
      name: 'Off-Plan',
      link: 'off-plan',
      active: false,
    },
    {
      id: 5,
      name: 'Global',
      link: 'blog',
      active: false,
    },
    {
      id: 6,
      name: 'Who We Are?',
      link: 'who-we-are',
      active: false,
    },
    {
      id: 7,
      name: 'Contact Us',
      link: 'contact-us',
      active: false,
    },
  ];

  openHome() {
    this.MenuArr.map((x) => {
      x.active = false;
    });
    this.router.navigateByUrl('/');
  }

  openUrl(i: any) {
    this.MenuArr.map((x) => {
      if (x.id == i.id) {
        x.active = true;
      } else {
        x.active = false;
      }
    });

    let purpose: any = '';
    let currentActiveState: any = 1;

    if (i.link == 'buy') {
      purpose = 1;
    }

    if (i.link == 'rent') {
      purpose = 2;
    }

    if (i.link == 'off-plan') {
      currentActiveState = 3;
      purpose = 1;
    }

    if (i.link == 'propertySsearch') {
      purpose = 1;
      i.link = 'property-search';
    }

    localStorage.setItem('currentActiveState', currentActiveState);
    localStorage.setItem('purpose', purpose);
    localStorage.setItem('propertyType', '');
    localStorage.setItem('propertyLocation', '');
    localStorage.setItem('currentRoute', i.link);

    this.router.navigateByUrl(i.link);
  }

  openBookModel() {
    const dialogRef = this.dialog.open(BookmMdelComponent, {
      data: {
        propertyData: 'ok',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
