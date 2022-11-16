import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostprepactionComponent } from './postprepaction.component';

describe('PostprepactionComponent', () => {
  let component: PostprepactionComponent;
  let fixture: ComponentFixture<PostprepactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostprepactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostprepactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
