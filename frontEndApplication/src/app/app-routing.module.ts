import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProcedureProgressStateComponent } from './components/procedure-progress-state/procedure-progress-state.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReferencedocsComponent } from './components/referencedocs/referencedocs.component';
import { PostprepactionComponent } from './components/postprepaction/postprepaction.component';
import { ReportComponent } from './components/report/report.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'procedure-progress', component: ProcedureProgressStateComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'refdocs', component: ReferencedocsComponent },
  { path: 'postprepaction', component: PostprepactionComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: '*', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
