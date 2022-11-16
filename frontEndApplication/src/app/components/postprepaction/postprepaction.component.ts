import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postprepaction',
  templateUrl: './postprepaction.component.html',
  styleUrls: ['./postprepaction.component.scss']
})
export class PostprepactionComponent implements OnInit {
  title = '';
  message = '';
  buttons: Buttons = Buttons.Ok;

  constructor() { }

  ngOnInit(): void {
  }

}

enum Buttons {
  Ok,
  YesNo
}

enum Button {
  Ok,
  Yes,
  No
}
