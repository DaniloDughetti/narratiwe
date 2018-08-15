import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersContributionComponent } from './chapters-contribution.component';

describe('ChaptersContributionComponent', () => {
  let component: ChaptersContributionComponent;
  let fixture: ComponentFixture<ChaptersContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
