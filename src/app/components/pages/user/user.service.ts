import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { IUser } from 'src/app/intefaces/IUser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  get currentUser() {
    return localStorage.getItem('currentUser');
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get(environment.url + '/user').pipe(
      map((res: IUser[]) => {
        return res;
      }));
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get(environment.url + '/user/' + id).pipe(
      map((res: IUser) => {
        return res;
      }));
  }

  createUser(user: IUser): Observable<boolean> {
    const result = JSON.stringify(user);
    // console.log(result);
    return this.http.post(environment.url + '/user', result).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete(environment.url + '/user/' + id).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  getUsersByFilter(filter: string) {
    const parameters = new HttpParams().set('filter', filter);
    return this.http.get(environment.url + '/user/ByFilter', {params: parameters}).pipe(
      map((res: IUser) => {
        return res;
      }));
  }
}
