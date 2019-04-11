import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
// import * as frLocale from 'date-fns/locale/fr';
import { ICompany } from 'src/app/intefaces/ICompany';
import { IStudent } from 'src/app/intefaces/IStudent';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { InternshipService } from '../internship.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';
import { MatDialog } from '@angular/material';
import { SearchDialogComponent } from '../../teacher/search-dialog/search-dialog.component';
import { NotificationsService, NotificationType } from 'angular2-notifications';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-internship-create-or-update',
  templateUrl: './internship-create-or-update.component.html',
  styles: [],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class InternshipCreateOrUpdateComponent implements OnInit {

  studentViewValue = 'Seleccione un estudiante';
  companyViewValue = 'Seleccione un Profesor';
  tutorViewValue = 'seleccione un tutor de la empresa';

  fGroup = this.fb.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    taskDescription: ['', Validators.required],
    companyId: ['', Validators.required],
    // companyId: [this.fGroup.controls.company.value ? this.fGroup.controls.company.value.id : null],
    studentId: ['', Validators.required],
    // studentId: [this.fGroup.controls.student.value ? this.fGroup.controls.student.value.id : null],
    companyTutorId: ['', Validators.required],
    companySignatory: ['', Validators.required],
    salaryWorkAssignment: ['', Validators.required],
    workAgreement: ['', Validators.required],
    dailyHours: ['', Validators.required]
  });

  date: Date = new Date();

  companyTutor: ICompanyTutor;
  student: IStudent;
  company: ICompany;

  constructor( private fb: FormBuilder,
               private intershipService: InternshipService,
               private notificationService: NotificationsService,
               private spinner: NgxSpinnerService,
               private router: Router,
               private dialog: MatDialog,
               private route: ActivatedRoute ) { }

  public ngOnInit() {
    const idParam: number = this.route.snapshot.params.id;
    if ( idParam ) {
      this.spinner.show();
      this.intershipService.getInternshipFormById(idParam)
      .subscribe((res: any) => {
        this.fGroup.setValue(res);
        this.spinner.hide();
      }, (error: any) => {
        console.log(error);
        this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
        this.spinner.hide();
      });
    }
  }

  public searchCompany(searchType: number) {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '80%',
      height: '80%',
      data: searchType
    });

    dialogRef.afterClosed()
    .subscribe((searchedCompany: ICompany) => {
      this.companyViewValue = searchedCompany.name;
      this.company = searchedCompany;
      this.fGroup.get('companyId').setValue(this.company.id);
      console.log('se cerro');
    });
  }

  public searchStudent(searchType: number) {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '80%',
      height: '80%',
      data: searchType
    });

    dialogRef.afterClosed()
    .subscribe((searchedStudent: IStudent) => {
      this.studentViewValue = `${searchedStudent.names} ${searchedStudent.surnames}`;
      this.student = searchedStudent;
      this.fGroup.get('studentId').setValue(this.student.id);
      console.log('se cerro');
    });
  }

  public searchCompanyTutor(searchType: number) {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '80%',
      height: '80%',
      data: searchType
    });

    dialogRef.afterClosed()
    .subscribe((searchedCompanyTutor: ICompanyTutor) => {
      console.log('se cerro', searchedCompanyTutor);
      this.tutorViewValue = `${searchedCompanyTutor.names} ${searchedCompanyTutor.surnames}`;
      this.companyTutor = searchedCompanyTutor;
      this.fGroup.get('companyTutorId').setValue(this.companyTutor.id);
    });
  }

  public onSubmit() {
    this.fGroup.controls.startDate.setValue(this.fGroup.controls.startDate.value.format());
    this.fGroup.controls.endDate.setValue(this.fGroup.controls.endDate.value.format());
    // console.log(this.fGroup.value);

    this.intershipService.createInternship(this.fGroup.value)
    .subscribe(((res: boolean) => {
      if (res) {
        this.router.navigate(['/internships']);
      }
    }), (error: any) => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }



}
