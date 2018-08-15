import { TestBed, inject } from '@angular/core/testing';

import { ChapterCommentService } from './chapter-comment.service';

describe('ChapterCommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChapterCommentService]
    });
  });

  it('should be created', inject([ChapterCommentService], (service: ChapterCommentService) => {
    expect(service).toBeTruthy();
  }));
});
