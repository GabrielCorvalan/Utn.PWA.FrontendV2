import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/DataService';
import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyTutorService extends DataService {

  constructor(private http: HttpClient) {
    super();
  }

  getAllCompanyTutors(): Observable<ICompanyTutor[]> {
    return this.http.get(this._baseUrl + '/companyTutor', {headers: this._headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getCompanyTutorById(id: string): Observable<ICompanyTutor> {
    return this.http.get(this._baseUrl + '/companyTutor/' + id).pipe(
      map((res: ICompanyTutor) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  createCompanyTutor(companyTutor: ICompanyTutor): Observable<boolean> {
    this._headers.set('Content-Type', 'application/json');    
    const result = JSON.stringify(companyTutor);
    console.log(result);
    
    return this.http.post(this._baseUrl + '/companyTutor', result, { headers: this._headers }).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }

  deleteCompanyTutor(id: number): Observable<boolean> {
    return this.http.delete(this._baseUrl + '/companyTutor/' + id).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  dniValidate(dni: number): Observable<boolean> {
    return this.http.get(this._baseUrl + '/companyTutor/validateDni/' + dni).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }
  
}
