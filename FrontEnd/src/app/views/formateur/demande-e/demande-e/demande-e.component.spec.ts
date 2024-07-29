import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEComponent } from './demande-e.component';

describe('DemandeEComponent', () => {
  let component: DemandeEComponent;
  let fixture: ComponentFixture<DemandeEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
