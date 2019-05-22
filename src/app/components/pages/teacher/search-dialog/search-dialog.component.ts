import { ActivatedRoute, Router } from '@angular/router';
import { IInternship } from './../../../../intefaces/IInternship';
import { IStudent } from './../../../../intefaces/IStudent';
import { NgxSpinnerService } from 'ngx-spinner';
import { ITeacher } from '../../../../intefaces/ITeacher';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';
import { CompanyTutorService } from '../../company-tutor/company-tutor.service';
import { StudentService } from '../../student/student.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { SessionStorageService } from 'ngx-webstorage';

export interface IData {
  internship: IInternship;
  studentViewData: string;
  companyTutorViewData: string;
  companyViewData: string;
  urlToNavigate: string;
}

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  persons: any[];
  title: string;
  paramId: number;
  storageData: any;
  constructor (
    private teacherService: TeacherService,
    private tutorService: CompanyTutorService,
    private studentService: StudentService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public storage: SessionStorageService,
    private router: Router,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    this.storageData = this.storage.retrieve('DATA');
    this.paramId = this.route.snapshot.params.type;
    if ( this.paramId === 1) {
      this.title = 'Estudiantes';
    } else if (this.paramId === 4) {
      this.title = 'Companias';
    } else {
      this.title = 'Tutores';
    }
  }

  onClickSearch(filter: string): void {
    this.spinner.show();
    if ( this.paramId === 1 ) {
      this.searchStudents(filter);
    } else if ( this.paramId === 4 ) {
      this.searchTeachers(filter);
    } else {
      this.searchTutors(filter);
    }
  }

  onSelectButton(person: any) {
    if ( this.paramId === 1 ) {
      this.storageData.internship.studentId = person.id;
      this.storageData.studentViewData = `${person.name} ${person.surname}`;
    } else if ( this.paramId === 4 ) {
      this.storageData.student.mentor.id = person.id;
      this.storageData.mentorViewData = `${person.name} ${person.surname}`;
    } else {
      this.storageData.internship.companyTutorId = person.id;
      this.storageData.companyTutorViewData = `${person.name} ${person.surname}`;
    }
    this.storage.store('DATA', person);
    this.router.navigate([this.storageData.urlToNavigate]);
  }

  searchTeachers(filter: string) {
    this.teacherService.getTeachersByFilter(filter)
    .subscribe((teacher: ITeacher[]) => {
      this.persons = teacher;
      this.spinner.hide();
      console.log('teachers', this.persons);
    }, (error: any): void => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }

  searchStudents(filter: string) {
    this.studentService.getStudentsByFilter(filter)
    .subscribe((student: IStudent[]) => {
      this.persons = student;
      this.spinner.hide();
    }, (error: any): void => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }

  searchTutors(filter: string) {
    this.tutorService.getTutorsByFilter(filter)
    .subscribe((tutor: ICompanyTutor[]) => {
      this.persons = tutor;
      this.spinner.hide();
    }, (error: any): void => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }
}
