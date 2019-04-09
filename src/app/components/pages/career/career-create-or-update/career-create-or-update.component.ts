import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerService } from '../career.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career-create-or-update',
  templateUrl: './career-create-or-update.component.html',
  styles: []
})
export class CareerCreateOrUpdateComponent implements OnInit {

  careerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private careerService: CareerService,
              private router: Router) { }

  ngOnInit() {
    this.onLoad();
  }

  private onLoad() {
    this.careerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{0,50}')]],
      deleted: false
    });
  }

  onSubmit(): void {
    this.careerService.createOrUpdCareer(this.careerForm.value)
      .subscribe(((res: boolean) => {
        if (res) {
          this.router.navigate(['/career']);
        }
      }), (error: any) => console.log(error));
  }

}

