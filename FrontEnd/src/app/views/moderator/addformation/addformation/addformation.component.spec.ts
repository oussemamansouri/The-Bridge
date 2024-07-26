import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddformationComponent } from './addformation.component';

describe('AddformationComponent', () => {
  let component: AddformationComponent;
  let fixture: ComponentFixture<AddformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
