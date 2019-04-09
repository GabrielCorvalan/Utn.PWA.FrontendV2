import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentCreateOrUpdateComponent } from './student-create-or-update/student-create-or-update.component';
import { MaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentService } from './student.service';
import { StudentRoutingModule } from './student-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    StudentComponent,
    StudentCreateOrUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    StudentRoutingModule,
    FlexLayoutModule
  ],
  providers: [ StudentService ]
})
export class StudentModule { }
