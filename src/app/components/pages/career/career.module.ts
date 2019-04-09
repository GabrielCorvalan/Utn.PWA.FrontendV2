import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerComponent } from './career.component';
import { CareerCreateOrUpdateComponent } from './career-create-or-update/career-create-or-update.component';
import { CareerService } from './career.service';
import { MaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CareerRoutingModule } from './career-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CareerComponent,
    CareerCreateOrUpdateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    CareerRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ CareerService ]  
})
export class CareerModule { }
