import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSubProjectComponent } from './single-sub-project.component';

describe('SingleSubProjectComponent', () => {
  let component: SingleSubProjectComponent;
  let fixture: ComponentFixture<SingleSubProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSubProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSubProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
