import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerComponent } from './career.component';
import { CareerCreateOrUpdateComponent } from './career-create-or-update/career-create-or-update.component';


const routes: Routes = [
  { path: '', component: CareerComponent },
  { path: 'create-or-update', component: CareerCreateOrUpdateComponent },
  { path: 'create-or-update/:id', component: CareerCreateOrUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule { }
