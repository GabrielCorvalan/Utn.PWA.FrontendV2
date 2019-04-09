import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternshipComponent } from './internship.component';
import { InternshipCreateOrUpdateComponent } from './internship-create-or-update/internship-create-or-update.component';
import { MaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InternshipDetailComponent } from './internship-detail/internship-detail.component';
import { InternshipRoutingModule } from './internships-routing.module';
import { InternshipCancelComponent } from './internship-cancel/internship-cancel.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  entryComponents: [ InternshipDetailComponent, InternshipCancelComponent ],
  declarations: [
    InternshipComponent,
    InternshipCreateOrUpdateComponent,
    InternshipDetailComponent,
    InternshipCancelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InternshipRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class InternshipModule { }
