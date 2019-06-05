import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IStudent } from 'src/app/intefaces/IStudent';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<IStudent[]> {
    return this.http.get(environment.url + '/student').pipe(
      map((res: IStudent[]) => {
        return res;
      }));
  }

  getStudentById(id: string): Observable<IStudent> {
    return this.http.get(environment.url + '/student/' + id).pipe(
      map((res: IStudent) => {
        return res;
      }));
  }

  createStudent(student: IStudent): Observable<boolean> {
    const result = JSON.stringify(student);

    return this.http.post(environment.url + '/student', result).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  deleteStudent(id: number): Observable<boolean> {
    return this.http.delete(environment.url + '/student/' + id).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  dniValidate(dni: number): Observable<boolean> {
    return this.http.get(environment.url + '/student/validateDni/' + dni).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  getStudentsByFilter(filter: string) {
    const parameters = new HttpParams().set('filter', filter);
    return this.http.get(environment.url + '/student/ByFilter', {params: parameters}).pipe(
      map((res: IStudent[]) => {
        return res;
      }));
  }

}
