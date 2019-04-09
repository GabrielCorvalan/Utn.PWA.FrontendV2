import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternshipComponent } from './internship.component';
import { InternshipCreateOrUpdateComponent } from './internship-create-or-update/internship-create-or-update.component';


const routes: Routes = [
  { path: '', component: InternshipComponent },
  { path: 'create-or-update', component: InternshipCreateOrUpdateComponent },
  { path: 'create-or-update/:id', component: InternshipCreateOrUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipRoutingModule { }
