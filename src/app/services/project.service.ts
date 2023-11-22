import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly API_URL = "http://localhost:8080/api/projects";

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
  
// Requests

  getProjects(): Observable<any> {
    return this.http.get(this.API_URL, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  getSingleProject(projectId: number): Observable<any> {
    const url = `${this.API_URL}/${projectId}`;
    return this.http.get(url, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  updateProjectName(projectId: number, projectNameDTO: any): Observable<any> {
    const url = `${this.API_URL}/name/${projectId}`;
    return this.http.patch(url, projectNameDTO, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  deleteProject(projectId: number): Observable<any> {
    const url = `${this.API_URL}/${projectId}`;
    return this.http.delete(url, this.getRequestOptions())
      .pipe(catchError((error) => {
        console.error('Error deleting project:', error);
        return throwError(error);
      }));
  }
}