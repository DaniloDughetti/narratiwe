import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MystoriesListComponent } from './mystories-list.component';

describe('MystoriesListComponent', () => {
  let component: MystoriesListComponent;
  let fixture: ComponentFixture<MystoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MystoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MystoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
