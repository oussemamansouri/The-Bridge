import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultformationComponent } from './consultformation.component';

describe('ConsultformationComponent', () => {
  let component: ConsultformationComponent;
  let fixture: ComponentFixture<ConsultformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
