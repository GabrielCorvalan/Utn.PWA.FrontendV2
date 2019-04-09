import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/DataService';
import { ITeacher } from 'src/app/intefaces/ITeacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends DataService {

  constructor(private http: HttpClient) {
    super();
  }

  getAllTeachers(): Observable<ITeacher[]> {
    return this.http.get(this._baseUrl + '/teacher', {headers: this._headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getTeacherById(id: string): Observable<ITeacher> {
    return this.http.get(this._baseUrl + '/teacher/' + id).pipe(
      map((res: ITeacher) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  createTeacher(teacher: ITeacher): Observable<boolean> {
    this._headers.set('Content-Type', 'application/json');
    const result = JSON.stringify(teacher);
    // console.log(result);
    return this.http.post(this._baseUrl + '/teacher', result, { headers: this._headers }).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }

  deleteTeacher(id: number): Observable<boolean> {
    return this.http.delete(this._baseUrl + '/teacher/' + id, {headers: this._headers}).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getTeachersByFilter(filter: string) {
    const parameters = new HttpParams().set('filter', filter);
    this._headers.set('Content-Type', 'application/json');
    return this.http.get(this._baseUrl + '/teacher/ByFilter', {params: parameters, headers: this._headers}).pipe(
      map((res: ITeacher) => {
        return res;
      }),
      catchError(this.handleError), );
  }
}
