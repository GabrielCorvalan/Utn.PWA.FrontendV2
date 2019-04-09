import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { TeacherCreateOrUpdateComponent } from './teacher-create-or-update/teacher-create-or-update.component';


const routes: Routes = [
  { path: '', component: TeacherComponent },
  { path: 'create-or-update', component: TeacherCreateOrUpdateComponent },
  { path: 'create-or-update/:id', component: TeacherCreateOrUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
