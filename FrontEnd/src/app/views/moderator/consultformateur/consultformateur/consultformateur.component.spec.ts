import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultformateurComponent } from './consultformateur.component';

describe('ConsultformateurComponent', () => {
  let component: ConsultformateurComponent;
  let fixture: ComponentFixture<ConsultformateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultformateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultformateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
