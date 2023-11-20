import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly API_URL = "http://localhost:8080/api/projects";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  getSingleProject(projectId: number): Observable<any> {
    const url = `${this.API_URL}/${projectId}`;
    return this.http.get(url);
  }
  updateProjectName(projectId: number, projectNameDTO: any): Observable<any> {
    const url = `${this.API_URL}/name/${projectId}`;
    return this.http.patch(url, projectNameDTO);
  }
  
  deleteProject(projectId: number): Observable<any> {
    const url = `${this.API_URL}/${projectId}`;
    return this.http.delete(url);
  }
}
