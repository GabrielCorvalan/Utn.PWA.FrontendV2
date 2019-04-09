import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyTutorComponent } from './company-tutor.component';
// import { CompanyTutorCreateOrUpdateComponent } from './company-tutor-create-or-update/company-tutor-create-or-update.component';


const routes: Routes = [
  { path: '', component: CompanyTutorComponent },
  // { path: 'create-or-update', component: CompanyTutorCreateOrUpdateComponent },
  // { path: 'create-or-update/:id', component: CompanyTutorCreateOrUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTutorRoutingModule { }
