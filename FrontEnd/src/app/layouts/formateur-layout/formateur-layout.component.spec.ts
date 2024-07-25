import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurLayoutComponent } from './formateur-layout.component';

describe('FormateurLayoutComponent', () => {
  let component: FormateurLayoutComponent;
  let fixture: ComponentFixture<FormateurLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormateurLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
