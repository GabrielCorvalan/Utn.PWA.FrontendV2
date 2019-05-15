import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/DataService';
import { ICompany } from 'src/app/intefaces/ICompany';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends DataService {

  constructor(private http: HttpClient) {
    super();
  }

  getAllCompanies(): Observable<ICompany[]> {
    console.log(this._headers);
    return this.http.get(this._baseUrl + '/company', {headers: this._headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError), );
  }

  getCompanyById(id: string): Observable<ICompany> {
    return this.http.get(this._baseUrl + '/company/' + id).pipe(
      map((res: ICompany) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  createCompany(company: ICompany): Observable<boolean> {
    this._headers.set('Content-Type', 'application/json');
    const result = JSON.stringify(company);
    console.log(result);

    return this.http.post(this._baseUrl + '/company', result, { headers: this._headers }).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError), );
  }

  deleteCompany(id: number): Observable<boolean> {
    return this.http.delete(this._baseUrl + '/company/' + id).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }

  dniValidate(dni: number): Observable<boolean> {
    return this.http.get(this._baseUrl + '/company/validateDni/' + dni).pipe(
      map((res: boolean) => {
        return res;
      }),
      catchError(this.handleError), );
  }

}
