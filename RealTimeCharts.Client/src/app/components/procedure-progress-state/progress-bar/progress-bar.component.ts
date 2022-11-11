import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { Status } from 'src/app/constants/constants';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { ProgressStepComponent } from './progress-step/progress-step.component';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, AfterContentInit {
  public itemLength!: number;
  public itemProgressList: {
    stepIndex: number;
    status: string;
    title: string;
  }[] = [];
  public activeIndex = 0;
  public stepTitle = ['Pre-Procedure', 'Scan', 'Post-Procedure', 'Checkout'];
  private stepCount: number = 1

  @Output() public stateChange = new EventEmitter<{
    activeIndex: number;
    activeStep: ProgressStepComponent;
  }>();

  @ContentChildren(ProgressStepComponent)
  public steps!: QueryList<ProgressStepComponent>;

  constructor(
    public progressBarService: ProgressBarService,
    public signalRService: SignalrService
  ) {}

  ngOnInit(): void {
    this.stepEventSubscription();
    this.updateProgressSteps();
    // this.startProgressBarSteps();
  }

  private updateProgressSteps() {
    let arr = []
    this.signalRService.data.subscribe((resp) => {
      arr.push(resp);
      switch (arr.length) {
        case 1:
        case 10:
        case 20:
        case 30:
          if (this.stepCount <= this.progressSteps.length) {
            this.startProgressBarSteps();
            this.stepCount++
          }
          break;
        default:
          break;
      }
    })
      
  };

  private stepEventSubscription() {
    this.progressBarService.stepEvent.subscribe({
      next: ({ prev, next }) => {
        if (next) {
          this.next();
        }

        if (prev) {
          this.prev();
        }
      },
    });
  }

  private startProgressBarSteps() {
    this.progressBarService.stepEvent.next({
      next: true,
      prev: false,
    });
  }

  ngAfterContentInit() {
    this.initProgress(this.progressSteps.length);
    this.setActiveStep(this.activeIndex);
    this.initStepIndex();
  }

  public next() {
    this.increaseStep();
  }

  public prev() {
    this.decreaseStep();
  }

  private increaseStep() {
    if (
      this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status !== Status.COMPLETED
    ) {
      this.completeLastStep();
    }

    if (this.activeIndex < this.itemLength - 1) {
      this.activeIndex++;
      this.switchStatusNext(this.activeIndex);
      this.setActiveStep(this.activeIndex);
      this.emitStateChange();
    }
  }

  private decreaseStep() {
    if (
      this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status === Status.COMPLETED
    ) {
      this.undoLastComplete();
    } else {
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.switchStatusPrev(this.activeIndex);
        this.setActiveStep(this.activeIndex);
        this.emitStateChange();
      }
    }
  }

  private emitStateChange(): void {
    this.stateChange.emit({
      activeIndex: this.activeIndex,
      activeStep: this.activeStep,
    });
  }

  private setActiveStep(index: number): void {
    if (this.stepsExists) {
      this.removeActiveStep();
      this.updateActiveStep(index);
    }
  }

  private updateActiveStep(index: number) {
    this.progressSteps[index].activeState = this.progressSteps[index];
  }

  private removeActiveStep() {
    this.progressSteps.map((step) => {
      if (step.isActive) {
        step.isActive = false;
      }
    });
  }

  private initStepIndex() {
    this.progressSteps.forEach((step, i) => (step.stepIndex = i));
  }

  public get activeStep(): ProgressStepComponent {
    return this.progressSteps[this.activeIndex];
  }

  private get stepsExists(): boolean {
    return this.progressSteps && Array.isArray(this.progressSteps);
  }

  private get progressSteps(): ProgressStepComponent[] {
    return this.steps.toArray();
  }

  protected generateProgressArray(length: number): any[] {
    return [...Array(length).keys()].map((key) => {
      return {
        stepIndex: key,
        status: key === this.activeIndex ? Status.IN_PROGRESS : Status.PENDING,
        title: this.stepTitle[key],
      };
    });
  }

  private initProgress(value: any): void {
    this.itemLength = value || 0;
    this.itemProgressList = this.generateProgressArray(this.itemLength);
  }

  public viewStepDetails(index: number) {
    if (this.itemProgressList[3].status === 'completed') {
      this.activeIndex = index;
      this.setActiveStep(index);
    }
  }

  // --------------Update state of each step---------------- //

  protected completeLastStep() {
    this.itemProgressList[this.activeIndex].status = Status.COMPLETED;
  }

  protected undoLastComplete() {
    this.itemProgressList[this.activeIndex].status = Status.IN_PROGRESS;
  }

  protected switchStatusNext(index: number): void {
    this.itemProgressList[this.activeIndex - 1].status = Status.COMPLETED;
    this.itemProgressList[index].status = Status.IN_PROGRESS;
  }

  protected switchStatusPrev(index: number) {
    this.itemProgressList[this.activeIndex + 1].status = Status.PENDING;
    this.itemProgressList[index].status = Status.IN_PROGRESS;
  }
}
