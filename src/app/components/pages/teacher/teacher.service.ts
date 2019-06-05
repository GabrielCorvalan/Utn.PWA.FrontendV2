import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ITeacher } from 'src/app/intefaces/ITeacher';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<ITeacher[]> {
    return this.http.get(environment.url + '/teacher').pipe(
      map((res: ITeacher[]) => {
        return res;
      }));
  }

  getTeacherById(id: string): Observable<ITeacher> {
    return this.http.get(environment.url + '/teacher/' + id).pipe(
      map((res: ITeacher) => {
        return res;
      }));
  }

  createTeacher(teacher: ITeacher): Observable<boolean> {
    const result = JSON.stringify(teacher);
    return this.http.post(environment.url + '/teacher', result).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  deleteTeacher(id: number): Observable<boolean> {
    return this.http.delete(environment.url + '/teacher/' + id).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  getTeachersByFilter(filter: string): Observable<ITeacher[]> {
    const parameters = new HttpParams().set('filter', filter);
    return this.http.get(environment.url + '/teacher/ByFilter', {params: parameters}).pipe(
      map((res: ITeacher[]) => {
        return res;
      }));
  }
}
