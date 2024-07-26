import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultmoderateurComponent } from './consultmoderateur.component';

describe('ConsultmoderateurComponent', () => {
  let component: ConsultmoderateurComponent;
  let fixture: ComponentFixture<ConsultmoderateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultmoderateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultmoderateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
