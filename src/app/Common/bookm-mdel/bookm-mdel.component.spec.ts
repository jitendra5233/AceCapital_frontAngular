import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmMdelComponent } from './bookm-mdel.component';

describe('BookmMdelComponent', () => {
  let component: BookmMdelComponent;
  let fixture: ComponentFixture<BookmMdelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmMdelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmMdelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
