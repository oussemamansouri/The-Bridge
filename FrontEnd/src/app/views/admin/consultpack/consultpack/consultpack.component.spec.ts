import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultpackComponent } from './consultpack.component';

describe('ConsultpackComponent', () => {
  let component: ConsultpackComponent;
  let fixture: ComponentFixture<ConsultpackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultpackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
