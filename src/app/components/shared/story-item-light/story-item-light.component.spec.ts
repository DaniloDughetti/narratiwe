import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryItemLightComponent } from './story-item-light.component';

describe('StoryItemLightComponent', () => {
  let component: StoryItemLightComponent;
  let fixture: ComponentFixture<StoryItemLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryItemLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryItemLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
