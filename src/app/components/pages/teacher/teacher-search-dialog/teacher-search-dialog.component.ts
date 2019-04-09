import { ITeacher } from './../../../../intefaces/ITeacher';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-teacher-search-dialog',
  templateUrl: './teacher-search-dialog.component.html',
  styleUrls: ['./teacher-search-dialog.component.scss']
})
export class TeacherSearchDialogComponent implements OnInit {
  teachers: ITeacher[];
  constructor(private teacherService: TeacherService,
              public dialogRef: MatDialogRef<TeacherSearchDialogComponent>) { }

  ngOnInit() {
  }

  searchTeachers(filter: string) {

    this.teacherService.getTeachersByFilter(filter)
    .subscribe((res: ITeacher[]) => {
      this.teachers = res;
      console.log('students', this.teachers);

  }, (error: any): void => console.log(error));

  }

}
