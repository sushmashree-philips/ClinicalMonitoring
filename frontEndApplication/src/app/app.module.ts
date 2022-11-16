import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarComponent } from './components/procedure-progress-state/progress-bar/progress-bar.component';
import { ProgressStepComponent } from './components/procedure-progress-state/progress-bar/progress-step/progress-step.component';
import { ProgressStepDirective } from './directives/progress-step-directive/progress-step.directive';
import { ProcedureProgressStateComponent } from './components/procedure-progress-state/procedure-progress-state.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { AdminComponent } from './components/admin/admin.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from "@angular/material/dialog";
import { ReferencedocsComponent } from './components/referencedocs/referencedocs.component';
import { PostprepactionComponent } from './components/postprepaction/postprepaction.component';



@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    ProgressStepComponent,
    ProgressStepDirective,
    ProcedureProgressStateComponent,
    CountdownTimerComponent,
    AdminComponent,
    ReferencedocsComponent,
    PostprepactionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
