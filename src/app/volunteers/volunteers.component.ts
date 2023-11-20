import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent implements OnInit{
  volunteers: any[]=[];
  searchString: string = '';
  errorMessage: string = '';

  constructor(private volunteerService: VolunteerService){}

  
  ngOnInit() {
    this.getVolunteers();
  }

  getVolunteers() { //handle errors
    this.volunteerService.getVolunteers().subscribe(
      (volunteers: any[]) => {
        //console.log('Volunteers:', volunteers);
        this.volunteers = volunteers;
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }

  onSearch(){
    if (this.searchString.trim() !== '') {
      this.volunteerService.getVolunteersContainingString(this.searchString).pipe(
        catchError((error) => {
          console.log("Error searching volunteers, volunteer doesn't exsist:", error);
          this.errorMessage = 'No matching volunteers found.';
          return of([]); // Return an empty array to clear the volunteer list
        })
      ).subscribe((volunteers: any[]) => {
        console.log('Filtered Volunteers:', volunteers);
        this.volunteers = volunteers;
      });
    } else {
      this.getVolunteers();
    }
  }
}