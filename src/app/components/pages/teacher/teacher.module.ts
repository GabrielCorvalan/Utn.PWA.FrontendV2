import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { TeacherCreateOrUpdateComponent } from './teacher-create-or-update/teacher-create-or-update.component';
import { MaterialModule } from 'src/app/app-material.module';
import { TeacherService } from './teacher.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherSearchDialogComponent } from './teacher-search-dialog/teacher-search-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherCreateOrUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    TeacherRoutingModule,
    FlexLayoutModule
  ],
  providers: [ TeacherService ]
})
export class TeacherModule { }
