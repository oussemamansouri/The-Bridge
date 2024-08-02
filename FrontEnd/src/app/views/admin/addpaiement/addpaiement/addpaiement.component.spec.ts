import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaiementComponent } from './addpaiement.component';

describe('AddpaiementComponent', () => {
  let component: AddpaiementComponent;
  let fixture: ComponentFixture<AddpaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
