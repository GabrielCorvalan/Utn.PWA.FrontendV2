import { Injectable } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ICareer } from 'src/app/intefaces/ICareer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService extends DataService {

  constructor(public http: HttpClient) {
    super();
  }

  getCareers(): Observable<ICareer[]> {
    return this.http.get(this._baseUrl + '/career').pipe(
      map((res: ICareer[]) => {
        return res;
      }), catchError(this.handleError), );
  }

  getCareerById(id: any): Observable<ICareer> {
    return this.http.get(this._baseUrl + '/career/' + id).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }

  createOrUpdCareer(career: ICareer): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Token'
    });
    const result = JSON.stringify(career);
    return this.http.post(this._baseUrl + '/career', result, { headers: headers }).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete(this._baseUrl + '/career/' + id).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }

  GetStudentsForCareerReport() {
    return this.http.get(this._baseUrl + '/career/CareerReport').pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }
}
