import { Injectable } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService extends DataService {

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  postLogin(user: any) {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const result = JSON.stringify(user);
    return this.http.post(this._baseUrl + '/user/auth', result, { headers: headers, responseType: 'text', }).pipe(
      map(res => {
        this.saveToStorageUser(res);
      }), catchError(this.handleError), );
  }

  saveToStorageUser(token: string): void {
    localStorage.setItem('currentUser', token);
    window.location.replace('/');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
