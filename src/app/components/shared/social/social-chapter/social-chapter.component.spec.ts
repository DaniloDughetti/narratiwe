import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialChapterComponent } from './social-chapter.component';

describe('SocialChapterComponent', () => {
  let component: SocialChapterComponent;
  let fixture: ComponentFixture<SocialChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
