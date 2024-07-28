import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsformateurComponent } from './detailsformateur.component';

describe('DetailsformateurComponent', () => {
  let component: DetailsformateurComponent;
  let fixture: ComponentFixture<DetailsformateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsformateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsformateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
