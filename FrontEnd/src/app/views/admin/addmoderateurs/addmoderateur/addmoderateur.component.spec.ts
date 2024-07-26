import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoderateurComponent } from './addmoderateur.component';

describe('AddmoderateurComponent', () => {
  let component: AddmoderateurComponent;
  let fixture: ComponentFixture<AddmoderateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmoderateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmoderateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
