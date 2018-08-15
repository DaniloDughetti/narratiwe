import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryEditPreviewComponent } from './story-edit-preview.component';

describe('StoryEditPreviewComponent', () => {
  let component: StoryEditPreviewComponent;
  let fixture: ComponentFixture<StoryEditPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryEditPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryEditPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
