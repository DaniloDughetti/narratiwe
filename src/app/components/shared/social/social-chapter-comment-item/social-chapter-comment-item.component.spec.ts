import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialChapterCommentItemComponent } from './social-chapter-comment-item.component';

describe('SocialChapterCommentItemComponent', () => {
  let component: SocialChapterCommentItemComponent;
  let fixture: ComponentFixture<SocialChapterCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialChapterCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialChapterCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
