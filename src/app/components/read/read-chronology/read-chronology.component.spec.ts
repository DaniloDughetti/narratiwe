import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadChronologyComponent } from './read-chronology.component';

describe('ReadChronologyComponent', () => {
  let component: ReadChronologyComponent;
  let fixture: ComponentFixture<ReadChronologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadChronologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadChronologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
