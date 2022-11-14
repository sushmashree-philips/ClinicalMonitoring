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

  constructor(
    public signalRService: SignalrService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
  }

  // Call this mtd on click of "start scan" button
  onStart() {
    this.message = 'Admin Content goes Here!!';
    this.http.get('https://localhost:5001/api/chart').subscribe((res) => {
      console.log(res);
    });
    // Invoke Email part
  }
}
