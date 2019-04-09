import { ITeacher } from './../../../../intefaces/ITeacher';
import { Component, OnInit, Inject } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';
import { IStudent } from 'src/app/intefaces/IStudent';
import { CompanyTutorService } from '../../company-tutor/company-tutor.service';
import { StudentService } from '../../student/student.service';

@Component({
  selector: 'app-teacher-search-dialog',
  templateUrl: './teacher-search-dialog.component.html',
  styleUrls: ['./teacher-search-dialog.component.scss']
})
export class TeacherSearchDialogComponent implements OnInit {
  teachers: ITeacher[];
  tutors: ICompanyTutor[];
  students: IStudent[];
  constructor(private teacherService: TeacherService,
              private tutorService: CompanyTutorService,
              private studentService: StudentService,
              public dialogRef: MatDialogRef<TeacherSearchDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public type: number ) { }

  ngOnInit() {
  }

  onClickSearch(filter: string): void {
    if ( this.type === 1 ) {
      this.searchTeachers(filter);
    } else if ( this.type === 2 ) {
      this.searchStudents(filter);
    } else {
      this.searchTutors(filter);
    }
  }

  searchTeachers(filter: string) {
    this.teacherService.getTeachersByFilter(filter)
    .subscribe((res: ITeacher[]) => {
      this.teachers = res;
      console.log('teachers', this.teachers);

    }, (error: any): void => console.log(error));
  }

  searchStudents(filter: string) {
    this.studentService.getStudentsByFilter(filter)
    .subscribe((res: IStudent[]) => {
      this.students = res;
      console.log('students', this.students);

    }, (error: any): void => console.log(error));
  }

  searchTutors(filter: string) {
    this.tutorService.getTutorsByFilter(filter)
    .subscribe((res: ICompanyTutor[]) => {
      this.tutors = res;
      console.log('tutors', this.tutors);

    }, (error: any): void => console.log(error));
  }
}
