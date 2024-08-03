import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTranslateComponent } from './google-translate.component';

describe('GoogleTranslateComponent', () => {
  let component: GoogleTranslateComponent;
  let fixture: ComponentFixture<GoogleTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleTranslateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
