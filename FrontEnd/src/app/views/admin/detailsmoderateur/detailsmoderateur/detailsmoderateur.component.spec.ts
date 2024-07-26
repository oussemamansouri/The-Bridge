import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmoderateurComponent } from './detailsmoderateur.component';

describe('DetailsmoderateurComponent', () => {
  let component: DetailsmoderateurComponent;
  let fixture: ComponentFixture<DetailsmoderateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsmoderateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsmoderateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
