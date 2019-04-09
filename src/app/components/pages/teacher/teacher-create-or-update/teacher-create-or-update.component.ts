import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// import { StudentService } from '../teacher.service';

@Component({
  selector: 'app-teacher-create-or-update',
  templateUrl: './teacher-create-or-update.component.html',
  styles: []
})
export class TeacherCreateOrUpdateComponent implements OnInit {

  teacherForm: FormGroup;
  step = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.onLoad();
  }

  private onLoad(): void {
    this.teacherForm = this.fb.group({
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required],
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

  onSubmit(): void {
    console.log(this.teacherForm.value);
    // this.teacherService.CreateStudent(this.teacherForm.value);
  }

  backStep(): void {
    this.step = true;
  }

}
