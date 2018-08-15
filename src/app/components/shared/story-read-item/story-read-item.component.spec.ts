import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryReadItemComponent } from './story-read-item.component';

describe('StoryReadItemComponent', () => {
  let component: StoryReadItemComponent;
  let fixture: ComponentFixture<StoryReadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryReadItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryReadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
