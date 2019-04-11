import { IStudent } from './../../../../intefaces/IStudent';
import { NgxSpinnerService } from 'ngx-spinner';
import { ITeacher } from '../../../../intefaces/ITeacher';
import { Component, OnInit, Inject } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';
import { CompanyTutorService } from '../../company-tutor/company-tutor.service';
import { StudentService } from '../../student/student.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  persons: any[];
  title: string;
  constructor(private teacherService: TeacherService,
              private tutorService: CompanyTutorService,
              private studentService: StudentService,
              private spinner: NgxSpinnerService,
              private notificationService: NotificationsService,
              public dialogRef: MatDialogRef<SearchDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public type: number ) { }

  ngOnInit() {
    if ( this.type === 1) {
      this.title = 'Estudiantes';
    } else if (this.type === 2) {
      this.title = 'Profesores';
    } else {
      this.title = 'Tutores';
    }
  }

  onClickSearch(filter: string): void {
    this.spinner.show();
    if ( this.type === 1 ) {
      this.searchStudents(filter);
    } else if ( this.type === 2 ) {
      this.searchTeachers(filter);
    } else {
      this.searchTutors(filter);
    }
  }

  onSelectButton(dni: string) {
    const person = this.persons.filter(p => p.dni === dni);
    this.dialogRef.close(person);
  }

  searchTeachers(filter: string) {
    this.teacherService.getTeachersByFilter(filter)
    .subscribe((res: ITeacher[]) => {
      this.persons = res;
      this.spinner.hide();
      console.log('teachers', this.persons);
    }, (error: any): void => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }

  searchStudents(filter: string) {
    this.studentService.getStudentsByFilter(filter)
    .subscribe((res: IStudent[]) => {
      this.persons = res;
      this.spinner.hide();
      console.log('students', this.persons);

    }, (error: any): void => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }

  searchTutors(filter: string) {
    this.tutorService.getTutorsByFilter(filter)
    .subscribe((res: ICompanyTutor[]) => {
      this.persons = res;
      this.spinner.hide();
      console.log('tutors', this.persons);

    }, (error: any): void => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }
}
