import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoTypeCardComponent } from './two-type-card.component';

describe('TwoTypeCardComponent', () => {
  let component: TwoTypeCardComponent;
  let fixture: ComponentFixture<TwoTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoTypeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
