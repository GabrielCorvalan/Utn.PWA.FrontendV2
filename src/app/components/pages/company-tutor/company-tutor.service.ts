import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ICompanyTutor } from 'src/app/intefaces/ICompanyTutor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyTutorService {

  constructor(private http: HttpClient) {}

  getAllCompanyTutors(): Observable<ICompanyTutor[]> {
    return this.http.get(environment.url + '/companyTutor').pipe(
      map((res: ICompanyTutor[]) => {
        return res;
      }));
  }

  getCompanyTutorById(id: string): Observable<ICompanyTutor> {
    return this.http.get(environment.url + '/companyTutor/' + id).pipe(
      map((res: ICompanyTutor) => {
        return res;
      }));
  }

  createCompanyTutor(companyTutor: ICompanyTutor): Observable<boolean> {
    const result = JSON.stringify(companyTutor);
    console.log(result);

    return this.http.post(environment.url + '/companyTutor', result).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  deleteCompanyTutor(id: number): Observable<boolean> {
    return this.http.delete(environment.url + '/companyTutor/' + id).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  dniValidate(dni: number): Observable<boolean> {
    return this.http.get(environment.url + '/companyTutor/validateDni/' + dni).pipe(
      map((res: boolean) => {
        return res;
      }));
  }

  getTutorsByFilter(filter: string) {
    const parameters = new HttpParams().set('filter', filter);
    return this.http.get(environment.url + '/companyTutor/ByFilter', {params: parameters}).pipe(
      map((res: ICompanyTutor[]) => {
        return res;
      }));
  }
}
