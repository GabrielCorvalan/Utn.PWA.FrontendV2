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
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  studentForm: FormGroup;
  step = true;

  states: State[] = [
    {
      name: 'Juan Fernandez',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'Maximiliano Sar Fernandez',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Pedro Troglio',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Martin Scorccese',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor(public fb: FormBuilder,
              private studentService: StudentService,
              private careerService: CareerService,
              private router: Router,
              private dialog: MatDialog ) {  }

  ngOnInit() {
    this.GetCareers();
    this.onLoad();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
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

  nextStep(): void {
    this.step = false;
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
          this.router.navigate(['/career']);
        }
      }), (error: any) => console.log(error));
  }

  backStep(): void {
    this.step = true;
  }

}
