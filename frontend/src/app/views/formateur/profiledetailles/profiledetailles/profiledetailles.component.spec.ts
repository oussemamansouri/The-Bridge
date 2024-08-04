import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiledetaillesComponent } from './profiledetailles.component';

describe('ProfiledetaillesComponent', () => {
  let component: ProfiledetaillesComponent;
  let fixture: ComponentFixture<ProfiledetaillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiledetaillesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiledetaillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
