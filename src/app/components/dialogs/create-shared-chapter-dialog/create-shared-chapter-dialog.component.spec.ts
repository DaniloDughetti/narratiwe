import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSharedChapterDialogComponent } from './create-shared-chapter-dialog.component';

describe('CreateSharedChapterDialogComponent', () => {
  let component: CreateSharedChapterDialogComponent;
  let fixture: ComponentFixture<CreateSharedChapterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSharedChapterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSharedChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
