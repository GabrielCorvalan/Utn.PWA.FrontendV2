import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserCreateOrUpdateComponent } from './user-create-or-update/user-create-or-update.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'create-or-update', component: UserCreateOrUpdateComponent },
  { path: 'create-or-update/:id', component: UserCreateOrUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
