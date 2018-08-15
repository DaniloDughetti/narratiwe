import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialStorySummaryComponent } from './social-story-summary.component';

describe('SocialStorySummaryComponent', () => {
  let component: SocialStorySummaryComponent;
  let fixture: ComponentFixture<SocialStorySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialStorySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialStorySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
