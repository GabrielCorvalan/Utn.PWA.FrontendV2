import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/DataService';
import { IUser } from 'src/app/intefaces/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {

  constructor(private http: HttpClient) {
    super();
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get(this._baseUrl + '/user', {headers: this._headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get(this._baseUrl + '/user/' + id).pipe(
      map((res: IUser) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  createUser(user: IUser): Observable<boolean> {
    this._headers.set('Content-Type', 'application/json');
    const result = JSON.stringify(user);
    // console.log(result);
    return this.http.post(this._baseUrl + '/user', result, { headers: this._headers }).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete(this._baseUrl + '/user/' + id, {headers: this._headers}).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getUsersByFilter(filter: string) {
    const parameters = new HttpParams().set('filter', filter);
    this._headers.set('Content-Type', 'application/json');
    return this.http.get(this._baseUrl + '/user/ByFilter', {params: parameters, headers: this._headers}).pipe(
      map((res: IUser) => {
        return res;
      }),
      catchError(this.handleError), );
  }
}
