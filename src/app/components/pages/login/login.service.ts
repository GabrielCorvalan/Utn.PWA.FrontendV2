import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  postLogin(user: any) {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const result = JSON.stringify(user);
    console.log('result', result);
    return this.http.post(environment.url + '/user/auth', result, { headers: headers, responseType: 'text', }).pipe(
      map(res => {
        this.saveToStorageUser(res);
      }));
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
