import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { IInternship } from 'src/app/intefaces/IInternship';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
import { URLSearchParams } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  constructor(private http: HttpClient) {}

  getAllInternships(): Observable<IInternship[]> {
    return this.http.get(environment.url + '/internship').pipe(
      map((res: IInternship[]) => {
        return res;
      }));
  }

  getInternshipById(id: string): Observable<IInternship> {
    return this.http.get(environment.url + '/internship/' + id).pipe(
      map((res: IInternship) => {
        return res;
      }));
  }

  getInternshipFormById(id: number): Observable<IInternship> {
    return this.http.get(environment.url + '/internship/getForm' + id).pipe(
      map((res: IInternship) => {
        return res;
      }));
  }

  createInternship(internship: IInternship): Observable<boolean> {
    const result = JSON.stringify(internship);

    return this.http.post(environment.url + '/internship', result).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  deleteInternship(id: number): Observable<boolean> {
    return this.http.delete(environment.url + '/internship/' + id).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  cancelInternship(internshipId: number, cancelationDescription: string): Observable<boolean> {
    let result = new URLSearchParams();
    result.set('cancelationDescription', cancelationDescription);

    return this.http.post(environment.url + '/internship/' + internshipId , result).pipe(
      map((res: boolean) => {
        return res;
      }));
  }
}
