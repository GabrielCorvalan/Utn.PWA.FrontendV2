import { ICompanyTutor } from './../../../../intefaces/ICompanyTutor';
import { CompanyTutorService } from './../company-tutor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SearchDialogComponent } from '../../teacher/search-dialog/search-dialog.component';
import { ICompany } from 'src/app/intefaces/ICompany';
import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'app-company-tutor-create-or-udate',
  templateUrl: './company-tutor-create-or-udate.component.html',
  styleUrls: ['./company-tutor-create-or-udate.component.scss']
})
export class CompanyTutorCreateOrUdateComponent implements OnInit {

  // Variables
  step = true;
  companies: ICompany[];

  // FORM
  companyTutorForm = this.fb.group({
    names: ['', [Validators.required, Validators.pattern('[A-Za-z ]{0,30}')]],
    surnames: ['', [Validators.required, Validators.pattern('[A-Za-z ]{0,30}')]],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    cuil: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
    company: ['', Validators.required],
    address: this.fb.group({
      streetAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
    })
  });

  constructor(public fb: FormBuilder,
              private companyTutorService: CompanyTutorService,
              private companyService: CompanyService,
              private router: Router,
              private dialog: MatDialog ) {  }

  ngOnInit() {
    this.getCompanies();
  }

  searchTeacherDialog() {
      const dialogRef = this.dialog.open(SearchDialogComponent, {
        width: '800px',
        height: '600px'
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('se cerro');
      });
  }

  getCompanies() {
    this.companyService.getAllCompanies()
    .subscribe(((res: ICompany[]) => {
      this.companies = res;
    }), (error: any) => console.log(error));
  }

  onSubmit(): void {
    this.companyTutorService.createCompanyTutor(this.companyTutorForm.getRawValue())
      .subscribe(((res: boolean) => {
        if (res) {
          this.router.navigate(['/career']);
        }
      }), (error: any) => console.log(error));
  }

  nextStep(): void {
    this.step = false;
  }

  backStep(): void {
    this.step = true;
  }

}
