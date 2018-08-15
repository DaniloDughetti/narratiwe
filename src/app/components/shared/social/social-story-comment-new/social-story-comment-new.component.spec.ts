import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialStoryCommentNewComponent } from './social-story-comment-new.component';

describe('SocialStoryCommentNewComponent', () => {
  let component: SocialStoryCommentNewComponent;
  let fixture: ComponentFixture<SocialStoryCommentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialStoryCommentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialStoryCommentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
