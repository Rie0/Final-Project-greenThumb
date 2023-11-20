import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private readonly API_URL = 'http://localhost:8080/api/volunteers';

  constructor(private http: HttpClient) { }

  getVolunteers(): Observable<any[]> { //get
    return this.http.get<any[]>(this.API_URL);
  }

  postVolunteer(volunteerData: any): Observable<any> { //post volunteer
    return this.http.post<void>(this.API_URL, volunteerData); //is void nessasary?
  }

  assignVolunteerToProject(volunteerId: number, projectId: number): Observable<any> {
    const url = `${this.API_URL}/${volunteerId}/assign/${projectId}`;
    return this.http.post(url, {});
  }

  getVolunteersContainingString(searchString: string): Observable<any[]> {
    const searchUrl = `${this.API_URL}/str?str=${searchString}`;
    return this.http.get<any[]>(searchUrl);
  }

}
