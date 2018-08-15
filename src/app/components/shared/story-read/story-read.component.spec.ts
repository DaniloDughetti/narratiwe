import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryReadComponent } from './story-read.component';

describe('StoryReadComponent', () => {
  let component: StoryReadComponent;
  let fixture: ComponentFixture<StoryReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
