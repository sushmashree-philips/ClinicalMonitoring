import { Component } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clinal-process';

  message = 'Main content here!!';
  patientName = "Patient Name";
  typeOfIssue = "Type of issue";

  constructor(
    public signalRService: SignalrService,
    private http: HttpClient
  ) {}

  ngOnInit() {

  }



}
