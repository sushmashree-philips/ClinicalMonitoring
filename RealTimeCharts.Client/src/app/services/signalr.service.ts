import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Subject } from 'rxjs';
import { ChartModel } from '../_interfaces/chartmodel.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data = new Subject();

  private hubConnection: signalR.HubConnection

    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:5001/chart')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addTransferChartDataListener = () => {
      this.hubConnection.on('transferpatientData', (data1) => {
        console.log(data1);
        for(var i=0;i<data1.length;i++)
        {
          this.data.next({Name:data1[i].name,Age:data1[i].age});
        }
      });
    }

    

    public addBroadcastChartDataListener = () => {
      this.hubConnection.on('initialpatientdata', (data) => {
        this.data = data;
      })
    }
}
