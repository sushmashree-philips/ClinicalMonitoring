import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-postprepaction',
  templateUrl: './postprepaction.component.html',
  styleUrls: ['./postprepaction.component.scss'],
})
export class PostprepactionComponent implements OnInit {
  title = '';
  message = '';
  buttons: Buttons = Buttons.Ok;
  patientName: string = ''
  patientImage: string = ''

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.patientInfo.subscribe(pdata => {
      this.patientName = pdata.name
      this.patientImage = pdata.image
    })
  }
}

enum Buttons {
  Ok,
  YesNo,
}

enum Button {
  Ok,
  Yes,
  No,
}
