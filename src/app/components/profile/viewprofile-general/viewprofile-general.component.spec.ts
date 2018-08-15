import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofileGeneralComponent } from './viewprofile-general.component';

describe('ViewprofileGeneralComponent', () => {
  let component: ViewprofileGeneralComponent;
  let fixture: ComponentFixture<ViewprofileGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewprofileGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprofileGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
