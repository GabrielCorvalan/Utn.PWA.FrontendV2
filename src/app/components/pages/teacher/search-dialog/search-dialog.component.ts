import { IStudent } from './../../../../intefaces/IStudent';
import { NgxSpinnerService } from 'ngx-spinner';
import { ITeacher } from '../../../../intefaces/ITeacher';
import { Component, OnInit, Inject } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';
import { CompanyTutorService } from '../../company-tutor/company-tutor.service';
import { StudentService } from '../../student/student.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  persons: any[];
  constructor(private teacherService: TeacherService,
              private tutorService: CompanyTutorService,
              private studentService: StudentService,
              private spinner: NgxSpinnerService,
              public dialogRef: MatDialogRef<SearchDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public type: number ) { }

  ngOnInit() {
  }

  onClickSearch(filter: string): void {
    this.spinner.show();
    if ( this.type === 1 ) {
      this.searchTeachers(filter);
    } else if ( this.type === 2 ) {
      this.searchStudents(filter);
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

    }, (error: any): void => console.log(error));
  }

  searchStudents(filter: string) {
    this.studentService.getStudentsByFilter(filter)
    .subscribe((res: IStudent[]) => {
      this.persons = res;
      this.spinner.hide();
      console.log('students', this.persons);

    }, (error: any): void => console.log(error));
  }

  searchTutors(filter: string) {
    this.tutorService.getTutorsByFilter(filter)
    .subscribe((res: ICompanyTutor[]) => {
      this.persons = res;
      this.spinner.hide();
      console.log('tutors', this.persons);

    }, (error: any): void => console.log(error));
  }
}
