import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffPlanComponent } from './off-plan.component';

describe('OffPlanComponent', () => {
  let component: OffPlanComponent;
  let fixture: ComponentFixture<OffPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OffPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
