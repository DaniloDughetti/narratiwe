import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemLightComponent } from './user-item-light.component';

describe('UserItemLightComponent', () => {
  let component: UserItemLightComponent;
  let fixture: ComponentFixture<UserItemLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
