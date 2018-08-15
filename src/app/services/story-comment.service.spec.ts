import { TestBed, inject } from '@angular/core/testing';

import { StoryCommentService } from './story-comment.service';

describe('StoryCommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryCommentService]
    });
  });

  it('should be created', inject([StoryCommentService], (service: StoryCommentService) => {
    expect(service).toBeTruthy();
  }));
});
