import { TeacherService } from './../teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ITeacher } from 'src/app/intefaces/ITeacher';

@Component({
  selector: 'app-teacher-create-or-update',
  templateUrl: './teacher-create-or-update.component.html',
  styles: []
})
export class TeacherCreateOrUpdateComponent implements OnInit {
  step = true;
  pageTittle = 'Nuevo Profesor';
  idParam: string;

  teacherForm = this.fb.group({
    names: ['', Validators.required],
    surnames: ['', Validators.required],
    email: ['', Validators.required],
    dni: ['', Validators.required],
    cuil: ['', Validators.required],
    address: this.fb.group({
      streetAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
    })
  });

  constructor(private fb: FormBuilder,
              private notificationService: NotificationsService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private teacherService: TeacherService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.spinner.show();
    this.idParam = this.route.snapshot.params.id;
    if ( this.idParam ) {
      this.getTeacherById(this.idParam);
    }
  }

  getTeacherById(id: string) {
    this.teacherService.getTeacherById(id)
    .subscribe((teacher: ITeacher) => {
      this.setFormValue(teacher);
    }, (error: any) => {
      this.notificationService.create('Ups... Hubo un problema', error, NotificationType.Error);
    });
  }

  setFormValue(teacher: ITeacher): void {
    this.teacherForm.setValue({
      names: [teacher.names],
      surnames: [teacher.surnames],
      email: [teacher.email],
      dni: [teacher.dni],
      cuil: [teacher.cuil],
      address: this.fb.group({
        streetAddress: [teacher.address.streetAddress],
        state: [teacher.address.state],
        city: [teacher.address.city],
        zipCode: [teacher.address.zipCode],
        country: [teacher.address.country],
      })
    });
  }

  backStep(): void {
    this.step = true;
  }

  nextStep(): void {
    this.step = false;
  }

  onSubmit(): void {
    this.spinner.show();

    const teacher: ITeacher = this.teacherForm.getRawValue();
    teacher.id = this.idParam ? this.idParam : null;

    this.teacherService.createTeacher(teacher)
    .subscribe((res: boolean) => {
      if ( res ) {
        this.spinner.hide();
        this.notificationService.create('Muy bien!', 'Profesor creado correctamente.', NotificationType.Success);
        this.router.navigate(['/teachers']);
      }
    }, (error: any) => {
      this.spinner.hide();
      this.notificationService.create('Ups... Hubo un problema', error, NotificationType.Error);
    });
    // this.teacherService.CreateStudent(this.teacherForm.value);
  }

}
