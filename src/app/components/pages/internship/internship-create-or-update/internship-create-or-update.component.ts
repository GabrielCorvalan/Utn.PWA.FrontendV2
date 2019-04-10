import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// import * as frLocale from 'date-fns/locale/fr';
import { ICompany } from 'src/app/intefaces/ICompany';
import { CompanyService } from '../../company/company.service';
import { IStudent } from 'src/app/intefaces/IStudent';
import { StudentService } from '../../student/student.service';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { InternshipService } from '../internship.service';
import { Router } from '@angular/router';
import { CompanyTutorService } from '../../company-tutor/company-tutor.service';
import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';

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

  filteredCompanies: Observable<ICompany[]>;
  filteredCompanyTutors: Observable<ICompanyTutor[]>;
  filteredStudents: Observable<IStudent[]>;
  date: Date = new Date();

  // options: DatepickerOptions = {
  //   locale: frLocale
  // };

  companies: ICompany[];
  companyTutors: ICompanyTutor[];
  students: IStudent[];

  constructor( private companyService: CompanyService,
               private studentService: StudentService,
               private fb: FormBuilder,
               private intershipService: InternshipService,
               private companyTutorService: CompanyTutorService,
               private router: Router ) { }

  public ngOnInit() {
    this.loadData();
  }

  private getCompanies() {
    this.companyService.getAllCompanies()
    .subscribe((res: ICompany[]) => {
      this.companies = res;
      this.filteredCompanies = this.fGroup.controls.companyId.valueChanges
      .pipe(
        startWith<string | ICompany>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(company => company ? this._filterCompanies(company) : this.companies.slice())
      );
    });
  }

  private getCompanyTutors() {
    this.companyTutorService.getAllCompanyTutors()
    .subscribe((res: ICompanyTutor[]) => {
      this.companyTutors = res;
      this.filteredCompanyTutors = this.fGroup.controls.companyTutorId.valueChanges
      .pipe(
        startWith<string | ICompanyTutor>(''),
        map(value => typeof value === 'string' ? value : value.names),
        map(companyTutor => companyTutor ? this._filterCompanyTutors(companyTutor) : this.companyTutors.slice())
      );
    });
  }

  private getStudents() {
    this.studentService.getAllStudents()
    .subscribe((res: IStudent[]) => {
      this.students = res;
      this.filteredStudents = this.fGroup.controls.studentId.valueChanges
      .pipe(
        startWith<string | IStudent>(''),
        map(value => typeof value === 'string' ? value : value.names),
        map(student => student ? this._filterStudents(student) : this.students.slice())
      );
    });
  }

  displayStudentFn(studentId?: string): string | undefined {
    if (this.students) {
      var studentF = this.students.filter(student => student.id === studentId)[0]
    }
    return studentF ? `${studentF.names} ${studentF.surnames} ${studentF.cuil}` : undefined;
  }

  displayCompanyFn(companyId?: string): string | undefined {
      if(this.companies)
      var companyF = this.companies.filter(company => company.id === companyId)[0];
    return companyF ? `${companyF.name} ${companyF.cuit}` : undefined;
  }

  displayCompanyTutorFn(companyTutorId?: string): string | undefined {
    console.log(companyTutorId);
    if(this.companyTutors)
    var companyTutorF = this.companyTutors.filter(companyTutor => companyTutor.id === companyTutorId)[0];
  return companyTutorF ? `${companyTutorF.names} ${companyTutorF.surnames} - ${companyTutorF.dni}` : undefined;
}

  private _filterCompanies(value: string): ICompany[] {
    const filterValue = value.toLowerCase();

    return this.companies.filter(company => `${company.name} - ${company.cuit}`.toLowerCase().includes(filterValue));
  }

  private _filterStudents(value: string): IStudent[] {
    const filterValue = value.toLowerCase();

    return this.students.filter(student => `${student.names} ${student.surnames} - ${student.dni}`.toLowerCase().includes(filterValue));
  }

  private _filterCompanyTutors(value: string): ICompanyTutor[] {
    const filterValue = value.toLowerCase();

    return this.companyTutors
          .filter(companyTutor => `${companyTutor.names} ${companyTutor.surnames} - ${companyTutor.dni}`.toLowerCase().includes(filterValue));
  }

  private loadData() {
    this.getCompanies();
    this.getStudents();
    this.getCompanyTutors();
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
    }), (error: any) => console.log(error));
    // this.router.navigate(['/internships']);
  }



}
