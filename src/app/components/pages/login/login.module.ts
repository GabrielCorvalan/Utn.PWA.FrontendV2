import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/app-material.module';
// import { LoginRoutingModule } from './login-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
})
export class LoginModule { }
