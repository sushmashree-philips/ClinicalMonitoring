import { Component } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './services/global.service';
import { PatientInfo } from './_interfaces/step.model';
import { ScanButtonStatus } from './constants/constants';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clinal-process';

  message = 'Main content here!!';
  patientName = "";
  typeOfIssue = "";
  isDisabled: any;
  patientInfo: PatientInfo | undefined;
  patientImage: string = "";

  constructor(
    public signalRService: SignalrService,
    private http: HttpClient,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.isDisabled = true
    this.globalService.patientInfo.subscribe(pdata => {
      this.patientName = pdata.name
      this.typeOfIssue = pdata.issueType
      this.patientImage = pdata.image
    })

    this.globalService.scanButtonStatus.subscribe(scanStatus => {
      this.isDisabled = scanStatus == ScanButtonStatus.START
    })

    window.onbeforeunload = () => {
      localStorage.removeItem('formValues');
    };
  }



}
