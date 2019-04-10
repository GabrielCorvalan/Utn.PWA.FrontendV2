import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { IStudent } from 'src/app/intefaces/IStudent';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styles: []
})
export class StudentComponent implements OnInit {

  students: IStudent[];
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.GetStudents();
  }

  GetStudents(): void {
    this.studentService.getAllStudents()
      .subscribe((res: IStudent[]) => {
          this.students = res;
      }, (error: any): void => console.log(error));
  }

}
