import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StudentService } from '../student.service';
import { CareerService } from '../../career/career.service';
import { ICareer } from 'src/app/intefaces/ICareer';
import { Router } from '@angular/router';
import { TeacherSearchDialogComponent } from '../../teacher/teacher-search-dialog/teacher-search-dialog.component';
import { MatDialog } from '@angular/material';
import { NotificationsService, NotificationType } from 'angular2-notifications';

export interface State {
  flag: string;
  name: string;
  population: string;
}


@Component({
  selector: 'app-student-create-or-update',
  templateUrl: './student-create-or-update.component.html',
  styles: []
})
export class StudentCreateOrUpdateComponent implements OnInit {

  careers: ICareer[];
  filteredStates: Observable<State[]>;
  studentForm: FormGroup;
  step = true;

  constructor(public fb: FormBuilder,
              private studentService: StudentService,
              private careerService: CareerService,
              private notificationService: NotificationsService,
              private router: Router,
              private dialog: MatDialog ) {  }

  ngOnInit() {
    this.GetCareers();
    this.onLoad();
  }

  GetCareers(): void {
    this.careerService.getCareers()
      .subscribe((res: ICareer[]) => {
          this.careers = res;
          console.log('careers', this.careers);

      }, (error: any): void => console.log(error));
  }

  private onLoad(): void {
    this.studentForm = this.fb.group({
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
  }

  searchTeacherDialog() {
      const dialogRef = this.dialog.open(TeacherSearchDialogComponent, {
        width: '800px',
        height: '600px'
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('se cerro');
      });
  }

  onSubmit(): void {
    this.studentService.createStudent(this.studentForm.value)
      .subscribe(((res: boolean) => {
        if (res) {
          this.notificationService.create('Muy bien!', 'Estudiante creado correctamente.', NotificationType.Success);
          this.router.navigate(['/career']);
        }
      }), (error: any) => {
        console.log(error);
        this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
      });
  }

  nextStep(): void {
    this.step = false;
  }

  backStep(): void {
    this.step = true;
  }

}
