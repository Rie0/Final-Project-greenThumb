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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Error status: ${error.status}, Details: ${JSON.stringify(error.error)}`);
    }
    return throwError('An error occurred. Please check the console for details.');
  }

  private getRequestOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getVolunteers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  postVolunteer(volunteerData: any): Observable<void> {
    return this.http.post<void>(this.API_URL, volunteerData, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  assignVolunteerToProject(volunteerId: number, projectId: number): Observable<any> {
    const url = `${this.API_URL}/${volunteerId}/assign/${projectId}`;
    return this.http.post(url, {}, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  getVolunteersContainingString(searchString: string): Observable<any[]> {
    const searchUrl = `${this.API_URL}/str?str=${searchString}`;
    return this.http.get<any[]>(searchUrl, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }
}