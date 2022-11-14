import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureProgressStateComponent } from './procedure-progress-state.component';

describe('ProcedureProgressStateComponent', () => {
  let component: ProcedureProgressStateComponent;
  let fixture: ComponentFixture<ProcedureProgressStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureProgressStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureProgressStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
