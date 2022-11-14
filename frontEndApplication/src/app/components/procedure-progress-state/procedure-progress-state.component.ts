import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procedure-progress-state',
  templateUrl: './procedure-progress-state.component.html',
  styleUrls: ['./procedure-progress-state.component.scss'],
})
export class ProcedureProgressStateComponent implements OnInit {
  public procedureTitle!: string;
  // Procedure timespan
  private procedureTime: number = 30;
  timeleft: any;
  constructor() {}

  ngOnInit(): void {
    this.procedureTitle = 'Test procedure';
    this.timeleft = new Date().setMinutes(
      new Date().getMinutes() + this.procedureTime
    );
  }

  onStateChange(event: any) {
    console.log('onStateChange', event);
  }

  onComplete(isComplete: boolean) {
    if (isComplete) {
      this.timeleft = new Date()
    }
  }
}
