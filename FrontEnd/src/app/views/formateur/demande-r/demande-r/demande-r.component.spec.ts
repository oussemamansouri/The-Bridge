import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRComponent } from './demande-r.component';

describe('DemandeRComponent', () => {
  let component: DemandeRComponent;
  let fixture: ComponentFixture<DemandeRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
