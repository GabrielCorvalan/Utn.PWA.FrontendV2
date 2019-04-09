import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyCreateOrUpdateComponent } from './company-create-or-update/company-create-or-update.component';
import { MaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyCreateOrUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    RouterModule
  ]
})
export class CompanyModule { }
