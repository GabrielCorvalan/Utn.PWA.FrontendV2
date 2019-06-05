import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ICareer } from 'src/app/intefaces/ICareer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(public http: HttpClient) {}

  getCareers(): Observable<ICareer[]> {
    return this.http.get(environment.url + '/career').pipe(
      map((res: ICareer[]) => {
        return res;
      }));
  }

  getCareerById(id: any): Observable<ICareer> {
    return this.http.get(environment.url + '/career/' + id).pipe(
      map((res: ICareer) => {
        return res;
      }));
  }

  createOrUpdCareer(career: ICareer): Observable<boolean> {
    const result = JSON.stringify(career);
    return this.http.post(environment.url + '/career', result).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete(environment.url + '/career/' + id).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  GetStudentsForCareerReport() {
    return this.http.get(environment.url + '/career/CareerReport').pipe(
      map(res => {
        return res;
      }));
  }
}
