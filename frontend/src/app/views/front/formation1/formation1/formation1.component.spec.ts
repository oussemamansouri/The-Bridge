import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formation1Component } from './formation1.component';

describe('Formation1Component', () => {
  let component: Formation1Component;
  let fixture: ComponentFixture<Formation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Formation1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
