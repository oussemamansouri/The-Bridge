import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmoderateurComponent } from './loginmoderateur.component';

describe('LoginmoderateurComponent', () => {
  let component: LoginmoderateurComponent;
  let fixture: ComponentFixture<LoginmoderateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginmoderateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginmoderateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
