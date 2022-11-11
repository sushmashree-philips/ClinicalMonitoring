import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProcedureProgressStateComponent } from './components/procedure-progress-state/procedure-progress-state.component';

const routes: Routes = [
  {path: 'procedure-progress', component: ProcedureProgressStateComponent},
  {path: '*', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
