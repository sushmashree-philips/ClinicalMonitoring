import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { PatientData } from '../_interfaces/step.model';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public data = new Subject<PatientData[]>();

  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chart')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferpatientData', (data1: PatientData[]) => {
      console.log(data1);
      let resp = data1.map((val) => val.procedure);
      this.data.next(data1);
    });
  };

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('initialpatientdata', (data) => {
      console.log('initialpatientdata', data);
      // this.data = data;
    });
  };
}
