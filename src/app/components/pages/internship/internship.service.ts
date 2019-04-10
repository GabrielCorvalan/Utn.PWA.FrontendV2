import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/DataService';
import { IInternship } from 'src/app/intefaces/IInternship';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class InternshipService extends DataService {

  constructor(private http: HttpClient) {
    super();
  }

  getAllInternships(): Observable<IInternship[]> {
    return this.http.get(this._baseUrl + '/internship', {headers: this._headers}).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getInternshipById(id: string): Observable<IInternship> {
    return this.http.get(this._baseUrl + '/internship/' + id).pipe(
      map((res: IInternship) => {
        return res;
      }),

      catchError(this.handleError), );
  }

  getInternshipFormById(id: number): Observable<IInternship> {
    return this.http.get(this._baseUrl + '/internship/getForm' + id).pipe(
      map((res: IInternship) => {
        return res;
      }),

      catchError(this.handleError), );
  }

  createInternship(internship: IInternship): Observable<boolean> {
    let header = this._headers.set('Content-Type', `application/json`);
    const result = JSON.stringify(internship);

    return this.http.post(this._baseUrl + '/internship', result, { headers: header }).pipe(
      map(res => {
        console.log('response http', res);
        return res;

      }), catchError(this.handleError), );
  }

  deleteInternship(id: number): Observable<boolean> {
    return this.http.delete(this._baseUrl + '/internship/' + id).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  cancelInternship(internshipId: number, cancelationDescription: string): Observable<boolean> {
    let result = new URLSearchParams();
    result.set('cancelationDescription', cancelationDescription);

    return this.http.post(this._baseUrl + '/internship/' + internshipId , result, { headers: this._headers }).pipe(
      map(res => {
        console.log('response http', res);
        return res;

      }), catchError(this.handleError), );
  }

}
