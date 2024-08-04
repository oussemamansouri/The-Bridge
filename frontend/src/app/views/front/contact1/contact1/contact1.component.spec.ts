import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contact1Component } from './contact1.component';

describe('Contact1Component', () => {
  let component: Contact1Component;
  let fixture: ComponentFixture<Contact1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Contact1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contact1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
