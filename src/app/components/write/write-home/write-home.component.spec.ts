import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteHomeComponent } from './write-home.component';

describe('WriteHomeComponent', () => {
  let component: WriteHomeComponent;
  let fixture: ComponentFixture<WriteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
