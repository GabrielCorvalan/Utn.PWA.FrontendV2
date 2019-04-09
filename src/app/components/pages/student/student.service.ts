import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/DataService';
import { IStudent } from 'src/app/intefaces/IStudent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends DataService {

  constructor(private http: HttpClient) {
    super();
  }

  getAllStudents(): Observable<IStudent[]> {
    return this.http.get(this._baseUrl + '/student', {headers: this._headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getStudentById(id: string): Observable<IStudent> {
    return this.http.get(this._baseUrl + '/student/' + id).pipe(
      map((res: IStudent) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  createStudent(student: IStudent): Observable<boolean> {
    this._headers.set('Content-Type', 'application/json');
    const result = JSON.stringify(student);
    console.log(result);

    return this.http.post(this._baseUrl + '/student', result, { headers: this._headers }).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }

  deleteStudent(id: number): Observable<boolean> {
    return this.http.delete(this._baseUrl + '/student/' + id).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  dniValidate(dni: number): Observable<boolean> {
    return this.http.get(this._baseUrl + '/student/validateDni/' + dni).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getStudentsByFilter(filter: string) {
    const parameters = new HttpParams().set('filter', filter);
    this._headers.set('Content-Type', 'application/json');
    return this.http.get(this._baseUrl + '/student/ByFilter', {params: parameters, headers: this._headers}).pipe(
      map((res: IStudent[]) => {
        return res;
      }),
      catchError(this.handleError), );
  }

}
