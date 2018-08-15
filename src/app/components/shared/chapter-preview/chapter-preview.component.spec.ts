import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterPreviewComponent } from './chapter-preview.component';

describe('ChapterPreviewComponent', () => {
  let component: ChapterPreviewComponent;
  let fixture: ComponentFixture<ChapterPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
