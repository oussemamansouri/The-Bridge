import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorLayoutComponent } from './moderator-layout.component';

describe('ModeratorLayoutComponent', () => {
  let component: ModeratorLayoutComponent;
  let fixture: ComponentFixture<ModeratorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
