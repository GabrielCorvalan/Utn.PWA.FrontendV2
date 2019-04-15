import { IData } from './../../teacher/search-dialog/search-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { CareerService } from '../../career/career.service';
import { ICareer } from 'src/app/intefaces/ICareer';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { IStudent } from 'src/app/intefaces/IStudent';
import { SessionStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-student-create-or-update',
  templateUrl: './student-create-or-update.component.html',
  styles: []
})
export class StudentCreateOrUpdateComponent implements OnInit {
  studentForm = this.fb.group({
    names: ['', [Validators.required, Validators.pattern('[A-Za-z ]{0,30}')]],
    surnames: ['', [Validators.required, Validators.pattern('[A-Za-z ]{0,30}')]],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    cuil: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
    career: ['', Validators.required],
    mentor: ['', Validators.required],
    address: this.fb.group({
      streetAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
    })
  });

  careers: ICareer[];
  step = true;
  idParam: string;
  pageTittle = 'Nuevo Estudiante';
  teacherGuideViewValue: string;
  storageData: IData;
  teacherStgData;

  constructor(public fb: FormBuilder,
              private studentService: StudentService,
              private careerService: CareerService,
              private notificationService: NotificationsService,
              public storage: SessionStorageService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getCareers();
    this.storageData = this.storage.retrieve('DATA');
    this.teacherStgData = this.storage.retrieve('searchTeacherData');
    if (this.teacherStgData) {
      this.setFormValue(this.teacherStgData.student);
    } else {
      this.idParam = this.route.snapshot.params.id;
      if ( this.idParam ) {
        this.getStudentById(this.idParam);
      }
    }
    this.spinner.hide();
  }

  getCareers(): void {
    this.careerService.getCareers()
      .subscribe((res: ICareer[]) => {
        this.careers = res;
        console.log('careers', this.careers);
        this.spinner.hide();
      }, (error: any): void => {
        this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
      });
  }

  getStudentById(id: string): void {
    this.studentService.getStudentById(id)
    .subscribe((student: IStudent) => {
      this.pageTittle = `Editar datos de ${student.names} ${student.surnames}`;
      this.setFormValue(student);
    }, (error: any) => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }

  searchTeacherDialog() {
      const searchTeacherData = { student: this.studentForm.getRawValue()}
      this.storage.store('searchTeacherData', searchTeacherData);
      this.router.navigate(['search', 4]);
  }

  onSubmit(): void {
    this.spinner.show();
    const student: IStudent = this.studentForm.getRawValue();
    student.id = this.idParam ? this.idParam : null;
    this.createOrUpdateStudent(student);
  }

  createOrUpdateStudent(student: IStudent) {
    this.studentService.createStudent(student)
      .subscribe(((response: any) => {
        if (response.success) {
          if ( this.storageData ) {
            this.storageData.internship.studentId = response.person.id;
            this.storageData.studentViewData = `${response.person.name} ${response.person.surname}`;
            this.spinner.hide();
            this.router.navigate([this.storageData.urlToNavigate]);
          } else {
            this.notificationService.create('Muy bien!', 'Estudiante creado correctamente.', NotificationType.Success);
            this.spinner.hide();
            this.router.navigate(['/career']);
          }
        }
      }), (error: any) => {
        console.log(error);
        this.spinner.hide();
        this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
      });
  }

  nextStep(): void {
    this.step = false;
  }

  backStep(): void {
    this.step = true;
  }

  setFormValue(student: IStudent): void {
    this.studentForm.setValue({
      names: [student.names],
      surnames: [student.surnames],
      email: [student.email],
      dni: [student.dni],
      cuil: [student.cuil],
      career: [student.careerId],
      mentor: [student.mentorId],
      address: this.fb.group({
        streetAddress: [student.address.streetAddress],
        state: [student.address.state],
        city: [student.address.city],
        zipCode: [student.address.zipCode],
        country: [student.address.country],
      })
    });
  }
}
