import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRatingItemComponent } from './social-rating-item.component';

describe('SocialRatingItemComponent', () => {
  let component: SocialRatingItemComponent;
  let fixture: ComponentFixture<SocialRatingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialRatingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialRatingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
