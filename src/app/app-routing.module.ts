import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { HpTasksComponent } from './hp-tasks/hp-tasks.component';

const routes: Routes = [
  { path: 'all-tasks', component: AllTasksComponent },
  { path: 'hp-tasks', component: HpTasksComponent },
  { path: '', redirectTo: '/all-tasks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
