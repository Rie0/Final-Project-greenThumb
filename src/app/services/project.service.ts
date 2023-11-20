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
}
