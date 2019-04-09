import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';
import { CompanyTutorService } from './company-tutor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-tutor',
  templateUrl: './company-tutor.component.html',
  styles: []
})
export class CompanyTutorComponent implements OnInit {
  companyTutors: ICompanyTutor[];
  constructor(private companyTutorService: CompanyTutorService) { }

  ngOnInit() {
    this.getCompanyTutors();
  }

  getCompanyTutors() {
    this.companyTutorService.getAllCompanyTutors()
    .subscribe((res: ICompanyTutor[]) => {
      this.companyTutors = res;
      console.log('company tutors', this.companyTutors);

  }, (error: any): void => console.log(error));
  }

}
