import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprofileComponent } from './newprofile.component';

describe('NewprofileComponent', () => {
  let component: NewprofileComponent;
  let fixture: ComponentFixture<NewprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
