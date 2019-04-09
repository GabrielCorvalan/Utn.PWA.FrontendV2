import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternComponent } from './intern.component';
import { MaterialModule } from 'src/app/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InternComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ]
})
export class InternModule { }
