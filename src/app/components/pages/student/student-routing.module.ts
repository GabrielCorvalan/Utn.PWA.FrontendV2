import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentCreateOrUpdateComponent } from './student-create-or-update/student-create-or-update.component';
import { SearchDialogComponent } from '../teacher/search-dialog/search-dialog.component';


const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'create-or-update', component: StudentCreateOrUpdateComponent },
  { path: 'create-or-update/:id', component: StudentCreateOrUpdateComponent },
  { path: 'search/:type', component: SearchDialogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
