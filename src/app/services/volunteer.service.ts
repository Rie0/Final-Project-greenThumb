import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private readonly API_URL = 'http://localhost:8080/api/volunteers';

  constructor(private http: HttpClient) { }

  getVolunteers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL)
      .pipe(
        catchError(this.handleError)
      );
  }

  postVolunteer(volunteerData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<void>(this.API_URL, volunteerData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  assignVolunteerToProject(volunteerId: number, projectId: number): Observable<any> {
    const url = `${this.API_URL}/${volunteerId}/assign/${projectId}`;
    return this.http.post(url, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  getVolunteersContainingString(searchString: string): Observable<any[]> {
    const searchUrl = `${this.API_URL}/str?str=${searchString}`;
    return this.http.get<any[]>(searchUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Error status: ${error.status}, ` +
        `Details: ${JSON.stringify(error.error)}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('An error occured. please check the console for datails.');
  }
}
