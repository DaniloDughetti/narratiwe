import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstoryStartComponent } from './newstory-start.component';

describe('NewstoryStartComponent', () => {
  let component: NewstoryStartComponent;
  let fixture: ComponentFixture<NewstoryStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstoryStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstoryStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
