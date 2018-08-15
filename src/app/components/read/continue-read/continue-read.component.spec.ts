import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueReadComponent } from './continue-read.component';

describe('ContinueReadComponent', () => {
  let component: ContinueReadComponent;
  let fixture: ComponentFixture<ContinueReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
