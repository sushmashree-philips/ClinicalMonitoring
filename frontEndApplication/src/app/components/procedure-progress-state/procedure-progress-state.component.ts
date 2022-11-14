import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';

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
  constructor(public signalRService: SignalrService) {}

  ngOnInit(): void {
    this.procedureTitle = 'Test procedure';
    // this.timeleft = new Date().setMinutes(
    //   new Date().getMinutes() + this.procedureTime
    // );

    this.signalRService.data.subscribe((response) => {
      let resp = response.map((val) => val.remainingTime);
      let time = parseInt(resp[resp.length - 1])
      if (time > 0) {
        this.timeleft = time;
      } else {
        this.timeleft = 0;
      }
    });
  }

  onStateChange(event: any) {
    console.log('onStateChange', event);
  }

  onComplete(isComplete: boolean) {
    if (isComplete) {
      this.timeleft = new Date();
    }
  }
}
