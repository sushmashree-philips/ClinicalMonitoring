import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencedocsComponent } from './referencedocs.component';

describe('ReferencedocsComponent', () => {
  let component: ReferencedocsComponent;
  let fixture: ComponentFixture<ReferencedocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencedocsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferencedocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
