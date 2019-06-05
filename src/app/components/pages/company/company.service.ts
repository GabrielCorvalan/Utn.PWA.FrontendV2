import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ICompany } from 'src/app/intefaces/ICompany';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<ICompany[]> {
    return this.http.get(environment.url + '/company').pipe(
      map((res: ICompany[]) => {
        return res;
      }));
  }

  getCompanyById(id: string): Observable<ICompany> {
    return this.http.get(environment.url + '/company/' + id).pipe(
      map((res: ICompany) => {
        return res;
      }));
  }

  createCompany(company: ICompany): Observable<boolean> {
    const result = JSON.stringify(company);
    console.log(result);

    return this.http.post(environment.url + '/company', result).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  deleteCompany(id: number): Observable<boolean> {
    return this.http.delete(environment.url + '/company/' + id).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  dniValidate(dni: number): Observable<boolean> {
    return this.http.get(environment.url + '/company/validateDni/' + dni).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

}
