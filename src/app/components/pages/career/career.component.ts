import { Component, OnInit } from '@angular/core';
import { CareerService } from './career.service';
import { ICareer } from 'src/app/intefaces/ICareer';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styles: []
})
export class CareerComponent implements OnInit {

  careers: ICareer[];
  constructor(private careerService: CareerService) { }

  ngOnInit() {
    this.GetCareers();
  }

  GetCareers(): void {
    this.careerService.getCareers()
      .subscribe((res: ICareer[]) => {
          this.careers = res;          
      }, (error: any): void => console.log(error));
  }

}
