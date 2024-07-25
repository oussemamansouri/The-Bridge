import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationLayoutComponent } from './formation-layout.component';

describe('FormationLayoutComponent', () => {
  let component: FormationLayoutComponent;
  let fixture: ComponentFixture<FormationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
