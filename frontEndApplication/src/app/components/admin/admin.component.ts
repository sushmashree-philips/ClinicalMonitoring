import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignalrService } from './../../services/signalr.service';
import { GlobalService } from 'src/app/services/global.service';
import { ScanButtonStatus } from 'src/app/constants/constants';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PopupDialogProgress } from '../popup/popup-dialog-progress.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  title = 'Updates about Patient and Procedure';
  formGroup;
  patientName: string = '';
  scanBtnStatus!: ScanButtonStatus;
  scanStatus = ScanButtonStatus;
  localStoragePatientInfo!: {
    patientname: string;
    technicianname: string;
    proceduretype: string;
    protocol: string;
    additionaldata: string;
    anatomy: string;
  };
  // patientImage: string = 'https://media.istockphoto.com/photos/postop-recovery-picture-id479965034?k=6&m=479965034&s=170667a&w=0&h=DX5f3ggafOcZ-LSGrA0qQykmrer87QbutzZrmWFmwcc=';
  patientImage: string = 'https://source.unsplash.com/c_GmwfHBDzk/200x200'
  
  constructor(
    private http: HttpClient,
    public signalRService: SignalrService,
    private formBuilder: FormBuilder,
    public globalService: GlobalService,
    public dialog: MatDialog
  ) {
    this.localStoragePatientInfo = this.getFormValues();
    this.formGroup = this.formBuilder.group({
      patientname: new FormControl(this.localStoragePatientInfo?.patientname, [
        Validators.required,
      ]),
      technicianname: new FormControl(
        this.localStoragePatientInfo?.technicianname,
        [Validators.required]
      ),
      proceduretype: new FormControl(
        this.localStoragePatientInfo?.proceduretype,
        [Validators.required]
      ),
      protocol: new FormControl(this.localStoragePatientInfo?.protocol, [
        Validators.required,
      ]),
      additionaldata: new FormControl(
        this.localStoragePatientInfo?.proceduretype,
        [Validators.required]
      ),
      anatomy: new FormControl(
        this.localStoragePatientInfo?.proceduretype,
        [Validators.required]
      )
    });

    // this.formGroup.valueChanges.subscribe(formval => {
    //   this.disableScanBtn =
    // })
  }

  ngOnInit(): void {
    this.globalService.scanButtonStatus.subscribe((btn) => {
      this.scanBtnStatus = btn;
      if (this.scanBtnStatus === ScanButtonStatus.IN_PROGRESS) {
        this.displayProgressBar();
      }
    });

    window.onbeforeunload = () => {
      localStorage.removeItem('formValues');
    };
  }

  onSubmit(formData: any) {
    console.log('this.formGroup.status', this.formGroup.valid);
    console.log(formData);
    console.log(formData.patientname);

    if (this.formGroup.valid && this.scanBtnStatus === ScanButtonStatus.START) {
      this.globalService.patientInfo.next({
        name: formData.patientname,
        issueType: formData.proceduretype,
        image: this.patientImage,
      });
      this.globalService.scanButtonStatus.next(ScanButtonStatus.IN_PROGRESS);
      this.startHttpEmailRequest();
      this.startHttpSMSRequest();
      this.displayProgressBar();
      this.setFormValues(formData);

      // Cmd to start scan connection
      this.signalRService.startConnection();
      this.signalRService.addTransferChartDataListener();
      setTimeout(() => {
        this.startHttpScanRequest();
      }, 3000);
    }
  }

  private setFormValues(formData: any) {
    localStorage.setItem('formValues', JSON.stringify(formData));
  }

  private getFormValues() {
    if (localStorage.getItem('formValues')) {
      return JSON.parse(localStorage.getItem('formValues')!);
    }
  }

  private startHttpScanRequest = () => {
    // if (this.patientName != 'Jhon') {
    this.http.get('https://localhost:5001/api/chart').subscribe((res) => {
      console.log(res);
    });
    // }

    // else {
    //   // Update with new api
    //   this.http
    //     .get('https://localhost:5001/api/chart/GetTestCase2')
    //     .subscribe((res) => {
    //       console.log(res);
    //     });
    // }
  };

  private startHttpSMSRequest = () => {
    this.http
      .get('https://localhost:5001/api/Chart/SendSMS')
      .subscribe((res) => {
        console.log(res);
      });
  };

  private startHttpEmailRequest = () => {
    const body = 'Patient Name: Jhon, Procedure Type:  Abdomen CT Scan';
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = { headers: headers };
    this.http
      .post<any>('http://localhost:3200/sendmail', body)
      .subscribe((res) => {
        console.log(res);
      });
  };

  private displayProgressBar() {
    let dialogRef = this.dialog.open(PopupDialogProgress, {
      width: '45vw',
      disableClose: true,
      hasBackdrop: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
    console.log('Admin DESTROY');
  }
}
