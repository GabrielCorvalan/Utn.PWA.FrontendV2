import {throwError as observableThrowError,  Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

    _baseUrl = 'https://localhost:44353/api';
    public _headers: HttpHeaders;
    constructor() {
        let token = localStorage.getItem('currentUser');
        this._headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    public handleError(error: any): Observable<any> {
        if (error.status === 401 || error.status === 403) {
            return observableThrowError(error);
        }

        const applicationError: any = error.headers.get('Application-Error');
        const serverError: any = error;
        let modelStateErrors = '';

        if (serverError.status === 400 && serverError.error) {
            if (typeof (serverError.error) === 'string') {
                modelStateErrors = serverError.error;
            } else {
                modelStateErrors = serverError.error[Object.keys(serverError.error)[0]];
            }
        } else {
            modelStateErrors = error.message + '\n';
        }

        return observableThrowError(applicationError || modelStateErrors || 'Server error');
    }
}
