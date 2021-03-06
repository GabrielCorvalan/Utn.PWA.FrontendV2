import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserCreateOrUpdateComponent } from './user-create-or-update/user-create-or-update.component';
import { MaterialModule } from 'src/app/app-material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    UserComponent,
    UserCreateOrUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule
  ],
  providers: [UserService]
})
export class UserModule { }
