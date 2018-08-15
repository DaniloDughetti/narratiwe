import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialChapterSummaryComponent } from './social-chapter-summary.component';

describe('SocialChapterSummaryComponent', () => {
  let component: SocialChapterSummaryComponent;
  let fixture: ComponentFixture<SocialChapterSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialChapterSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialChapterSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
