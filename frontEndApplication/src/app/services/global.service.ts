import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ScanButtonStatus } from '../constants/constants';
import { PatientInfo } from '../_interfaces/step.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public isScanCompleted = false
  constructor() { }

  public patientInfo = new BehaviorSubject<PatientInfo>({
    image: 'https://images.creativemarket.com/0.1.0/ps/2304773/1300/975/m1/fpnw/wm0/2-.jpg?1487623255&s=a9ffb8384eb185e932d3bdda4a7b25b8',
    issueType: '',
    name: 'Apollo Hospital'
  });
  public scanButtonStatus = new BehaviorSubject<ScanButtonStatus>(ScanButtonStatus.START);

}
