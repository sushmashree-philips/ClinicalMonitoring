import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignalrService } from './../../services/signalr.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = 'Updates about Patient and Procedure';
   formGroup;
   patientName:string = "";

  constructor(
    private http: HttpClient,
    public signalRService: SignalrService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({

      patientname: new FormControl(),
      technicianname: new FormControl(),
      proceduretype: new FormControl(),
      protocol: new FormControl(),
      additionaldata: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formData:any) {
    console.log(formData);
    console.log(formData.patientname);

    this.startHttpEmailRequest();
    this.startHttpSMSRequest();

    // Cmd to start scan connection
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    setTimeout(()=>{
      this.startHttpScanRequest();
  }, 3000);

  }

  private startHttpScanRequest = () => {
    if(this.patientName != "Jhon")
    {
    this.http.get('https://localhost:5001/api/chart').subscribe((res) => {
      console.log(res);
    });
  } else {
    // Update with new api
    this.http.get('https://localhost:5001/api/chart').subscribe((res) => {
      console.log(res);
    });
  }
  };

  private startHttpSMSRequest = () => {
    this.http.get('https://localhost:5001/api/Chart/SendSMS').subscribe((res) => {
      console.log(res);
    });

  };

  private startHttpEmailRequest = () => {
    const body = "Patient Name: Jhon, Procedure Type:  Abdomen CT Scan";
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    let options = {headers: headers };
  this.http.post<any>('http://localhost:3200/sendmail', body).subscribe(res => {
      console.log(res);
  })
  };

}
