import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialUpItemComponent } from './social-up-item.component';

describe('SocialUpItemComponent', () => {
  let component: SocialUpItemComponent;
  let fixture: ComponentFixture<SocialUpItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialUpItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialUpItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
