import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardfComponent } from './dashboardf.component';

describe('DashboardfComponent', () => {
  let component: DashboardfComponent;
  let fixture: ComponentFixture<DashboardfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
