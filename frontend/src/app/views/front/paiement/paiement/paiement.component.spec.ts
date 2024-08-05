import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementComponent } from './paiement.component';

describe('PaiementComponent', () => {
  let component: PaiementComponent;
  let fixture: ComponentFixture<PaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
