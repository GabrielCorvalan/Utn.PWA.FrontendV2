import { CompanyTutorRoutingModule } from './company-tutor-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompanyTutorComponent } from './company-tutor.component';
import { CompanyTutorCreateOrUdateComponent } from './company-tutor-create-or-udate/company-tutor-create-or-udate.component';

@NgModule({
  declarations: [
    CompanyTutorComponent,
    CompanyTutorCreateOrUdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CompanyTutorRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class CompanyTutorModule { }
