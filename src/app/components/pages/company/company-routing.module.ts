import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyCreateOrUpdateComponent } from './company-create-or-update/company-create-or-update.component';


const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'create-or-update', component: CompanyCreateOrUpdateComponent },
  { path: 'create-or-update/:id', component: CompanyCreateOrUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
