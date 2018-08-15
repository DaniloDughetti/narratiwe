import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRatingEditComponent } from './social-rating-edit.component';

describe('SocialRatingEditComponent', () => {
  let component: SocialRatingEditComponent;
  let fixture: ComponentFixture<SocialRatingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialRatingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialRatingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
