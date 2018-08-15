import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialChapterCommentNewComponent } from './social-chapter-comment-new.component';

describe('SocialChapterCommentNewComponent', () => {
  let component: SocialChapterCommentNewComponent;
  let fixture: ComponentFixture<SocialChapterCommentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialChapterCommentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialChapterCommentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
