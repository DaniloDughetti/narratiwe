import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstoryStartEditComponent } from './newstory-start-edit.component';

describe('NewstoryStartEditComponent', () => {
  let component: NewstoryStartEditComponent;
  let fixture: ComponentFixture<NewstoryStartEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstoryStartEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstoryStartEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
