import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private rethrowError({ error }: { error: any }) {
    return throwError(error)
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(this.rethrowError));
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(`${environment.apiUrl}${path}`, body)
      .pipe(catchError(this.rethrowError));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, body)
      .pipe(catchError(this.rethrowError));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${path}`)
      .pipe(catchError(this.rethrowError));
  }
}
