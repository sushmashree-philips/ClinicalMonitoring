import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clinal-process';

  message =  "Main content here!!"

  onStart() {
  this.message = "Admin Content goes Here!!"
  }
}
