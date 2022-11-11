import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  public stepEvent = new Subject<{ prev: boolean; next: boolean }>();
  constructor() { }
}
