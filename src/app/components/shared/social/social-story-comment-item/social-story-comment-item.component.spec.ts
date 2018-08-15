import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialStoryCommentItemComponent } from './social-story-comment-item.component';

describe('SocialStoryCommentItemComponent', () => {
  let component: SocialStoryCommentItemComponent;
  let fixture: ComponentFixture<SocialStoryCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialStoryCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialStoryCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
