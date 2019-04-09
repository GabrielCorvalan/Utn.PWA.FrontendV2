import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserCreateOrUpdateComponent } from './user-create-or-update/user-create-or-update.component';
import { MaterialModule } from 'src/app/app-material.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserComponent,
    UserCreateOrUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule
  ]
})
export class UserModule { }
