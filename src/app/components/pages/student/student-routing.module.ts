import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentCreateOrUpdateComponent } from './student-create-or-update/student-create-or-update.component';
import { TeacherSearchDialogComponent } from '../teacher/teacher-search-dialog/teacher-search-dialog.component';


const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'create-or-update', component: StudentCreateOrUpdateComponent },
  { path: 'create-or-update/:id', component: StudentCreateOrUpdateComponent },
  { path: 'create-or-update/search/:id', component: TeacherSearchDialogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
