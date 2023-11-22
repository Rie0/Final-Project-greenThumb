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

  getProjects(): Observable<any> {
    return this.http.get(this.API_URL)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSingleProject(projectId: number): Observable<any> {
    const url = `${this.API_URL}/${projectId}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProjectName(projectId: number, projectNameDTO: any): Observable<any> {
    const url = `${this.API_URL}/name/${projectId}`;
    return this.http.patch(url, projectNameDTO)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProject(projectId: number): Observable<any> {
  const url = `${this.API_URL}/${projectId}`;
  
  return this.http.delete(url).pipe(
    catchError((error) => {
      console.error('Error deleting project:', error);
      return throwError(error);
    })
  );
}
    
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
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
