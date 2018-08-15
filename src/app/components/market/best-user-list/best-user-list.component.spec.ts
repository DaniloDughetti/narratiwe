import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestUserListComponent } from './best-user-list.component';

describe('BestUserListComponent', () => {
  let component: BestUserListComponent;
  let fixture: ComponentFixture<BestUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
