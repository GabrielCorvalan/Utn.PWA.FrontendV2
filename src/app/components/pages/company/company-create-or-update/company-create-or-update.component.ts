import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-create-or-update',
  templateUrl: './company-create-or-update.component.html',
  styles: []
})
export class CompanyCreateOrUpdateComponent implements OnInit {

  companyForm: FormGroup;

  constructor(private fb: FormBuilder,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.onLoad();
  }

  private onLoad() {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]{0,50}')]],
      email: ['', [Validators.email, Validators.required]],
      cuit: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: this.fb.group({
        streetAddress: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }

  onSubmit(): void {
    console.log(this.companyForm.value);
    this.companyService.createCompany(this.companyForm.value);    
  }

}

// streetAddress: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]')]],
//         state: ['', [Validators.required, Validators.pattern('[a-zA-Z]')]],
//         city: ['', [Validators.required, Validators.pattern('[a-zA-Z]')]],
//         zipCode: ['', [Validators.required, Validators.pattern('[A-Z0-9]{3,6}')]],
//         country: ['', Validators.required]
