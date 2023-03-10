import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  constructor(private router: ActivatedRoute, private ds: DataService) {}

  propertyId: any = 0;

  ngOnInit(): void {
    this.propertyId = this.router.snapshot.params['id'];
  }
}
