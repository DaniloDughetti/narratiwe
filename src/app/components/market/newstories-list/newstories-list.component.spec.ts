import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstoriesListComponent } from './newstories-list.component';

describe('NewstoriesListComponent', () => {
  let component: NewstoriesListComponent;
  let fixture: ComponentFixture<NewstoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
