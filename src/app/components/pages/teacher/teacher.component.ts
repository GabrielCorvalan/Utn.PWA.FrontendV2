import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { ITeacher } from 'src/app/intefaces/ITeacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styles: []
})
export class TeacherComponent implements OnInit {

  teachers: ITeacher[];
  constructor() { }

  ngOnInit() { }

}
