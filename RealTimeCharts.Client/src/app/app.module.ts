import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProgressBarComponent } from './components/procedure-progress-state/progress-bar/progress-bar.component';
import { ProgressStepComponent } from './components/procedure-progress-state/progress-bar/progress-step/progress-step.component';
import { ProgressStepDirective } from './directives/progress-step-directive/progress-step.directive';
import { ProcedureProgressStateComponent } from './components/procedure-progress-state/procedure-progress-state.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    ProgressStepComponent,
    ProgressStepDirective,
    ProcedureProgressStateComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
