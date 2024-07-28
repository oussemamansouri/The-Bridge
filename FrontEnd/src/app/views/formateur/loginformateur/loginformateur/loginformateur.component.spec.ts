import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginformateurComponent } from './loginformateur.component';

describe('LoginformateurComponent', () => {
  let component: LoginformateurComponent;
  let fixture: ComponentFixture<LoginformateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginformateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginformateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
