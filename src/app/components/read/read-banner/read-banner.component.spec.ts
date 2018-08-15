import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBannerComponent } from './read-banner.component';

describe('ReadBannerComponent', () => {
  let component: ReadBannerComponent;
  let fixture: ComponentFixture<ReadBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
