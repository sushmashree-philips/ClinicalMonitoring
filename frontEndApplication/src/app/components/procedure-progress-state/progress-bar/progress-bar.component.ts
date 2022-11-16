import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CompletionString, Status } from 'src/app/constants/constants';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { SignalrService } from 'src/app/services/signalr.service';
import {
  StepCompletionStatus,
  StepContentInfo,
} from 'src/app/_interfaces/step.model';
import { ProgressStepComponent } from './progress-step/progress-step.component';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, AfterViewInit {
  public itemLength!: number;
  public itemProgressList: {
    stepIndex: number;
    status: string;
    title: string;
  }[] = [];
  public activeIndex = 0;
  // public stepTitle = ['Pre-Procedure', 'Scan', 'Post-Procedure', 'Checkout'];
  public stepTitle = ['Pre-Procedure', 'Scan', 'Post-Procedure'];
  public preProcedureStepContent: string[] = [];
  public scanStepContent: string[] = [];
  public postProcedureStepContent: string[] = [];

  private preProcedure: StepCompletionStatus = {
    endIndex: 0,
    isCompleted: false,
  };
  private scan: StepCompletionStatus = {
    endIndex: 0,
    isCompleted: false,
  };
  private postProcedure: StepCompletionStatus = {
    endIndex: 0,
    isCompleted: false,
  };

  @Output() public stateChange = new EventEmitter<{
    activeIndex: number;
    activeStep: ProgressStepComponent;
  }>();

  @Output() public allStepsCompleted = new EventEmitter<boolean>();

  @ViewChildren(ProgressStepComponent)
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
    this.signalRService.data.subscribe((response) => {
      let resp = response.map(val => val.procedure)
      this.preProcedure.endIndex = resp.findIndex(
        (ele, ind) =>
          ele.toLocaleLowerCase() ===
          CompletionString.PRE_PROCEDURE_COMPLETED.toLocaleLowerCase()
      );
      this.scan.endIndex = resp.findIndex(
        (ele, ind) =>
          ele.toLocaleLowerCase() ===
          CompletionString.SCAN_COMPLETED.toLocaleLowerCase()
      );
      this.postProcedure.endIndex = resp.findIndex(
        (ele, ind) =>
          ele.toLocaleLowerCase() ===
          CompletionString.POST_PROCEDURE_COMPLETED.toLocaleLowerCase()
      );

      if (!this.preProcedure.isCompleted) {
        if (this.preProcedure.endIndex > 0) {
          this.preProcedure.isCompleted = true;
          this.preProcedureStepContent = resp.slice(
            0,
            this.preProcedure.endIndex
          );
          this.startProgressBarSteps();
        } else if (this.preProcedure.endIndex == -1) {
          this.preProcedureStepContent = resp.slice(0, resp.length + 1);
        }
      }

      if (!this.scan.isCompleted) {
        if (this.preProcedure.endIndex > 0 && this.scan.endIndex > 0) {
          this.scan.isCompleted = true;
          this.scanStepContent = resp.slice(
            this.preProcedure.endIndex + 1,
            this.scan.endIndex
          );
          this.startProgressBarSteps();
        } else if (this.preProcedure.endIndex > 0 && this.scan.endIndex == -1) {
          this.scanStepContent = resp.slice(
            this.preProcedure.endIndex + 1,
            resp.length + 1
          );
        }
      }

      if (!this.postProcedure.isCompleted) {
        if (this.scan.endIndex > 0 && this.postProcedure.endIndex > 0) {
          this.postProcedure.isCompleted = true;
          this.postProcedureStepContent = resp.slice(
            this.scan.endIndex + 1,
            resp.length + 1
          );
          this.startProgressBarSteps();
        } else if (this.postProcedure.endIndex == -1) {
          this.postProcedureStepContent = resp.slice(
            this.scan.endIndex + 1,
            resp.length + 1
          );
        }
      }
    });
  }

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

  ngAfterViewInit() {
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
    if (this.itemProgressList[2].status === 'completed') {
      this.activeIndex = index;
      this.setActiveStep(index);
    }
  }

  // --------------Update state of each step---------------- //

  protected completeLastStep() {
    console.log('In completeLastStep')
    this.itemProgressList[this.activeIndex].status = Status.COMPLETED;
    this.allStepsCompleted.emit(true);
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
