import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ICompanyTutor } from './../../../../intefaces/ICompanyTutor';
import { CompanyTutorService } from './../company-tutor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  idParam: string;
  pageTittle = 'Nuevo Tutor';

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
              private notificationService: NotificationsService,
              private companyService: CompanyService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog ) {  }

  ngOnInit() {
    this.spinner.show();
    this.getCompanies();
    this.idParam = this.route.snapshot.params.id;
    if ( this.idParam ) {
      this.getTutorById(this.idParam);
    }
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
    }), (error: any) => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }

  getTutorById(id: string): void {
    this.companyTutorService.getCompanyTutorById(id)
    .subscribe((tutor: ICompanyTutor) => {
      this.pageTittle = `Editar datos de ${tutor.names} ${tutor.surnames}`;
      this.setFormValue(tutor);
    }, (error: any) => {
      this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
    });
  }

  setFormValue(tutor: ICompanyTutor): void {
    this.companyTutorForm.setValue({
      names: [tutor.names],
      surnames: [tutor.surnames],
      email: [tutor.email],
      dni: [tutor.dni],
      cuil: [tutor.cuil],
      company: [tutor.companyId],
      address: this.fb.group({
        streetAddress: [tutor.address.streetAddress],
        state: [tutor.address.state],
        city: [tutor.address.city],
        zipCode: [tutor.address.zipCode],
        country: [tutor.address.country],
      })
    });
  }

  onSubmit(): void {
    this.spinner.show();
    const tutor = this.companyTutorForm.getRawValue();
    tutor.id = this.idParam ? this.idParam : null;
    this.companyTutorService.createCompanyTutor(tutor)
      .subscribe(((res: boolean) => {
        if (res) {
          this.notificationService.create('Muy bien!', 'Tutor creado correctamente.', NotificationType.Success);
          this.spinner.hide();
          this.router.navigate(['/company-tutor']);
        }
      }), (error: any) => {
        this.notificationService.create('Ups... Hubo un error', error, NotificationType.Error);
        this.spinner.hide();
      });
  }

  nextStep(): void {
    this.step = false;
  }

  backStep(): void {
    this.step = true;
  }

}
