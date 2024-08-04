import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsformationComponent } from './detailsformation.component';

describe('DetailsformationComponent', () => {
  let component: DetailsformationComponent;
  let fixture: ComponentFixture<DetailsformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
