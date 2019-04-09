import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/app/intefaces/ICompany';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styles: []
})
export class CompanyComponent implements OnInit {

  companies: ICompany[];
  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.GetCompanys();
  }

  GetCompanys(): void {
    this.companyService.getAllCompanies()
      .subscribe((res: ICompany[]) => {
          this.companies = res;
      }, (error: any): void => console.log(error));
  }

}
