import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-procedure-progress-state',
  templateUrl: './procedure-progress-state.component.html',
  styleUrls: ['./procedure-progress-state.component.scss']
})
export class ProcedureProgressStateComponent implements OnInit {

  public procedureTitle!:string 
  // Procedure timespan 
  private procedureTime:number = 30
  timeleft: any;
  constructor() { }

  ngOnInit(): void {
    this.procedureTitle = "Test procedure";
    this.timeleft = new Date().setMinutes(new Date().getMinutes() + this.procedureTime)
  }

  onStateChange(event: any) {
    // console.log(event);
  }
}
