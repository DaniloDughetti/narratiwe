import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteStoriesListComponent } from './favorite-stories-list.component';

describe('FavoriteStoriesListComponent', () => {
  let component: FavoriteStoriesListComponent;
  let fixture: ComponentFixture<FavoriteStoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteStoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteStoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
