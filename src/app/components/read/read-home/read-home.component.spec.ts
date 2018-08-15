import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadHomeComponent } from './read-home.component';

describe('ReadHomeComponent', () => {
  let component: ReadHomeComponent;
  let fixture: ComponentFixture<ReadHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
