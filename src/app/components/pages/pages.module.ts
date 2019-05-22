import { NgModule } from '@angular/core'; import { CommonModule } from '@angular/common';
import { CareerModule } from './career/career.module'; import { CompanyModule } from './company/company.module';
import { TeacherModule } from './teacher/teacher.module'; import { InternModule } from './intern/intern.module';
import { UserModule } from './user/user.module';
import { InternshipModule } from './internship/internship.module';
import { MaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentService } from './student/student.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentModule } from './student/student.module';
import { CompanyTutorComponent } from './company-tutor/company-tutor.component';

@NgModule({
  declarations: [CompanyTutorComponent],
  exports: [
    CompanyTutorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    CareerModule,
    StudentModule,
    CompanyModule,
    TeacherModule,
    InternModule,
    UserModule,
    InternshipModule
  ],
  providers: [ StudentService ]
})
export class PagesModule { }
