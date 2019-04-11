import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { IStudent } from 'src/app/intefaces/IStudent';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationType, NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styles: []
})
export class StudentComponent implements OnInit {

  students: IStudent[];
  constructor(private studentService: StudentService,
              private spinner: NgxSpinnerService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.spinner.show();
    this.GetStudents();
  }

  GetStudents(): void {
    this.studentService.getAllStudents()
      .subscribe((res: IStudent[]) => {
        this.students = res;
        this.spinner.hide();
      }, (error: any): void => {
        this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
      });
  }

}
